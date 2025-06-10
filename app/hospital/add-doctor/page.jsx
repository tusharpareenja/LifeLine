'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createDoctor } from '@/app/actions/doctors';
import useSendEmail, { generatePassword } from '@/lib/utils';
import { toast } from 'sonner';

export default function AddDoctor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { sendEmail } = useSendEmail()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      experience: 0,
      availability: true,
      phone: '',
      degree: '',
      department: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting doctor data:', data);
      const password = generatePassword(8)
      const newData = {...data , password , hospitalId : sessionStorage.getItem("hospitalId")}
      const res = await createDoctor(newData)
      console.log(res)
      if(res.success) {
        toast.success("Doctor created succesfully !")
        await sendEmail({
            to: res.data.user.email,
            subject: 'Patient Account created succesfully !',
            text: `Your patient account has been created by admin`,
            html: `<p>Your password is: <strong>${password}</strong></p>`
        })
      } else {
        toast.error("Error while creating doctor !")
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-neon-blue hover:text-neon-purple mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="cosmic-card p-6 rounded-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Add New Doctor</h1>
          
          {submitSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
              Doctor added successfully!
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Doctor's Email <span className="text-red-500">*</span></label>
                <input type="text" id="email" {...register('email', { required: 'Doctor name is required' })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="Enter doctor's email id" />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Doctor Name <span className="text-red-500">*</span></label>
                <input type="text" id="name" {...register('name', { required: 'Doctor name is required' })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="Enter doctor's name" />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="hospitalName" className="block text-sm font-medium mb-2">Hospital Name <span className="text-red-500">*</span></label>
                <input type="text" id="hospitalName" {...register('hospitalName', { required: 'Hospital name is required' })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="Enter hospital name" />
                {errors.hospitalName && <p className="mt-1 text-red-500 text-sm">{errors.hospitalName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium mb-2">Specialization</label>
                <input type="text" id="specialization" {...register('specialization')} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="e.g., Cardiology, Neurology, Pediatrics" />
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">Years of Experience</label>
                <input type="number" id="experience" min="0" {...register('experience', { valueAsNumber: true, min: { value: 0, message: 'Experience cannot be negative' } })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" />
                {errors.experience && <p className="mt-1 text-red-500 text-sm">{errors.experience.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" {...register('phone', { required: 'Phone number is required', pattern: { value: /^\d{10,15}$/, message: 'Enter a valid phone number' } })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="Enter phone number" />
                {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium mb-2">Degree <span className="text-red-500">*</span></label>
                <select id="degree" {...register('degree', { required: 'Degree is required' })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2">
                  <option value="">Select degree</option>
                  <option value="MBBS">MBBS</option>
                  <option value="MD">MD</option>
                  <option value="MS">MS</option>
                  <option value="DM">DM</option>
                  <option value="MCh">MCh</option>
                  <option value="Other">Other</option>
                </select>
                {errors.degree && <p className="mt-1 text-red-500 text-sm">{errors.degree.message}</p>}
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-2">Department <span className="text-red-500">*</span></label>
                <input type="text" id="department" {...register('department', { required: 'Department is required' })} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2" placeholder="e.g., Cardiology, Neurology" />
                {errors.department && <p className="mt-1 text-red-500 text-sm">{errors.department.message}</p>}
              </div>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="availability" {...register('availability')} className="h-4 w-4 text-neon-blue border-gray-300 rounded" />
              <label htmlFor="availability" className="ml-2 block text-sm">Currently Available for Appointments</label>
            </div>
            
            <div className="flex justify-end">
              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`px-6 py-3 bg-gray-800 from-neon-blue to-neon-purple rounded-md font-medium text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-neon-blue/30'}`}>
                {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
