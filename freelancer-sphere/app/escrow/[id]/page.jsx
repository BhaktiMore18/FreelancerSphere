"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Send,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"

export default function EscrowDetailsPage() {
  const params = useParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const [disputeReason, setDisputeReason] = useState("")

  // Mock escrow data
  const escrow = {
    id: params.id,
    project: "E-commerce Platform Development",
    client: "Sarah Johnson",
    freelancer: "John Doe",
    totalAmount: 4200,
    releasedAmount: 1500,
    remainingAmount: 2700,
    status: "active",
    createdDate: "2024-01-01",
    escrowFee: 126, // 3% of total
    milestones: [
      {
        id: 1,
        title: "Frontend Development",
        amount: 1500,
        status: "completed",
        releaseDate: "2024-01-15",
        description: "Complete responsive frontend with React",
        deliverables: ["Homepage", "Product pages", "Shopping cart", "User authentication"],
      },
      {
        id: 2,
        title: "Backend API Development",
        amount: 1200,
        status: "completed",
        dueDate: "2024-02-01",
        description: "RESTful API with Node.js and MongoDB",
        deliverables: ["User management API", "Product catalog API", "Order processing API"],
        submittedDate: "2024-01-28",
        submissionNotes: "API is complete and tested. All endpoints are documented and working as expected.",
      },
      {
        id: 3,
        title: "Payment Integration",
        amount: 1000,
        status: "in_progress",
        dueDate: "2024-02-15",
        description: "Stripe payment integration",
        deliverables: ["Payment processing", "Webhook handling", "Refund system"],
      },
      {
        id: 4,
        title: "Testing & Deployment",
        amount: 500,
        status: "pending",
        dueDate: "2024-03-01",
        description: "Testing and production deployment",
        deliverables: ["Unit tests", "Integration tests", "Production deployment"],
      },
    ],
    communications: [
      {
        id: 1,
        sender: "client",
        message: "Great work on the frontend! The design looks exactly as requested.",
        timestamp: "2024-01-15 10:30 AM",
      },
      {
        id: 2,
        sender: "freelancer",
        message: "Thank you! I've submitted the backend API for review. Please test the endpoints.",
        timestamp: "2024-01-28 2:15 PM",
      },
      {
        id: 3,
        sender: "client",
        message: "The API works well. I'll release the payment for this milestone.",
        timestamp: "2024-01-29 9:00 AM",
      },
    ],
  }

  const handleReleaseMilestone = (milestoneId) => {
    toast({
      title: "Payment Released",
      description: "The milestone payment has been released to the freelancer.",
    })
  }

  const handleDispute = () => {
    if (!disputeReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the dispute.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Dispute Initiated",
      description: "Your dispute has been submitted and will be reviewed by our team.",
    })
    setDisputeReason("")
  }

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/payments">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{escrow.project}</h1>
              <p className="text-gray-600">Escrow ID: {escrow.id}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              <Shield className="mr-1 h-4 w-4" />
              Active Escrow
            </Badge>
          </div>
        </div>

        {/* Escrow Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${escrow.totalAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Released</p>
              <p className="text-2xl font-bold text-green-600">${escrow.releasedAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">In Escrow</p>
              <p className="text-2xl font-bold text-blue-600">${escrow.remainingAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Created</p>
              <p className="text-lg font-bold text-purple-600">{escrow.createdDate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Project Progress</h3>
              <span className="text-sm text-gray-600">
                {Math.round((escrow.releasedAmount / escrow.totalAmount) * 100)}% Complete
              </span>
            </div>
            <Progress value={(escrow.releasedAmount / escrow.totalAmount) * 100} className="h-3" />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>{escrow.client}</span>
              <span>{escrow.freelancer}</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="milestones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-6">
            {escrow.milestones.map((milestone) => (
              <Card key={milestone.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={getMilestoneStatusColor(milestone.status)}>
                        <div className="flex items-center space-x-1">
                          {getMilestoneStatusIcon(milestone.status)}
                          <span className="capitalize">{milestone.status.replace("_", " ")}</span>
                        </div>
                      </Badge>
                      <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${milestone.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {milestone.releaseDate ? `Released: ${milestone.releaseDate}` : `Due: ${milestone.dueDate}`}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{milestone.description}</p>

                  {/* Deliverables */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Deliverables:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {milestone.deliverables.map((deliverable, index) => (
                        <li key={index}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Submission Notes */}
                  {milestone.submissionNotes && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">Submission Notes:</h4>
                      <p className="text-sm text-blue-800">{milestone.submissionNotes}</p>
                      {milestone.submittedDate && (
                        <p className="text-xs text-blue-600 mt-1">Submitted: {milestone.submittedDate}</p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  {milestone.status === "completed" && !milestone.releaseDate && user?.role === "client" && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button onClick={() => handleReleaseMilestone(milestone.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Release ${milestone.amount.toLocaleString()}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Dispute
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dispute Milestone</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Please provide a detailed reason for disputing this milestone:
                            </p>
                            <Textarea
                              placeholder="Describe the issues with the delivered work..."
                              value={disputeReason}
                              onChange={(e) => setDisputeReason(e.target.value)}
                              rows={4}
                            />
                            <div className="flex space-x-2">
                              <Button onClick={handleDispute} className="flex-1">
                                Submit Dispute
                              </Button>
                              <Button variant="outline" onClick={() => setDisputeReason("")}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {milestone.status === "in_progress" && user?.role === "freelancer" && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Submit Work
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Client
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escrow.communications.map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-4 rounded-lg ${comm.sender === "client" ? "bg-blue-50 ml-8" : "bg-gray-50 mr-8"}`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium capitalize">{comm.sender}</span>
                        <span className="text-sm text-gray-600">{comm.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{comm.message}</p>
                    </div>
                  ))}
                </div>

                {/* Add Message */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea placeholder="Type your message..." className="flex-1" rows={2} />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Escrow Account Created</p>
                        <p className="text-sm text-gray-600">
                          Initial deposit of ${escrow.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{escrow.createdDate}</span>
                  </div>

                  {escrow.milestones
                    .filter((m) => m.releaseDate)
                    .map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <div className="flex items-center space-x-3">
                          <Send className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Payment Released</p>
                            <p className="text-sm text-gray-600">{milestone.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${milestone.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{milestone.releaseDate}</p>
                        </div>
                      </div>
                    ))}

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Escrow Fee</p>
                        <p className="text-sm text-gray-600">3% platform fee</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${escrow.escrowFee}</p>
                      <p className="text-sm text-gray-600">{escrow.createdDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
