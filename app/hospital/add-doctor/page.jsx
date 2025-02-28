'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AddDoctor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      experience: 0,
      availability: true,
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting doctor data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-neon-blue hover:text-neon-purple mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="cosmic-card p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Add New Doctor</h1>
          
          {submitSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
              Doctor added successfully!
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium mb-2">Doctor Name <span className="text-red-500">*</span></label>
                <input type="text" id="userName" {...register('userName', { required: 'Doctor name is required' })} className="w-full bg-black border border-gray-700 rounded-md px-4 py-2" placeholder="Enter doctor's name" />
                {errors.userName && <p className="mt-1 text-red-500 text-sm">{errors.userName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="hospitalName" className="block text-sm font-medium mb-2">Hospital Name <span className="text-red-500">*</span></label>
                <input type="text" id="hospitalName" {...register('hospitalName', { required: 'Hospital name is required' })} className="w-full bg-black border border-gray-700 rounded-md px-4 py-2" placeholder="Enter hospital name" />
                {errors.hospitalName && <p className="mt-1 text-red-500 text-sm">{errors.hospitalName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium mb-2">Specialization</label>
                <input type="text" id="specialization" {...register('specialization')} className="w-full bg-black border border-gray-700 rounded-md px-4 py-2" placeholder="e.g., Cardiology, Neurology, Pediatrics" />
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">Years of Experience</label>
                <input type="number" id="experience" min="0" {...register('experience', { valueAsNumber: true, min: { value: 0, message: 'Experience cannot be negative' } })} className="w-full bg-black border border-gray-700 rounded-md px-4 py-2" />
                {errors.experience && <p className="mt-1 text-red-500 text-sm">{errors.experience.message}</p>}
              </div>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="availability" {...register('availability')} className="h-4 w-4 text-neon-blue border-gray-700 rounded" />
              <label htmlFor="availability" className="ml-2 block text-sm">Currently Available for Appointments</label>
            </div>
            
            <div className="flex justify-end">
              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-md font-medium text-black ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-neon-blue/30'}`}>
                {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
