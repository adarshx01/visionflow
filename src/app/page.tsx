import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, Play } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-purple-600">
                LocalCV
              </Link>
              <nav className="hidden md:ml-8 md:flex md:gap-6">
                <div className="relative group">
                  <button className="flex items-center gap-1 p-2 text-sm text-gray-600 hover:text-gray-900">
                    Products <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-1 p-2 text-sm text-gray-600 hover:text-gray-900">
                    Solutions <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <Link href="/docs" className="p-2 text-sm text-gray-600 hover:text-gray-900">
                  Docs
                </Link>
                <Link href="/blog" className="p-2 text-sm text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="hidden md:inline-block text-sm text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Button asChild variant="outline" className="hidden md:inline-flex">
                <Link href="/demo">Book a demo</Link>
              </Button>
              <Button asChild className="hidden md:inline-flex bg-purple-600 hover:bg-purple-700">
                <Link href="/get-started">Get Started</Link>
              </Button>
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Visualization */}
      <section className="pt-32 pb-24 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Train Computer Vision Models Using Your Local Hardware
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Build, train, and deploy computer vision models using your own GPU. Perfect for teams that need data
                privacy and cost-effective solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/get-started">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/demo">Request a Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="AI Model Training Visualization"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See it in Action</h2>
            <p className="text-xl text-gray-600">Watch how easy it is to train and deploy your models</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  <Play className="h-6 w-6 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Product Demo Video Thumbnail"
                width={1920}
                height={1080}
                className="object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Real-World Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing QA",
                image: "/placeholder.svg?height=400&width=600",
                description: "Detect defects and ensure quality control in real-time",
              },
              {
                title: "Retail Analytics",
                image: "/placeholder.svg?height=400&width=600",
                description: "Track customer behavior and optimize store layouts",
              },
              {
                title: "Security Systems",
                image: "/placeholder.svg?height=400&width=600",
                description: "Monitor and analyze security camera feeds",
              },
              {
                title: "Medical Imaging",
                image: "/placeholder.svg?height=400&width=600",
                description: "Assist in diagnosis and medical image analysis",
              },
              {
                title: "Agriculture",
                image: "/placeholder.svg?height=400&width=600",
                description: "Monitor crop health and optimize farming operations",
              },
              {
                title: "Smart Cities",
                image: "/placeholder.svg?height=400&width=600",
                description: "Improve traffic flow and urban planning",
              },
            ].map((useCase, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-gray-200">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Try Our Interactive Demo</h2>
              <p className="text-xl text-gray-300 mb-8">
                Upload your own images and see our computer vision models in action. No account required.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">1</div>
                  <p>Upload your image</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">2</div>
                  <p>Select your model</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">3</div>
                  <p>Get instant results</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Interactive Demo Interface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: "100%", label: "Local Processing", sublabel: "Complete data privacy" },
              { number: "50x", label: "Faster Training", sublabel: "Than cloud solutions" },
              { number: "24/7", label: "Availability", sublabel: "No internet required" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-4">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need for Computer Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Local GPU Training</h3>
              <p className="text-gray-600">
                Train models using your own hardware for complete data privacy and control
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Model Management</h3>
              <p className="text-gray-600">Version control and experiment tracking built specifically for CV models</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Easy Deployment</h3>
              <p className="text-gray-600">Deploy models to production with just a few clicks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-600">Trusted by leading companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 w-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Training Your Models Today</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building the future of computer vision
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/get-started">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LocalCV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

