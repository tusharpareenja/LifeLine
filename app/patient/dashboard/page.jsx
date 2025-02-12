'use client'
import React, { useState } from 'react';
import { Bell, Calendar, FileText, Home, LogOut, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, avatarUrl, AvatarFallback } from '@/components/ui/avatar';
import image from '../../../public/Images/profile_pic.jpg'
import {  Droplet, User } from 'lucide-react'

// Mock data
const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-02-15', time: '10:00 AM' },
  { id: 2, doctor: 'Dr. Johnson', date: '2025-02-18', time: '2:30 PM' },
];

const hospitalBedAvailability = [
  { hospital: 'City General Hospital', availableBeds: 15 },
  { hospital: "St. Mary's Medical Center", availableBeds: 8 },
];

const doctorRecommendations = [
  { id: 1, name: 'Dr. Emily Chen', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Michael Lee', specialty: 'Neurologist' },
];

const recentMedicalReports = [
  { id: 1, title: 'Blood Test Results', date: '2025-02-01' },
  { id: 2, title: 'X-Ray Report', date: '2025-01-28' },
];

const user = {
    name: "John Doe",
    age: 35,
    gender: "Male",
    bloodType: "A+",
    avatarUrl: {image}
  }
  
  // In your JSX


const WelcomeBanner = ({ user }) => (
<Card className="bg-blue-50 border-blue-200  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {user.age} years
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {user.gender}
            </span>
            <span className="flex items-center gap-1">
              <Droplet className="w-4 h-4" />
              {user.bloodType}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Here's your daily health tip: Stay hydrated by drinking at least 8 glasses of water today.
        </p>
      </CardContent>
    </Card>
);

const UpcomingAppointments = ({ appointments }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Appointments</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="flex justify-between items-center">
            <span>{appointment.doctor}</span>
            <span className="text-sm text-gray-500">
              {appointment.date} at {appointment.time}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const HospitalBedAvailability = ({ hospitals }) => (
  <Card>
    <CardHeader>
      <CardTitle>Hospital & Bed Availability</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {hospitals.map((hospital, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{hospital.hospital}</span>
            <span className="font-bold text-green-600">{hospital.availableBeds} beds</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const EmergencyServices = () => (
  <Card>
    <CardHeader>
      <CardTitle>Emergency Services</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col space-y-2">
      <Button variant="destructive">911 Emergency</Button>
      <Button>Book Ambulance</Button>
      <Button>Find Blood Banks</Button>
    </CardContent>
  </Card>
);

const DoctorRecommendations = ({ doctors }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended Doctors</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="flex justify-between items-center">
            <span>{doctor.name}</span>
            <span className="text-sm text-gray-500">{doctor.specialty}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const RecentMedicalReports = ({ reports }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Medical Reports</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {reports.map((report) => (
          <li key={report.id} className="flex justify-between items-center">
            <span>{report.title}</span>
            <span className="text-sm text-gray-500">{report.date}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AppointmentsOverview = () => (
  <Card>
    <CardHeader>
      <CardTitle>Appointments Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="font-bold mb-2">Today's Schedule</h3>
      <ul className="space-y-2 mb-4">
        <li>9:00 AM - John Doe (Checkup)</li>
        <li>11:30 AM - Jane Smith (Follow-up)</li>
        <li>2:00 PM - Mike Johnson (Consultation)</li>
      </ul>
      <h3 className="font-bold mb-2">Pending Requests</h3>
      <ul className="space-y-2">
        <li>Sarah Brown (New Patient)</li>
        <li>Tom Wilson (Urgent Care)</li>
      </ul>
    </CardContent>
  </Card>
);

const PatientMedicalHistoryPreview = () => (
  <Card>
    <CardHeader>
      <CardTitle>Patient Medical History Preview</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="font-bold mb-2">Upcoming Patient: John Doe</h3>
      <ul className="space-y-2">
        <li>Last Visit: January 15, 2025</li>
        <li>Allergies: Penicillin</li>
        <li>Chronic Conditions: Hypertension</li>
        <li>Recent Tests: Blood work (Feb 1, 2025)</li>
      </ul>
    </CardContent>
  </Card>
);

const EmergencyRequestsWidget = () => (
  <Card>
    <CardHeader>
      <CardTitle>Emergency Requests</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex justify-between items-center">
          <span className="font-bold text-red-600">Cardiac Arrest</span>
          <span>ICU Room 3</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-bold text-yellow-600">Severe Allergic Reaction</span>
          <span>ER Bay 2</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

const VideoConsultationButton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Video Consultations</CardTitle>
    </CardHeader>
    <CardContent>
      <Button className="w-full mb-2">Join Ongoing Consultation</Button>
      <p className="text-sm text-gray-500">Next consultation: 2:30 PM with Jane Smith</p>
    </CardContent>
  </Card>
);

const LiveBedOccupancyTracker = () => (
  <Card>
    <CardHeader>
      <CardTitle>Live Bed Occupancy</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { name: 'ICU', value: 80, details: '16/20' },
          { name: 'Ventilators', value: 60, details: '6/10' },
          { name: 'General Ward', value: 75, details: '75/100' },
        ].map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <span>{item.name}</span>
              <span>{item.value}% ({item.details})</span>
            </div>
            <Progress value={item.value} className="w-full" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const DoctorStaffManagement = () => (
  <Card>
    <CardHeader>
      <CardTitle>Doctor & Staff Management</CardTitle>
    </CardHeader>
    <CardContent>
      <Button className="w-full mb-4">Add New Doctor/Staff</Button>
      <ul className="space-y-2">
        {[
          { name: 'Dr. Emily Chen' },
          { name: 'Dr. Michael Lee' },
        ].map((doctor) => (
          <li key={doctor.name} className="flex justify-between items-center">
            <span>{doctor.name}</span>
            <Button variant="outline" size="sm">
              Update Schedule
            </Button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const EmergencyCasesPanel = () => (
  <Card>
    <CardHeader>
      <CardTitle>Emergency Cases Panel</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {[
          { case: 'Multiple Vehicle Accident', eta: '5 mins', severity: 'red' },
          { case: 'Stroke Patient', eta: '10 mins', severity: 'yellow' },
        ].map((emergency) => (
          <li key={emergency.case} className="flex justify-between items-center">
            <span className={`font-bold text-${emergency.severity}-600`}>
              {emergency.case}
            </span>
            <span>ETA: {emergency.eta}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AnalyticsReports = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analytics & Reports</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {[
          { label: 'Patient Visits (Last 30 days)', value: '1,245' },
          { label: 'Bed Utilization Rate', value: '78%' },
          { label: 'Average Length of Stay', value: '4.2 days' },
        ].map((stat) => (
          <li key={stat.label} className="flex justify-between items-center">
            <span>{stat.label}</span>
            <span className="font-bold">{stat.value}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4">View Detailed Reports</Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [userType, setUserType] = useState('patient');

  const sidebarItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Calendar, label: 'Appointments' },
    { icon: FileText, label: 'Medical Records' },
    { icon: MessageSquare, label: 'Doctor Consultation' },
    { icon: Bell, label: 'Emergency Services' },
    { icon: Settings, label: 'Profile Settings' },
    { icon: LogOut, label: 'Logout' },
  ];

  return (
    <div className="flex h-screen  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
     

      <main className="flex-1 p-8 ">
        <div className="mb-4">
          <label htmlFor="userType" className="mr-2  ">
            Select User Type:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="border rounded p-1  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Hospital Admin</option>
          </select>
        </div>

        {userType === 'patient' && (
          <>
            <WelcomeBanner user={user} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UpcomingAppointments appointments={upcomingAppointments} />
              <HospitalBedAvailability hospitals={hospitalBedAvailability} />
              <EmergencyServices />
              <DoctorRecommendations doctors={doctorRecommendations} />
              <RecentMedicalReports reports={recentMedicalReports} />
            </div>
          </>
        )}

        {userType === 'doctor' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppointmentsOverview />
              <PatientMedicalHistoryPreview />
              <EmergencyRequestsWidget />
              <VideoConsultationButton />
            </div>
          </>
        )}

        {userType === 'admin' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Hospital Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LiveBedOccupancyTracker />
              <DoctorStaffManagement />
              <EmergencyCasesPanel />
              <AnalyticsReports />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;