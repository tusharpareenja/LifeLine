"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "John Doe",
    role: "Patient",
    content:
      "LifeLine has revolutionized how I manage my health. The ease of booking appointments and accessing my medical records is incredible!",
    rating: 5,
    avatar: "/path/to/john-doe-avatar.jpg",
  },
  {
    name: "Dr. Jane Smith",
    role: "Cardiologist",
    content:
      "As a doctor, LifeLine has streamlined my practice. The telemedicine feature is particularly useful for follow-up consultations.",
    rating: 5,
    avatar: "/path/to/jane-smith-avatar.jpg",
  },
  {
    name: "City Hospital",
    role: "Healthcare Provider",
    content:
      "The real-time bed tracking system has significantly improved our resource management. It's a game-changer for hospital administration.",
    rating: 4,
    avatar: "/path/to/city-hospital-avatar.jpg",
  },
]

const TestimonialCard = React.memo(({ testimonial }) => (
  <Card className="bg-white dark:bg-gray-800 shadow-xl">
    <CardContent className="p-8 flex flex-col items-center">
      <motion.img
        src={testimonial.avatar || "/placeholder.svg"}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-indigo-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.p
        className="text-lg mb-4 italic text-center text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        &ldquo;{testimonial.content}&rdquo;
      </motion.p>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <p className="font-semibold text-indigo-600 dark:text-indigo-400">{testimonial.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        <div className="flex mt-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </motion.div>
    </CardContent>
  </Card>
))

TestimonialCard.displayName = "TestimonialCard"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white dark:bg-gray-800"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white dark:bg-gray-800"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

