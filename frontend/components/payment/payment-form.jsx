"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Shield, DollarSign } from "lucide-react"

export function PaymentForm({ project, onSubmit, onCancel }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    amount: project?.budget || "",
    paymentMethod: "",
    useEscrow: true,
    milestones: [{ title: "", amount: "", dueDate: "" }],
    notes: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.amount || !formData.paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    toast({
      title: "Payment Initiated",
      description: formData.useEscrow
        ? "Payment has been deposited into escrow."
        : "Payment has been sent successfully.",
    })
  }

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: "", amount: "", dueDate: "" }],
    }))
  }

  const removeMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
  }

  const updateMilestone = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => (i === index ? { ...milestone, [field]: value } : milestone)),
    }))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Make Payment</span>
        </CardTitle>
        {project && <p className="text-sm text-gray-600">Payment for: {project.title}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="stripe">Credit Card (Stripe)</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Escrow Option */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useEscrow"
                checked={formData.useEscrow}
                onChange={(e) => setFormData((prev) => ({ ...prev, useEscrow: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="useEscrow" className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Use Escrow Protection (Recommended)</span>
              </Label>
            </div>
            {formData.useEscrow && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Your payment will be held securely in escrow until the work is completed and approved. A 3% escrow fee
                  will be applied.
                </p>
              </div>
            )}
          </div>

          {/* Milestones (if using escrow) */}
          {formData.useEscrow && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Payment Milestones</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                  Add Milestone
                </Button>
              </div>

              {formData.milestones.map((milestone, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    {formData.milestones.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                      <Input
                        id={`milestone-title-${index}`}
                        placeholder="e.g., Frontend Development"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`milestone-amount-${index}`}>Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id={`milestone-amount-${index}`}
                          type="number"
                          placeholder="0.00"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`milestone-date-${index}`}>Due Date</Label>
                      <Input
                        id={`milestone-date-${index}`}
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => updateMilestone(index, "dueDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Payment Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>${formData.amount || "0.00"}</span>
              </div>
              {formData.useEscrow && (
                <div className="flex justify-between">
                  <span>Escrow Fee (3%):</span>
                  <span>${(Number.parseFloat(formData.amount || 0) * 0.03).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Total:</span>
                <span>
                  $
                  {formData.useEscrow
                    ? (Number.parseFloat(formData.amount || 0) * 1.03).toFixed(2)
                    : Number.parseFloat(formData.amount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">
              <CreditCard className="mr-2 h-4 w-4" />
              {formData.useEscrow ? "Deposit to Escrow" : "Send Payment"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
