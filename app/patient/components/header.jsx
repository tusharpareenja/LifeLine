import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { getAppointmentsByPatientId } from "@/app/actions/appointments";

export default function Header() {
  const [upcoming, setUpcoming] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoading(true);
      setError("");
      // Get patientId from sessionStorage (replace with your auth logic if needed)
      let patientId = null;
      if (typeof window !== 'undefined') {
        patientId = sessionStorage.getItem('patientId');
        console.log('Patient ID from sessionStorage:', patientId);
      }
      if (!patientId) {
        setUpcoming(null);
        setError("No patient logged in");
        setLoading(false);
        return;
      }
      const res = await getAppointmentsByPatientId(patientId, { onlyUpcoming: true });
      console.log('getAppointmentsByPatientId response:', res);
      if (res.success && res.data.length > 0) {
        // Already filtered for upcoming in backend, just take the first
        setUpcoming(res.data[0]);
        console.log('Upcoming appointment:', res.data[0]);
        setError("");
      } else {
        setUpcoming(null);
        setError("No upcoming appointments");
        console.log('No upcoming appointments found.');
      }
      setLoading(false);
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-primary">Book Your Consultation with Top Specialists 🚑</h1>
      <div className="relative">
        <Input
          type="search"
          placeholder="Find doctors by name, specialty, or hospital..."
          className="pl-10 pr-4 py-2"
          aria-label="Search doctors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : upcoming ? (
            <>
              <div><b>Date:</b> {new Date(upcoming.date).toLocaleString()}</div>
              <div><b>Doctor:</b> {upcoming.doctor?.user?.name || 'N/A'}</div>
              <div><b>Hospital:</b> {upcoming.hospital?.name || 'N/A'}</div>
              <div><b>Symptoms:</b> {upcoming.symptoms || '-'}</div>
              <div><b>Status:</b> {upcoming.status}</div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

