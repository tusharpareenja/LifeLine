"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Pill, TestTube, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const services = [
  {
    id: 1,
    name: "Doctor Consultation",
    description: "Book a consultation with a specialist",
    credits: 30,
    icon: Stethoscope,
  },
  {
    id: 2,
    name: "Medicines & Prescriptions",
    description: "Redeem credits for prescribed medications",
    credits: 25,
    icon: Pill,
  },
  {
    id: 3,
    name: "Medical Tests & Diagnostics",
    description: "Use credits for lab tests and diagnostics",
    credits: 40,
    icon: TestTube,
  },
]

export default function RedeemCredits({ onRedeemCredits, currentCredits }) {
    const handleRedeemCredits = (service, credits) => {
        if (currentCredits < credits) {
          toast(
            `Insufficient Credits. You need ${credits - currentCredits} more credits for this service`,
            { variant: "destructive" }
          );
          return;
        }
      
        const success = onRedeemCredits(service, credits);
        if (success) {
          toast(
            `Credits Redeemed! You've redeemed ${credits} credits for ${service.name}`,
            { variant: "default" }
          );
        }
      };
      
      

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Redeem Your Credits</h2>
        <p className="text-muted-foreground">Use your earned credits for medical services</p>
      </div>

      {currentCredits < 25 && (
        <Alert variant="warning" className="bg-yellow-500/10 border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Low Credit Balance</AlertTitle>
          <AlertDescription>
            Your current balance is low. Consider earning more credits or requesting a donation.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">{service.credits} Credits</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {currentCredits >= service.credits ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-red-500">Need {service.credits - currentCredits} more credits</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-card">
              <Button
                className="w-full"
                onClick={() => handleRedeemCredits(service.name, service.credits)}
                disabled={currentCredits < service.credits}
              >
                Redeem Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
    </div>
  )
}

