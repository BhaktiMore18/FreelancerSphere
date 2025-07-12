"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeft, DollarSign, Clock, Upload, X, FileText, ImageIcon } from "lucide-react"

export default function ApplyJobPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [bidData, setBidData] = useState({
    bidAmount: "",
    deliveryTime: "",
    coverLetter: "",
    milestones: [{ title: "", description: "", amount: "", dueDate: "" }],
    attachments: [],
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Mock job data
  const job = {
    id: params.id,
    title: "Full Stack Developer for E-commerce Platform",
    budget: "$3,000 - $5,000",
    duration: "2-3 months",
    client: {
      name: "TechCorp Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 23,
    },
    skills: ["React", "Node.js", "MongoDB", "Payment Integration"],
  }

  const handleInputChange = (field, value) => {
    setBidData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...bidData.milestones]
    newMilestones[index][field] = value
    setBidData((prev) => ({ ...prev, milestones: newMilestones }))
  }

  const addMilestone = () => {
    setBidData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: "", description: "", amount: "", dueDate: "" }],
    }))
  }

  const removeMilestone = (index) => {
    if (bidData.milestones.length > 1) {
      const newMilestones = bidData.milestones.filter((_, i) => i !== index)
      setBidData((prev) => ({ ...prev, milestones: newMilestones }))
    }
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type.includes("image") ? "image" : "document",
    }))
    setBidData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }))
  }

  const removeAttachment = (id) => {
    setBidData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!bidData.bidAmount) {
      newErrors.bidAmount = "Bid amount is required"
    } else if (isNaN(bidData.bidAmount) || Number.parseFloat(bidData.bidAmount) <= 0) {
      newErrors.bidAmount = "Please enter a valid amount"
    }

    if (!bidData.deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required"
    }

    if (!bidData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required"
    } else if (bidData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters"
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
    }

    // Validate milestones
    bidData.milestones.forEach((milestone, index) => {
      if (milestone.title && (!milestone.amount || !milestone.dueDate)) {
        newErrors[`milestone_${index}`] = "Complete all milestone fields"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Mock API call - in real app, this would submit the bid
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Proposal submitted successfully!",
        description: "The client will review your proposal and get back to you.",
      })

      router.push(`/jobs/${job.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalMilestoneAmount = bidData.milestones.reduce((sum, milestone) => {
    return sum + (Number.parseFloat(milestone.amount) || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/jobs/${job.id}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bid Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="bidAmount">Your Bid Amount (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder="Enter your bid amount"
                        value={bidData.bidAmount}
                        onChange={(e) => handleInputChange("bidAmount", e.target.value)}
                        className={`pl-10 ${errors.bidAmount ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.bidAmount && <p className="text-sm text-red-500">{errors.bidAmount}</p>}
                    <p className="text-sm text-gray-600">Client's budget: {job.budget}</p>
                  </div>

                  {/* Delivery Time */}
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime">Delivery Time (Days)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="deliveryTime"
                        type="number"
                        placeholder="Number of days"
                        value={bidData.deliveryTime}
                        onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                        className={`pl-10 ${errors.deliveryTime ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.deliveryTime && <p className="text-sm text-red-500">{errors.deliveryTime}</p>}
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
                      value={bidData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                      className={errors.coverLetter ? "border-red-500" : ""}
                    />
                    {errors.coverLetter && <p className="text-sm text-red-500">{errors.coverLetter}</p>}
                    <p className="text-sm text-gray-600">{bidData.coverLetter.length}/1000 characters</p>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Project Milestones (Optional)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                        Add Milestone
                      </Button>
                    </div>

                    {bidData.milestones.map((milestone, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Milestone {index + 1}</h4>
                          {bidData.milestones.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeMilestone(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              placeholder="Milestone title"
                              value={milestone.title}
                              onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Amount ($)</Label>
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={milestone.amount}
                              onChange={(e) => handleMilestoneChange(index, "amount", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              rows={2}
                              placeholder="Milestone description"
                              value={milestone.description}
                              onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input
                              type="date"
                              value={milestone.dueDate}
                              onChange={(e) => handleMilestoneChange(index, "dueDate", e.target.value)}
                            />
                          </div>
                        </div>

                        {errors[`milestone_${index}`] && (
                          <p className="text-sm text-red-500 mt-2">{errors[`milestone_${index}`]}</p>
                        )}
                      </Card>
                    ))}

                    {totalMilestoneAmount > 0 && (
                      <div className="text-sm text-gray-600">
                        Total milestone amount: ${totalMilestoneAmount.toFixed(2)}
                        {bidData.bidAmount && totalMilestoneAmount !== Number.parseFloat(bidData.bidAmount) && (
                          <span className="text-orange-600 ml-2">(Doesn't match bid amount)</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Attachments */}
                  <div className="space-y-4">
                    <Label>Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload relevant files (portfolio, resume, etc.)</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </Label>
                      <p className="text-xs text-gray-500 mt-2">
                        Max 10MB per file. Supported: PDF, DOC, JPG, PNG, ZIP
                      </p>
                    </div>

                    {bidData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {bidData.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              {attachment.type === "image" ? (
                                <ImageIcon className="h-5 w-5 text-blue-600" />
                              ) : (
                                <FileText className="h-5 w-5 text-gray-600" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-sm text-gray-600">{attachment.size}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(attachment.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and understand that this proposal is binding once accepted by the client.
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Submitting..." : "Submit Proposal"}
                    </Button>
                    <Link href={`/jobs/${job.id}`}>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-3">{job.title}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">{job.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{job.duration}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Skills Required:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.client.name}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">
                        ⭐ {job.client.rating} ({job.client.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Proposal Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Be specific</p>
                    <p className="text-blue-700">Explain exactly how you'll approach the project</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Show relevant work</p>
                    <p className="text-green-700">Include portfolio samples that match the project</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Ask questions</p>
                    <p className="text-purple-700">Show you understand the requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
