"use client"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { PaymentForm } from "@/components/payment/payment-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectPaymentPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  // Mock project data
  const project = {
    id: params.id,
    title: "E-commerce Website Development",
    freelancer: "John Doe",
    client: "Sarah Johnson",
    budget: 4200,
    status: "in_progress",
  }

  const handlePaymentSubmit = (paymentData) => {
    console.log("Payment submitted:", paymentData)
    // Here you would integrate with your payment processor
    // and create the escrow account if needed

    // Redirect to project page or payment confirmation
    router.push(`/projects/${params.id}`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/projects/${params.id}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Make Payment</h1>
          <p className="text-gray-600">Secure payment processing with escrow protection</p>
        </div>

        {/* Payment Form */}
        <PaymentForm project={project} onSubmit={handlePaymentSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
