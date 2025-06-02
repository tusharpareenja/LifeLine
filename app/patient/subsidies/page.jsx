"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, ExternalLinkIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { subsidyChatSession } from "@/config/AiModel"
import { getPatientById } from "@/app/actions/patients"

export default function SubsidiesPage() {
  const [patientData, setPatientData] = useState(null);
  const [overview, setOverview] = useState(null);
  const [subsidies, setSubsidies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientId = sessionStorage.getItem("patientId");
        const response = await getPatientById(patientId);
        if (response && response.success && response.data) {
          setPatientData(response.data);
        } else {
          setError("Failed to fetch patient data or invalid data structure");
        }
      } catch (error) {
        setError("Error fetching patient details");
      }
    };
    fetchPatientDetails();
  }, []);

  useEffect(() => {
    const fetchOverview = async () => {
      if (!patientData) return;
      setIsLoading(true);
      try {
        // Build patient JSON for the prompt
        const patientJson = {
          name: patientData.name,
          dob: patientData.dob,
          income: patientData.yearlyIncome,
          medical_conditions: patientData.medicalIssue ? [patientData.medicalIssue] : [],
          genetic_diseases: patientData.geneticDiseases,
          long_term_medication: patientData.longTermMedication,
          disability: patientData.disability || null,
          employment_status: patientData.employmentStatus || null,
          insurance_status: patientData.insuranceStatus || null,
          has_subsidy: patientData.hasSubsidy,
          subsidy_type: patientData.subsidyType,
          subsidy_details: patientData.subsidyDetails,
          gender: patientData.gender,
          blood_type: patientData.bloodType,
          city: patientData.city || null,
            address: patientData.address || null,
            state: patientData.state || null,
        };
        const BASIC_PROMPT = `You are an expert on Indian government welfare schemes and subsidies.\n\nGiven the following patient data in JSON format, identify all applicable healthcare or financial support schemes provided by the central or state governments of India. Only include schemes for which the patient clearly qualifies based on the data give every subsidy irrespctive the perosn is eligible or not ok. If uncertain, exclude them.\n\nPatient Data:\n\n\`json\n${JSON.stringify(patientJson, null, 2)}\n\`\n\nReturn the result as a JSON object with the following structure:\n\n{\n  \"patient_details\": { ... },\n  \"eligible_subsidies\": [\n    {\n      \"subsidy_name\": \"Name of the scheme\",\n      \"provider\": \"Central Government / State Government / Other\",\n      \"subsidy_info\": \"Brief summary of the scheme (1-2 sentences).\",\n      \"application_link\": \"Official link or 'N/A'\"\n    }\n    // additional schemes\n  ]\n}`;
        const result = await subsidyChatSession.sendMessage(BASIC_PROMPT);
        console.log("Patient Data:", patientJson);
        console.log("AI Prompt:", BASIC_PROMPT);
        console.log("AI Response:", result);
        
        // Get the actual text from Gemini API response
        let Overview;
        if (typeof result?.response?.text === "function") {
          Overview = await result.response.text();
        } else {
          Overview = result?.response?.text || "No response received";
        }
        console.log("Parsed Overview:", Overview);
        setOverview(Overview);
        // Try to parse the JSON from the AI response
        let parsed;
        try {
          // Try to extract the first JSON object from the AI response, even if extra text is present
          const match = Overview.match(/\{[\s\S]*\}/);
          if (match) {
            parsed = JSON.parse(match[0]);
          } else {
            parsed = null;
          }
        } catch (e) {
          parsed = null;
        }
        if (parsed && parsed.eligible_subsidies) {
          setSubsidies(parsed.eligible_subsidies);
        } else {
          setSubsidies([]);
        }
      } catch (error) {
        setError('Failed to fetch medical overview.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverview();
  }, [patientData]);



  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-2">Patient Subsidies Portal</h1>
          <p className="text-blue-100 max-w-2xl">
            Access financial assistance programs to help cover your healthcare costs. Browse available subsidies and
            find application details below.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl py-8 px-4 md:px-6">
        <Card className="mb-8 border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-blue-800">Available Subsidies</CardTitle>
                <CardDescription>Find financial assistance programs you may qualify for</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                <Input
                  type="search"
                  placeholder="Search subsidies..."
                  className="pl-9 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-blue-50">
                  <TableRow>
                    <TableHead className="text-blue-700 font-medium">Subsidy Name</TableHead>
                    <TableHead className="text-blue-700 font-medium">Provider</TableHead>
                    <TableHead className="text-blue-700 font-medium">Details</TableHead>
                    <TableHead className="text-blue-700 font-medium w-[150px]">Application</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
                  ) : subsidies.length > 0 ? (
                    subsidies.map((subsidy, idx) => (
                      <TableRow key={idx} className="hover:bg-blue-50/50">
                        <TableCell className="font-medium">{subsidy.subsidy_name}</TableCell>
                        <TableCell>{subsidy.provider}</TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm text-gray-700 mb-1">{subsidy.subsidy_info}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            <Link href={subsidy.application_link || "#"} target="_blank">
                              Apply
                              <ExternalLinkIcon className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={4}>No subsidies found for this patient.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-800">How to Apply</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ol className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    1
                  </span>
                  <span>Review the eligibility requirements for each subsidy program</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    2
                  </span>
                  <span>Gather required documentation (ID, income proof, medical records)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    3
                  </span>
                  <span>Click the "Apply" button to access the application portal</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    4
                  </span>
                  <span>Submit your application and track its status online</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-800">Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 text-gray-700">
                <p>Our patient advocates are available to help you navigate the application process.</p>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm">1-800-PATIENT (1-800-728-4368)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm">support@patientsubsidies.org</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 mt-2">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-blue-50 border-t border-blue-100 py-6 px-4 md:px-6 mt-8">
        <div className="container mx-auto max-w-6xl text-center text-sm text-blue-700">
          <p>
            © 2025 Patient Subsidies Portal. All subsidies are subject to eligibility requirements and available
            funding.
          </p>
          <p className="mt-1">Last updated: May 29, 2025</p>
        </div>
      </footer>
    </div>
  )
}
