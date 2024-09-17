import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Twitter, Facebook, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'

export default function Component() {
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredImage, setHoveredImage] = useState(null)

  const images = [
    { src: '1.jpg', alt: 'Candid Photo 1' },
    { src: '2.jpg', alt: 'Candid Photo 2' },
    { src: '3.jpg', alt: 'Candid Photo 3' },
    { src: '4.jpg', alt: 'Candid Photo 4' },
    { src: '5.jpg', alt: 'Candid Photo 5' },
    { src: '6.jpg', alt: 'Candid Photo 6' },
    { src: '7.jpg', alt: 'Candid Photo 7' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  if (showInitialAnimation) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
        <motion.h1
          className="text-white text-6xl font-bold"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
          >
            {'Snapout'.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white"
      >
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-blue-900 bg-opacity-50 backdrop-blur-md">
          <h1 className="text-2xl font-bold">Snapout</h1>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:text-blue-300 transition-colors duration-300">Home</a></li>
            <li><a href="#gallery" className="hover:text-blue-300 transition-colors duration-300">Gallery</a></li>
            <li><a href="#about" className="hover:text-blue-300 transition-colors duration-300">About</a></li>
            <li><a href="#contact" className="hover:text-blue-300 transition-colors duration-300">Contact</a></li>
          </ul>
        </nav>

        <header id="home" className="h-screen relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-4 text-white">Snapout</h1>
              <p className="text-xl text-blue-200">Capturing life's candid moments</p>
            </motion.div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </header>

        <main id="gallery" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-200">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative cursor-pointer overflow-hidden rounded-lg group"
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img src={image.src} alt={image.alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredImage === index ? 1 : 0 }}
                  className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center"
                >
                  <p className="text-white text-lg font-semibold">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </main>

        <section id="about" className="py-16 bg-blue-900 bg-opacity-30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-200">About Ganesh</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <img src="ganesh.jpg" alt="Ganesh" className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-4 border-blue-400" />
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-blue-100">
                    Ganesh's journey in photography began with a deep passion for wildlife. For years, he traversed diverse landscapes, capturing the raw beauty of nature and its inhabitants. This experience honed his skills in patience, timing, and the art of capturing fleeting moments.
                  </p>
                  <p className="text-lg text-blue-100">
                    Today, Ganesh has transitioned his expertise into the world of candid photography. He brings the same keen eye for detail and split-second timing to weddings, events, and street photography. His unique background allows him to capture the wild, unscripted moments of human life with the same passion he once reserved for wildlife.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-blue-900 bg-opacity-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-200">Get in Touch</h2>
              <div className="flex flex-col items-center justify-center gap-8">
                <ul className="space-y-4 text-center">
                  <li className="flex items-center justify-center gap-2">
                    <Mail size={24} className="text-blue-300" />
                    <a href="mailto:ganesh@snapout.com" className="hover:text-blue-300 transition-colors duration-300">ganesh@snapout.com</a>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Phone size={24} className="text-blue-300" />
                    <a href="tel:+1234567890" className="hover:text-blue-300 transition-colors duration-300">+1 (234) 567-890</a>
                  </li>
                </ul>
                <div className="flex space-x-6">
                  <a href="#" className="text-blue-200 hover:text-blue-400 transition-colors duration-300">
                    <Instagram size={32} />
                  </a>
                  <a href="#" className="text-blue-200 hover:text-blue-400 transition-colors duration-300">
                    <Twitter size={32} />
                  </a>
                  <a href="#" className="text-blue-200 hover:text-blue-400 transition-colors duration-300">
                    <Facebook size={32} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-blue-900 bg-opacity-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-blue-200">&copy; 2023 Snapout. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}