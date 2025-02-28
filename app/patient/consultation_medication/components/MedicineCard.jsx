import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"



export default function MedicineCard({ name, dosage, quantity, price }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">
              {dosage} - Quantity: {quantity}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${price.toFixed(2)}</p>
            <Button size="sm">Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

