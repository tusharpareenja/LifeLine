// Generate mock data for 200 beds
export const generateMockBeds = () => {
  const beds = []
  const types = ["ICU", "General", "Emergency", "Pediatric", "Cardiac", "Surgical"]
  const statuses = ["available", "occupied", "reserved", "maintenance"]
  const patients = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Emma Wilson",
    "David Brown",
    "Sarah Davis",
    "Chris Lee",
    "Anna Garcia",
    "Tom Wilson",
    "Lisa Anderson",
    null,
    null,
    null,
  ]

  for (let i = 1; i <= 200; i++) {
    const bedId = `B${i.toString().padStart(3, "0")}`
    const ward = `Ward-${Math.ceil(i / 20)}` // Auto-assign ward based on bed number
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const patient = status === "occupied" ? patients[Math.floor(Math.random() * patients.length)] : null
    const room = `${Math.floor(Math.random() * 50) + 100}`

    beds.push({
      id: bedId,
      ward,
      room,
      type,
      status,
      patient,
      lastUpdated: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
      hasVentilator: type === "ICU" && Math.random() > 0.6,
      priority: type === "ICU" ? "high" : type === "Emergency" ? "urgent" : "normal",
    })
  }
  return beds
}

// Generate ventilator data
export const generateVentilators = () => {
  const ventilators = []
  for (let i = 1; i <= 45; i++) {
    const ventId = `V${i.toString().padStart(3, "0")}`
    const statuses = ["available", "in-use", "maintenance", "reserved"]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    ventilators.push({
      id: ventId,
      model: `VentMax ${Math.random() > 0.5 ? "Pro" : "Standard"}`,
      location: `ICU-${Math.floor(Math.random() * 3) + 1}`,
      status,
      assignedBed: status === "in-use" ? `B${Math.floor(Math.random() * 50) + 1}`.padStart(3, "0") : null,
      lastMaintenance: new Date(Date.now() - Math.random() * 2592000000).toLocaleDateString(),
      batteryLevel: Math.floor(Math.random() * 100),
    })
  }
  return ventilators
}
