"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Grid, List } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "Mayank Sharma",
    age: 35,
    condition: "Hypertension",
    lastVisit: "2023-05-15",
    status: "Active",
    vip: true,
  },
  { id: 2, name: "Tushar Pareenja", age: 42, condition: "Diabetes", lastVisit: "2023-05-10", status: "Follow-up" },
  { id: 3, name: "Rohit", age: 28, condition: "Asthma", lastVisit: "2023-05-05", status: "Stable" },
  { id: 4, name: "Karan", age: 50, condition: "Arthritis", lastVisit: "2023-05-01", status: "Active" },
  {
    id: 5,
    name: "Eva Davis",
    age: 63,
    condition: "Osteoporosis",
    lastVisit: "2023-04-28",
    status: "Follow-up",
    vip: true,
  },
];

export default function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className={`hover-expand ${patient.vip ? "border-2 border-yellow-400" : ""}`}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                <p className="text-sm text-muted-foreground">Condition: {patient.condition}</p>
                {viewMode === "list" && (
                  <>
                    <p className="text-sm text-muted-foreground">Last Visit: {patient.lastVisit}</p>
                    <Badge>{patient.status}</Badge>
                  </>
                )}
                {patient.vip && <Badge variant="secondary">VIP</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
