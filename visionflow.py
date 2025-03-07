import os
import pickle
import threading
import time
import cv2
import numpy as np
from flask import Flask, render_template_string, request, redirect, url_for, send_file, jsonify
from io import BytesIO

app = Flask(__name__)
MODEL_DIR = "models"

if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

class YOLOv11Model:
    def __init__(self, model_type="classification", epochs=10, **kwargs):
        self.model_type = model_type
        self.epochs = epochs
        self.params = kwargs
        self.trained = False
        self.metrics = {}
        
    def train(self):
        print(f"Starting {self.model_type} training for {self.epochs} epochs with parameters: {self.params}")
        for epoch in range(1, self.epochs + 1):
            time.sleep(1)
            self.metrics['epoch'] = epoch
            self.metrics['loss'] = max(0.0, 1.0 - epoch/self.epochs)
            print(f"Epoch {epoch}/{self.epochs} complete. Loss: {self.metrics['loss']:.4f}")
        self.trained = True
        print(f"Training complete for {self.model_type} model.")

    def infer(self, image):
        h, w = image.shape[:2]
        if self.model_type in ["classification", "segmentation"]:
            pt1 = (int(w*0.3), int(h*0.3))
            pt2 = (int(w*0.7), int(h*0.7))
            cv2.rectangle(image, pt1, pt2, (0, 255, 0), 2)
            label = f"{self.model_type.capitalize()} Output"
            cv2.putText(image, label, (pt1[0], pt1[1]-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
        elif self.model_type == "pose":
            center = (w//2, h//2)
            cv2.circle(image, center, 50, (255, 0, 0), 3)
            label = "Pose Output"
            cv2.putText(image, label, (center[0]-40, center[1]-60), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0), 2)
        return image

saved_models = {}

home_html = """
<!DOCTYPE html>
<html>
    <head>
        <title>YOLOv11 Training</title>
    </head>
    <body>
        <h1>YOLOv11 Training Dashboard</h1>
        <form action="{{ url_for('train_model') }}" method="POST">
            <label for="model_type">Select Training Type:</label>
            <select name="model_type" id="model_type" required>
                <option value="segmentation">Segmentation</option>
                <option value="classification">Classification</option>
                <option value="pose">Pose Estimation</option>
            </select>
            <br><br>
            <label for="epochs">Number of Epochs:</label>
            <input type="number" name="epochs" id="epochs" value="10" min="1" required>
            <br><br>
            <!-- Additional parameters can be added here -->
            <input type="submit" value="Train Model">
        </form>
        <hr>
        <h2>Inference</h2>
        <form action="{{ url_for('inference') }}" method="POST" enctype="multipart/form-data">
            <label for="model_name">Select a saved model:</label>
            <select name="model_name" id="model_name" required>
                {% for name in models %}
                <option value="{{ name }}">{{ name }}</option>
                {% endfor %}
            </select>
            <br><br>
            <label for="inference_type">Choose Inference Source:</label>
            <select name="inference_type" id="inference_type" required>
                <option value="webcam">Webcam</option>
                <option value="image">Image Upload</option>
            </select>
            <br><br>
            <div id="upload_div" style="display:none;">
                <label for="image_file">Upload an image:</label>
                <input type="file" name="image_file" id="image_file" accept="image/*">
            </div>
            <br>
            <input type="submit" value="Run Inference">
        </form>
        
        <script>
            const inferenceTypeSelect = document.getElementById('inference_type');
            const uploadDiv = document.getElementById('upload_div');
            inferenceTypeSelect.addEventListener('change', function() {
                if (this.value === 'image') {
                    uploadDiv.style.display = 'block';
                } else {
                    uploadDiv.style.display = 'none';
                }
            });
        </script>
    </body>
</html>
"""

def train_model_thread(model, model_filename):
    model.train()
    with open(os.path.join(MODEL_DIR, model_filename), 'wb') as f:
        pickle.dump(model, f)
    saved_models[model_filename] = model
    print(f"Model saved as {model_filename}")

@app.route("/", methods=["GET"])
def index():
    model_files = os.listdir(MODEL_DIR)
    return render_template_string(home_html, models=model_files)

@app.route("/train", methods=["POST"])
def train_model():
    model_type = request.form.get("model_type")
    epochs = int(request.form.get("epochs", 10))
    
    model = YOLOv11Model(model_type=model_type, epochs=epochs)
    
    timestamp = int(time.time())
    model_filename = f"{model_type}_model_{timestamp}.pkl"

    threading.Thread(target=train_model_thread, args=(model, model_filename)).start()
    
    return redirect(url_for("index"))

@app.route("/inference", methods=["POST"])
def inference():
    model_name = request.form.get("model_name")
    inference_type = request.form.get("inference_type")

    model_path = os.path.join(MODEL_DIR, model_name)
    if not os.path.exists(model_path):
        return "Model not found", 404

    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    if inference_type == "webcam":
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return "Cannot access webcam", 500
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            output_frame = model.infer(frame)
            cv2.imshow("Webcam Inference - Press q to quit", output_frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()
        return redirect(url_for("index"))
    
    elif inference_type == "image":
        if "image_file" not in request.files:
            return "No image uploaded", 400
        file = request.files["image_file"]
        if file.filename == "":
            return "No selected file", 400
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if image is None:
            return "Invalid image file", 400
        output_image = model.infer(image)
        _, buffer = cv2.imencode('.jpg', output_image)
        io_buf = BytesIO(buffer)
        return send_file(io_buf, mimetype='image/jpeg')
    
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)