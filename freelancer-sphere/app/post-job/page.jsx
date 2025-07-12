"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { X, Plus, Upload, FileText, DollarSign, Clock } from "lucide-react"

export default function PostJobPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    budgetType: "fixed",
    budgetMin: "",
    budgetMax: "",
    duration: "",
    experienceLevel: "",
    attachments: [],
    featured: false,
    urgent: false,
  })

  const [newSkill, setNewSkill] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing",
    "Data Science",
    "Marketing",
    "Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming",
  ]

  const skillSuggestions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "PHP",
    "WordPress",
    "Figma",
    "Photoshop",
    "UI/UX Design",
    "Logo Design",
    "Content Writing",
    "SEO",
    "Social Media",
    "Email Marketing",
    "Data Analysis",
    "Machine Learning",
    "Excel",
    "SQL",
  ]

  const handleInputChange = (field, value) => {
    setJobData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addSkill = (skill) => {
    if (skill && !jobData.skills.includes(skill)) {
      setJobData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type.includes("image") ? "image" : "document",
    }))

    setJobData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }))
  }

  const removeAttachment = (id) => {
    setJobData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!jobData.title.trim()) {
      newErrors.title = "Job title is required"
    } else if (jobData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters"
    }

    if (!jobData.description.trim()) {
      newErrors.description = "Job description is required"
    } else if (jobData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    if (!jobData.category) {
      newErrors.category = "Please select a category"
    }

    if (jobData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill"
    }

    if (jobData.budgetType === "fixed") {
      if (!jobData.budgetMin || !jobData.budgetMax) {
        newErrors.budget = "Please specify budget range"
      } else if (Number(jobData.budgetMin) >= Number(jobData.budgetMax)) {
        newErrors.budget = "Maximum budget must be higher than minimum"
      }
    }

    if (!jobData.duration) {
      newErrors.duration = "Please specify project duration"
    }

    if (!jobData.experienceLevel) {
      newErrors.experienceLevel = "Please select experience level"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Job posted successfully!",
        description: "Your job has been published and freelancers can now apply.",
      })

      router.push("/dashboard/client")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const estimatedCost =
    jobData.budgetMin && jobData.budgetMax ? ((Number(jobData.budgetMin) + Number(jobData.budgetMax)) / 2) * 0.1 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">Find the perfect freelancer for your project</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Build a responsive website with React"
                      value={jobData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={jobData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      rows={8}
                      placeholder="Describe your project in detail. Include requirements, deliverables, and any specific instructions..."
                      value={jobData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    <p className="text-sm text-gray-600">{jobData.description.length}/2000 characters</p>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {jobData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(newSkill))}
                    />
                    <Button type="button" onClick={() => addSkill(newSkill)} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Suggested skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions
                        .filter((skill) => !jobData.skills.includes(skill))
                        .slice(0, 8)
                        .map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          >
                            {skill}
                          </button>
                        ))}
                    </div>
                  </div>

                  {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
                </CardContent>
              </Card>

              {/* Budget & Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget & Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Budget Type</Label>
                    <Select
                      value={jobData.budgetType}
                      onValueChange={(value) => handleInputChange("budgetType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgetMin">
                        {jobData.budgetType === "fixed" ? "Minimum Budget ($)" : "Min Hourly Rate ($)"}
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="budgetMin"
                          type="number"
                          placeholder="0"
                          value={jobData.budgetMin}
                          onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                          className={`pl-10 ${errors.budget ? "border-red-500" : ""}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetMax">
                        {jobData.budgetType === "fixed" ? "Maximum Budget ($)" : "Max Hourly Rate ($)"}
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="budgetMax"
                          type="number"
                          placeholder="0"
                          value={jobData.budgetMax}
                          onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                          className={`pl-10 ${errors.budget ? "border-red-500" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.budget && <p className="text-sm text-red-500">{errors.budget}</p>}

                  <div className="space-y-2">
                    <Label htmlFor="duration">Project Duration</Label>
                    <Select value={jobData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                        <SelectItem value="1-2-months">1-2 months</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="more-than-6-months">More than 6 months</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                      value={jobData.experienceLevel}
                      onValueChange={(value) => handleInputChange("experienceLevel", value)}
                    >
                      <SelectTrigger className={errors.experienceLevel ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry-level">Entry Level</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experienceLevel && <p className="text-sm text-red-500">{errors.experienceLevel}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Attachments (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload project files, mockups, or requirements</p>
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
                    <p className="text-xs text-gray-500 mt-2">Max 10MB per file. Supported: PDF, DOC, JPG, PNG, ZIP</p>
                  </div>

                  {jobData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {jobData.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-600" />
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
                </CardContent>
              </Card>

              {/* Additional Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={jobData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Make this job featured (+$10) - Get 3x more visibility
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={jobData.urgent}
                      onCheckedChange={(checked) => handleInputChange("urgent", checked)}
                    />
                    <Label htmlFor="urgent" className="text-sm">
                      Mark as urgent (+$5) - Attract faster responses
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Posting Job..." : "Post Job"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Job Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">{jobData.title || "Your job title will appear here"}</h3>
                  <p className="text-sm text-gray-600">
                    {jobData.description.slice(0, 100) || "Your job description will appear here"}
                    {jobData.description.length > 100 && "..."}
                  </p>

                  {jobData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {jobData.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {jobData.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{jobData.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {jobData.budgetMin && jobData.budgetMax && (
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>
                          ${jobData.budgetMin} - ${jobData.budgetMax}
                        </span>
                      </div>
                      {jobData.duration && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{jobData.duration.replace("-", " ")}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Job posting</span>
                    <span className="font-medium">Free</span>
                  </div>

                  {jobData.featured && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Featured listing</span>
                      <span className="font-medium">$10.00</span>
                    </div>
                  )}

                  {jobData.urgent && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Urgent badge</span>
                      <span className="font-medium">$5.00</span>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${(jobData.featured ? 10 : 0) + (jobData.urgent ? 5 : 0)}.00</span>
                    </div>
                  </div>

                  {estimatedCost > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Platform fee:</strong> ${estimatedCost.toFixed(2)}
                        <br />
                        <span className="text-xs">10% of project value (charged after completion)</span>
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Be specific</p>
                    <p className="text-green-700">Clear requirements get better proposals</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Set realistic budgets</p>
                    <p className="text-blue-700">Fair pricing attracts quality freelancers</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Add examples</p>
                    <p className="text-purple-700">Visual references help freelancers understand</p>
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
