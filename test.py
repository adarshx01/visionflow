import os
import uuid
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import socketio
import asyncio
from datetime import datetime

# Check GPU availability
print("GPU Available:", tf.config.list_physical_devices('GPU'))

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
app.mount("/socket.io", socketio.ASGIApp(sio))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global training state
current_job = None

# cell 4: Model Management
MODELS = {
    "ResNet50": tf.keras.applications.ResNet50,
    "MobileNetV2": tf.keras.applications.MobileNetV2,
    "CustomCNN": None  # Add your custom model class
}

class TrainingSystem:
    def __init__(self):
        self.model = None
        self.train_ds = None
        self.test_ds = None
        
    async def load_dataset(self, dataset_path):
        # Implement your dataset loading logic
        self.train_ds = tf.keras.preprocessing.image_dataset_from_directory(
            dataset_path,
            validation_split=0.2,
            subset="training",
            seed=123,
            image_size=(224, 224),
            batch_size=32
        )
        
    async def create_model(self, model_name):
        if model_name == "CustomCNN":
            self.model = tf.keras.Sequential([...])  # Your custom architecture
        else:
            self.model = MODELS[model_name](weights=None, classes=2)
            
        self.model.compile(optimizer='adam',
                         loss='sparse_categorical_crossentropy',
                         metrics=['accuracy'])
        
    async def train_model(self, epochs):
        history = self.model.fit(
            self.train_ds,
            epochs=epochs,
            callbacks=[TrainingCallback()]
        )
        return history

training_system = TrainingSystem()

# cell 5: WebSocket Handlers & API Endpoints
class TrainingCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        asyncio.run(sio.emit('training_update', {
            'epoch': epoch,
            'accuracy': logs['accuracy'],
            'loss': logs['loss']
        }))

@app.post("/select_model")
async def select_model(model_name: str):
    await training_system.create_model(model_name)
    return {"status": f"Model {model_name} loaded"}

@app.post("/set_dataset")
async def set_dataset(dataset_path: str):
    await training_system.load_dataset(dataset_path)
    return {"status": f"Dataset loaded from {dataset_path}"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = tf.image.decode_image(await file.read())
    prediction = training_system.model.predict(tf.expand_dims(img, 0))
    return {"prediction": str(tf.argmax(prediction[0]))}

@sio.on('start_training')
async def start_training(sid, data):
    global current_job
    current_job = str(uuid.uuid4())
    await training_system.train_model(epochs=data['epochs'])
    current_job = None

# Start the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

    