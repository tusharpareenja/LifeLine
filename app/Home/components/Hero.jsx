"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Spline from "@splinetool/react-spline"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 ">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/Images/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 20,
            repeat: 3, // Reduce CPU usage
            repeatType: "reverse",
          }}
        />
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Health, Your Control
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-indigo-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Connecting Patients, Doctors & Hospitals with One Click
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-300">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="border border-white bg-white text-black hover:bg-white/10 transition-colors duration-300">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-[400px]  bg-transparent rounded-lg  overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                 <div className="w-full h-[400px]  rounded-lg shadow-2xl overflow-hidden">
              <Spline scene="https://prod.spline.design/fcyWfR0c0AP2Y67r/scene.splinecode" />
            </div>
              </motion.div>
            </div>
            <motion.div
              className="absolute -bottom-6 -right-4 w-36 h-36 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 5, repeat: 7 }} // Stops after 3 repeats
            >
              24/7 Care
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
