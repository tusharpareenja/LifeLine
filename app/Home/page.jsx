'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Guitar as Hospital, Bed, ClipboardList, Users, Activity, ArrowDown, Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className={`fixed w-full z-10 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Hospital className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">LifeLine</span>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              
              <Link href={'/login'}>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ">
                Get Started
              </button>
              
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
             
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link href={'/Login/role'}>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ">
                Get Started
              </button>
              
              </Link>
              
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-20">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-100 dark:bg-blue-900 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 pt-24 pb-12 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              style={{
                textShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              Modern Healthcare
              <span className="text-blue-600 dark:text-blue-400"> Management</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Streamline patient care with our comprehensive digital health records
              and hospital management solution
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href={'/login'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </motion.button>
              
              </Link>
              <Link href={'/register/hospital'}>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                Register Hospital
              </motion.button>
              
              </Link>
              
              
            </motion.div>
          </div>
          
          {/* Hero Image Grid with 3D Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000"
          >
            {[
              {
                src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80",
                alt: "Medical Technology",
                rotate: "rotate-y-minus-10"
              },
              {
                src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
                alt: "Patient Care",
                rotate: "rotate-y-0"
              },
              {
                src: "https://tse4.mm.bing.net/th/id/OIP.rC0KBXe_TjWah8g1KslwcwHaE8?rs=1&pid=ImgDetMain",
                alt: "Hospital Equipment",
                rotate: "rotate-y-plus-10"
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotateY: 0 }}
                className="transform transition-transform duration-500 hover:z-10"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  style={{
                    transform: `rotateY(${(index - 1) * 5}deg)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ArrowDown className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
          >
            Comprehensive Healthcare Solutions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ClipboardList className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
                title: "Electronic Health Records",
                description: "Secure and accessible digital patient records for better care coordination"
              },
              {
                icon: <Hospital className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
                title: "Hospital Management",
                description: "Efficient tools for managing hospital operations and resources"
              },
              {
                icon: <Bed className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
                title: "Bed Availability Tracking",
                description: "Real-time monitoring of hospital bed capacity and availability"
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
                title: "Staff Management",
                description: "Comprehensive tools for managing healthcare professionals"
              },
              {
                icon: <Activity className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
                title: "Patient Monitoring",
                description: "Advanced tools for tracking patient vital signs and progress"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Hover Effects */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
          >
            Trusted by Healthcare Professionals
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
                quote: "This system has revolutionized how we manage patient records. It's intuitive and efficient.",
                name: "Dr. Sarah Johnson",
                role: "Chief of Medicine"
              },
              {
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80",
                quote: "The bed tracking feature has made resource management so much easier for our hospital.",
                name: "Dr. Michael Chen",
                role: "Hospital Administrator"
              },
              {
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
                quote: "Patient care has improved significantly with the implementation of this system.",
                name: "Dr. Emily Rodriguez",
                role: "Head of Pediatrics"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 italic">"{testimonial.quote}"</p>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Counter Animation */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900 text-white relative overflow-hidden transition-colors duration-300">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500 dark:bg-blue-800 rounded-full opacity-20"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10,000+", label: "Patients Served" },
              { number: "500+", label: "Healthcare Providers" },
              { number: "98%", label: "Patient Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center"
              >
                <motion.div 
                  className="text-5xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xl">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax Effect */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Ready to Transform Your Healthcare Management?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who have already modernized their practice with our platform
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Schedule a Demo
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default App;