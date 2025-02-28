"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Upload, X } from "lucide-react";

export function InsurancePopup({ onSelect, onClose }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-4xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Manage Your Medical Insurance Effortlessly!
            </h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              className={`relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 ${
                hoveredCard === "get" ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-gray-800"
              }`}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredCard("get")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onSelect("get")}
            >
              <div className="p-6 backdrop-blur-sm bg-gray-900/80 h-full">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 rounded-full ${
                      hoveredCard === "get" ? "bg-blue-500/20" : "bg-gray-800"
                    } transition-colors duration-300`}
                  >
                    <Shield className="h-10 w-10 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Get Medical Insurance</h3>
                <p className="text-gray-400 text-center">
                  Explore and compare insurance plans from top providers tailored to your needs.
                </p>
                <div className="mt-6 flex justify-center">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: hoveredCard === "get" ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 ${
                hoveredCard === "add" ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-gray-800"
              }`}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredCard("add")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onSelect("add")}
            >
              <div className="p-6 backdrop-blur-sm bg-gray-900/80 h-full">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 rounded-full ${
                      hoveredCard === "add" ? "bg-purple-500/20" : "bg-gray-800"
                    } transition-colors duration-300`}
                  >
                    <Upload className="h-10 w-10 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Add Existing Insurance</h3>
                <p className="text-gray-400 text-center">
                  Link your current insurance policy to access all benefits and features.
                </p>
                <div className="mt-6 flex justify-center">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: hoveredCard === "add" ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}