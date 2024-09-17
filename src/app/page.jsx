'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'

const images = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',

]

const letterVariants = {
  initial: { opacity: 0, y: -100 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
      delay: i * 0.1,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 100,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
      delay: i * 0.05,
    },
  }),
}

export default function PhotographyPortfolio() {
  const [showTitle, setShowTitle] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false)
    }, 5000) // 5 seconds delay to allow for the exit animation

    return () => clearTimeout(timer)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden relative">
      <AnimatePresence>
        {showTitle && (
          <motion.div
            className="h-full flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {'Snapout'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-6xl font-bold inline-block"
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  style={{
                    textShadow: '0 0 10px rgba(255,255,255,0.5)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showTitle && (
        <motion.div
          className="h-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Photography portfolio image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex justify-between items-center"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">Ganesh</span>
              <span className="text-sm text-gray-300">Photographer</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}