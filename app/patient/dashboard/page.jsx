'use client'
import React, { useEffect, useState } from 'react';
import {Calendar} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {  Droplet, User } from 'lucide-react'
import { getPatientById } from '../../actions/patients.js';
import { getDoctors } from "@/app/actions/doctors"

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Souravv', date: '2025-02-15', time: '10:00 AM' },
  { id: 2, doctor: 'KRIPA', date: '2025-02-18', time: '2:30 PM' },
];

const recentMedicalReports = [
  { id: 1, title: 'Blood Test Results', date: '2025-02-01' },
  { id: 2, title: 'X-Ray Report', date: '2025-01-28' },
];

const WelcomeBanner = ({ user }) => (
  <Card className="bg-blue-50 border-blue-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src={user?.image ?? ""} alt={user?.name} />
        {/* <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback> */}
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {user?.dob ? new Date(user.dob).toDateString() : 'N/A'}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {user?.gender || 'N/A'}
          </span>
          <span className="flex items-center gap-1">
            <Droplet className="w-4 h-4" />
            {user?.bloodType || 'N/A'}
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

const UpcomingAppointments = ({ appointments = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Appointments</CardTitle>
    </CardHeader>
    <CardContent>
      {appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="flex justify-between items-center">
              <span>{appointment.doctor}</span>
              <span className="text-sm text-gray-500">
                {appointment.date}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No upcoming appointments scheduled.</p>
      )}
    </CardContent>
  </Card>
);

const HospitalBedAvailability = ({ hospitals = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Hospital & Bed Availability</CardTitle>
    </CardHeader>
    <CardContent>
      {hospitals.length > 0 ? (
        <ul className="space-y-4">
          {hospitals.map((hospital) => (
            <li key={hospital.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{hospital.name}</span>
                <span className="font-bold text-green-600">{hospital.availableBeds} beds available</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Beds:</span>
                  <span>{hospital.totalBeds}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ICU Beds:</span>
                  <span>{hospital.icuBeds}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ventilators:</span>
                  <span>{hospital.ventilators}</span>
                </div>
                <div className="w-full mt-1">
                  <Progress 
                    value={(hospital.availableBeds / hospital.totalBeds) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No hospital data available.</p>
      )}
    </CardContent>
  </Card>
);

const EmergencyServices = () => (
  <Card>
    <CardHeader>
      <CardTitle>Emergency Services</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col space-y-2">
      <Button
        variant="destructive"
        onClick={() => window.location.href = "tel:112"}
      >
        112 Emergency
      </Button>

      <Button
        onClick={() => window.open("https://medulance.com/", "_blank")}
      >
        Book Ambulance
      </Button>

      <Button
        onClick={() => window.open("https://www.google.com/maps/search/blood+banks+near+me", "_blank")}
      >
        Find Blood Banks
      </Button>
    </CardContent>
  </Card>
);

const DoctorRecommendations = ({ doctors = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended Doctors</CardTitle>
    </CardHeader>
    <CardContent>
      {doctors.length > 0 ? (
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="flex justify-between items-center">
              <span>{doctor.user?.name || 'Unknown Doctor'}</span>
              <span className="text-sm text-gray-500">{doctor.specialization}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No doctor recommendations available yet.</p>
      )}
    </CardContent>
  </Card>
);

const RecentMedicalReports = ({ reports = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Medical Reports</CardTitle>
    </CardHeader>
    <CardContent>
      {reports.length > 0 ? (
        <ul className="space-y-2">
          {reports.map((report) => (
            <li key={report.id} className="flex justify-between items-center">
              <span>{report.title}</span>
              <span className="text-sm text-gray-500">{report.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent medical reports available.</p>
      )}
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
        <li>9:00 AM - Tushar Pareenja (Checkup)</li>
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
      <h3 className="font-bold mb-2">Upcoming Patient: Tushar Pareenja</h3>
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
  const [patientData, setPatientData] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        if (res && res.data) {
          setDoctorList(res.data);
          console.log("Doctors data:", res.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientId = sessionStorage.getItem("patientId");
        console.log("Fetching patient details with ID:", patientId);
        
        const response = await getPatientById(patientId);
        console.log("Patient data structure:", JSON.stringify(response, null, 2));
        
        if (response && response.success && response.data) {
          setPatientData(response.data);
        } else {
          console.error("Failed to fetch patient data or invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    
    fetchPatientDetails();
  }, []);

  // Extract data for components
  const hospitals = patientData?.hospitals || [];
  const appointments = patientData?.appointments || upcomingAppointments; // Fallback to dummy data if none available
  const medicalRecords = patientData?.medicalRecords || recentMedicalReports; // Fallback to dummy data if none available

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 p-8">
        {userType === 'patient' && (
          <>
            <WelcomeBanner user={patientData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UpcomingAppointments appointments={upcomingAppointments} /> 
              <HospitalBedAvailability hospitals={hospitals} />
              <EmergencyServices />
              <DoctorRecommendations doctors={doctorList} />
              <RecentMedicalReports reports={medicalRecords} />
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