import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, Check, X, Clock, Stethoscope, Mic, MicOff, Square } from "lucide-react"
import { getAppointments, updateAppointmentStatus } from "@/app/actions/appointments"

export function AppointmentManagement({ doctorId }) {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("active") // 'active' | 'completed' | 'all'
  
  // Diagnosis dialog state
  const [diagnosisDialog, setDiagnosisDialog] = useState({
    isOpen: false,
    appointmentId: null,
    isRecording: false,
    recordedText: "",
    isConverting: false
  })

  // Speech recognition setup
  const [recognition, setRecognition] = useState(null)
  const [speechLang, setSpeechLang] = useState(navigator.language || 'en-US')

  // Re-initialize recognition every time dialog opens
  useEffect(() => {
    if (diagnosisDialog.isOpen) {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        recognitionInstance.lang = speechLang

        recognitionInstance.onstart = () => {
          console.log('Speech recognition started: converting speech to text...')
        }

        recognitionInstance.onresult = (event) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            console.log('Speech recognition result:', finalTranscript)
            setDiagnosisDialog(prev => ({
              ...prev,
              recordedText: prev.recordedText + ' ' + finalTranscript
            }))
          }
        }

        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone permissions in your browser settings.')
          }
          setDiagnosisDialog(prev => ({
            ...prev,
            isRecording: false
          }))
        }

        recognitionInstance.onend = () => {
          console.log('Speech recognition stopped.')
          setDiagnosisDialog(prev => ({
            ...prev,
            isRecording: false
          }))
        }

        setRecognition(recognitionInstance)
      } else {
        setRecognition(null)
        alert('Speech recognition is not supported in this browser.')
      }
    } else {
      setRecognition(null)
    }
    // Cleanup on dialog close
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [diagnosisDialog.isOpen, speechLang])

  useEffect(() => {
    async function fetchAppointments() {
      if (!doctorId) return
      setLoading(true)
      setError("")
      const res = await getAppointments({ doctorId })
      if (res.success) {
        setAppointments(res.data)
      } else {
        setAppointments([])
        setError(res.error || "Failed to fetch appointments")
      }
      setLoading(false)
    }
    fetchAppointments()
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [doctorId])

  // Tab filtering
  const filteredAppointments = appointments
    .filter((appointment) => {
      const status = String(appointment.status).toUpperCase()
      if (activeTab === "completed") return status === "COMPLETED"
      if (activeTab === "active") return status !== "COMPLETED"
      return true // 'all'
    })
    .filter(
      (appointment) =>
        appointment.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.date && new Date(appointment.date).toLocaleDateString().includes(searchTerm)) ||
        (appointment.symptoms && appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase())),
    )

  // Mark appointment as completed (update UI immediately, remove from active tab)
  const handleStatusChange = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment,
      ),
    )
    await updateAppointmentStatus(id, newStatus)
  }

  const handleDownloadReport = (id) => {
    // Open the PDF download URL in a new tab
    const appointment = appointments.find(a => a.id === id);
    const patientId = appointment?.patient?.id;
    if (!patientId) {
      alert("Patient ID not found for this appointment.");
      return;
    }
    const pdfUrl = `http://localhost:3000/patient/medical-records/download_record/${patientId}`;
    window.open(pdfUrl, '_blank');
  }

  // Diagnosis functions
  const openDiagnosisDialog = (appointmentId) => {
    setDiagnosisDialog({
      isOpen: true,
      appointmentId,
      isRecording: false,
      recordedText: "",
      isConverting: false
    })
  }

  const closeDiagnosisDialog = () => {
    if (diagnosisDialog.isRecording && recognition) {
      recognition.stop()
    }
    setDiagnosisDialog({
      isOpen: false,
      appointmentId: null,
      isRecording: false,
      recordedText: "",
      isConverting: false
    })
  }

  const startRecording = () => {
    if (recognition) {
      if (diagnosisDialog.isRecording) {
        console.warn('Speech recognition is already running.')
        return
      }
      setDiagnosisDialog(prev => ({
        ...prev,
        isRecording: true,
        recordedText: ""
      }))
      try {
        recognition.start()
        console.log('Recognition started by user.')
      } catch (err) {
        console.error('Recognition could not start:', err)
      }
    } else {
      console.warn('Speech recognition is not available.')
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      setDiagnosisDialog(prev => ({
        ...prev,
        isRecording: false
      }))
      console.log('Recognition stopped by user.')
    }
  }

  const convertToHinglish = async (hindiText) => {
    // Simulate conversion to Hinglish (replace with actual API call)
    setDiagnosisDialog(prev => ({ ...prev, isConverting: true }))
    
    // Mock conversion - in real implementation, call your Hindi to Hinglish conversion API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simple mock conversion (replace with actual conversion logic)
    const hinglishText = hindiText
      .replace(/और/g, 'aur')
      .replace(/का/g, 'ka')
      .replace(/है/g, 'hai')
      .replace(/में/g, 'mein')
      .replace(/को/g, 'ko')
      .replace(/से/g, 'se')
      .replace(/के/g, 'ke')
      .replace(/की/g, 'ki')
      .replace(/पर/g, 'par')
      .replace(/लिए/g, 'liye')
    
    setDiagnosisDialog(prev => ({
      ...prev,
      recordedText: hinglishText,
      isConverting: false
    }))
  }

  const handleDiagnosisDone = async () => {
    if (diagnosisDialog.recordedText.trim()) {
      await convertToHinglish(diagnosisDialog.recordedText)

      // Send to Gemini AI for diagnosis extraction
      let diagnosis = "";
      let prescription = "";
      try {
        const { diagnosisChatSession } = await import("@/config/AiModel")
        const prompt = `You are an expert medical assistant. Given the following doctor's speech (converted to text), extract and organize the information into a structured format with the following rows:\n\nDiagnosis | Prescription | Lab Reports\n\nIf any section is missing, leave it blank. Return the result as a JSON object with this structure:\n\n{\n  "diagnosis": "...",\n  "prescription": "...",\n  "lab_reports": "..."\n}\n\nDoctor's speech:\n"${diagnosisDialog.recordedText.trim()}"`
        const result = await diagnosisChatSession.sendMessage(prompt)
        const aiText = result.response.text();
        console.log("Gemini AI diagnosis output:", aiText);
        // Try to parse JSON from AI output
        try {
          const aiJson = JSON.parse(aiText);
          diagnosis = aiJson.diagnosis || "";
          prescription = aiJson.prescription || "";
        } catch (err) {
          diagnosis = diagnosisDialog.recordedText.trim();
          prescription = "";
        }
      } catch (err) {
        console.error("Error calling Gemini AI for diagnosis:", err);
        diagnosis = diagnosisDialog.recordedText.trim();
        prescription = "";
      }

      // Save medical report to backend
      try {
        const { upsertMedicalReport } = await import("@/app/actions/appointments")
        const appointment = appointments.find(a => a.id === diagnosisDialog.appointmentId);
        if (appointment) {
          const patientId = appointment.patient?.id;
          const doctorId = appointment.doctor?.id;
          if (patientId && doctorId) {
            const reportRes = await upsertMedicalReport({ patientId, doctorId, diagnosis, prescription });
            if (reportRes.success) {
              console.log("Medical report saved:", reportRes.data);
            } else {
              console.error("Failed to save medical report:", reportRes.error);
            }
          }
        }
      } catch (err) {
        console.error("Error saving medical report:", err);
      }

      // Update appointment with diagnosis (UI only)
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === diagnosisDialog.appointmentId
            ? { ...appointment, diagnosis }
            : appointment
        )
      );

      // Close dialog after successful conversion
      setTimeout(() => {
        closeDiagnosisDialog();
      }, 1000);
    }
  }

  const getStatusColor = (status) => {
    switch (String(status).toUpperCase()) {
      case "PENDING":
      case "SCHEDULED":
        return "bg-yellow-500"
      case "CONFIRMED":
        return "bg-green-500"
      case "COMPLETED":
        return "bg-blue-500"
      case "CANCELLED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> View Calendar
        </Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <Button variant={activeTab === "active" ? "default" : "outline"} onClick={() => setActiveTab("active")}>
          Active
        </Button>
        <Button variant={activeTab === "completed" ? "default" : "outline"} onClick={() => setActiveTab("completed")}>
          Completed
        </Button>
        <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
          All
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading appointments...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500 font-semibold">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Symptoms</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient?.user?.name || "N/A"}</TableCell>
                <TableCell>{appointment.date ? new Date(appointment.date).toLocaleString() : "N/A"}</TableCell>
                <TableCell>{appointment.symptoms || "-"}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "CONFIRMED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED" || String(appointment.status).toUpperCase() === "CONFIRMED"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "SCHEDULED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED" || String(appointment.status).toUpperCase() === "SCHEDULED"}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "COMPLETED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED"}
                    >
                      <Check className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openDiagnosisDialog(appointment.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Stethoscope className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport(appointment.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Diagnosis Dialog */}
      {diagnosisDialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Voice Diagnosis</h2>
              <Button variant="ghost" size="sm" onClick={closeDiagnosisDialog}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mb-4">
              <div className="border rounded-lg p-4 min-h-[120px] bg-gray-50">
                {diagnosisDialog.isConverting ? (
                  <div className="text-center text-gray-500">
                    Converting to Hinglish...
                  </div>
                ) : (
                  <div className="text-sm">
                    {diagnosisDialog.recordedText || "Start recording to capture diagnosis..."}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Speech Language</label>
              <select
                value={speechLang}
                onChange={e => setSpeechLang(e.target.value)}
                className="w-full rounded border-gray-300 p-2"
              >
                <option value="en-US">English (US)</option>
                <option value="hi-IN">Hindi (India)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="it-IT">Italian</option>
                <option value="pt-PT">Portuguese</option>
                <option value="ja-JP">Japanese</option>
                <option value="ko-KR">Korean</option>
                <option value="zh-CN">Chinese (Simplified)</option>
              </select>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              {!diagnosisDialog.isRecording ? (
                <Button 
                  onClick={startRecording}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={diagnosisDialog.isConverting}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button 
                  onClick={stopRecording}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDiagnosisDialog}>
                Cancel
              </Button>
              <Button 
                onClick={handleDiagnosisDone}
                disabled={!diagnosisDialog.recordedText.trim() || diagnosisDialog.isRecording || diagnosisDialog.isConverting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {diagnosisDialog.isConverting ? "Converting..." : "Done"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}