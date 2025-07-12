"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, MessageSquare, Eye, ThumbsUp, ThumbsDown, FileText, Award } from "lucide-react"

export default function JobBidsPage() {
  const params = useParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedBid, setSelectedBid] = useState(null)

  // Mock job data
  const job = {
    id: params.id,
    title: "Full Stack Developer for E-commerce Platform",
    budget: "$3,000 - $5,000",
    status: "Open",
    postedTime: "2 hours ago",
    totalBids: 15,
  }

  // Mock bids data
  const bids = [
    {
      id: 1,
      freelancer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        title: "Full Stack Developer",
        location: "San Francisco, CA",
        rating: 4.9,
        reviews: 127,
        completedJobs: 89,
        successRate: "98%",
        responseTime: "1 hour",
        memberSince: "2020",
      },
      bidAmount: 4200,
      deliveryTime: 45,
      coverLetter:
        "I have extensive experience building e-commerce platforms with React and Node.js. I've completed 15+ similar projects with 100% client satisfaction. I can deliver a modern, scalable solution that meets all your requirements including payment integration, user authentication, and admin dashboard. My approach includes thorough testing and documentation.",
      milestones: [
        { title: "Frontend Development", amount: 1500, dueDate: "2024-02-15" },
        { title: "Backend API", amount: 1200, dueDate: "2024-02-28" },
        { title: "Payment Integration", amount: 800, dueDate: "2024-03-10" },
        { title: "Testing & Deployment", amount: 700, dueDate: "2024-03-20" },
      ],
      attachments: [
        { name: "Portfolio.pdf", size: "2.4 MB" },
        { name: "Similar_Project_Demo.zip", size: "15.8 MB" },
      ],
      submittedTime: "2 hours ago",
      status: "pending",
      featured: true,
    },
    {
      id: 2,
      freelancer: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=50&width=50",
        title: "Senior Full Stack Developer",
        location: "New York, NY",
        rating: 4.8,
        reviews: 95,
        completedJobs: 67,
        successRate: "96%",
        responseTime: "2 hours",
        memberSince: "2019",
      },
      bidAmount: 3800,
      deliveryTime: 60,
      coverLetter:
        "Hello! I'm a senior full-stack developer with 6+ years of experience. I specialize in React, Node.js, and MongoDB - exactly what you need for this project. I've built several e-commerce platforms and understand the complexities involved. I can provide a robust, secure solution with clean code and comprehensive documentation.",
      milestones: [
        { title: "Project Setup & Planning", amount: 500, dueDate: "2024-02-10" },
        { title: "Core Development", amount: 2500, dueDate: "2024-03-15" },
        { title: "Integration & Testing", amount: 800, dueDate: "2024-03-30" },
      ],
      attachments: [{ name: "Resume.pdf", size: "1.2 MB" }],
      submittedTime: "4 hours ago",
      status: "pending",
      featured: false,
    },
    {
      id: 3,
      freelancer: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=50&width=50",
        title: "E-commerce Specialist",
        location: "Austin, TX",
        rating: 4.7,
        reviews: 73,
        completedJobs: 45,
        successRate: "94%",
        responseTime: "30 minutes",
        memberSince: "2021",
      },
      bidAmount: 4500,
      deliveryTime: 40,
      coverLetter:
        "I specialize in e-commerce development and have built 20+ online stores. I understand the importance of user experience, security, and performance. I can deliver a modern, mobile-responsive platform with all the features you need. My solutions are always scalable and maintainable.",
      milestones: [],
      attachments: [
        { name: "E-commerce_Portfolio.pdf", size: "5.1 MB" },
        { name: "Client_Testimonials.pdf", size: "800 KB" },
      ],
      submittedTime: "1 day ago",
      status: "pending",
      featured: false,
    },
    {
      id: 4,
      freelancer: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=50&width=50",
        title: "Full Stack Developer",
        location: "Seattle, WA",
        rating: 4.6,
        reviews: 52,
        completedJobs: 34,
        successRate: "92%",
        responseTime: "4 hours",
        memberSince: "2022",
      },
      bidAmount: 3200,
      deliveryTime: 75,
      coverLetter:
        "I'm a dedicated full-stack developer with strong experience in React and Node.js. While I may have fewer reviews than others, I'm committed to delivering high-quality work at a competitive price. I'm available to start immediately and can work full-time on your project.",
      milestones: [],
      attachments: [],
      submittedTime: "2 days ago",
      status: "pending",
      featured: false,
    },
  ]

  const filteredAndSortedBids = bids
    .filter((bid) => {
      if (filterBy === "all") return true
      if (filterBy === "featured") return bid.featured
      if (filterBy === "top-rated") return bid.freelancer.rating >= 4.8
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "lowest-bid":
          return a.bidAmount - b.bidAmount
        case "highest-bid":
          return b.bidAmount - a.bidAmount
        case "highest-rated":
          return b.freelancer.rating - a.freelancer.rating
        case "fastest-delivery":
          return a.deliveryTime - b.deliveryTime
        default: // newest
          return new Date(b.submittedTime) - new Date(a.submittedTime)
      }
    })

  const handleAcceptBid = (bidId) => {
    toast({
      title: "Proposal accepted!",
      description: "The freelancer has been notified and the project will begin soon.",
    })
  }

  const handleRejectBid = (bidId) => {
    toast({
      title: "Proposal declined",
      description: "The freelancer has been notified.",
    })
  }

  const BidCard = ({ bid }) => (
    <Card className={`hover:shadow-lg transition-shadow ${bid.featured ? "ring-2 ring-blue-200" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={bid.freelancer.avatar || "/placeholder.svg"} />
              <AvatarFallback>{bid.freelancer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{bid.freelancer.name}</h3>
                {bid.featured && <Badge className="bg-yellow-100 text-yellow-800">Top Rated</Badge>}
              </div>
              <p className="text-sm text-gray-600 mb-1">{bid.freelancer.title}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{bid.freelancer.rating}</span>
                  <span>({bid.freelancer.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{bid.freelancer.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">${bid.bidAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">in {bid.deliveryTime} days</p>
          </div>
        </div>

        {/* Freelancer Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{bid.freelancer.completedJobs}</p>
            <p className="text-xs text-gray-600">Jobs Done</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{bid.freelancer.successRate}</p>
            <p className="text-xs text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{bid.freelancer.responseTime}</p>
            <p className="text-xs text-gray-600">Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{bid.freelancer.memberSince}</p>
            <p className="text-xs text-gray-600">Member Since</p>
          </div>
        </div>

        {/* Cover Letter Preview */}
        <div className="mb-4">
          <p className="text-gray-700 line-clamp-3">{bid.coverLetter}</p>
        </div>

        {/* Milestones */}
        {bid.milestones.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Proposed Milestones:</p>
            <div className="space-y-1">
              {bid.milestones.slice(0, 2).map((milestone, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{milestone.title}</span>
                  <span className="font-medium">${milestone.amount}</span>
                </div>
              ))}
              {bid.milestones.length > 2 && (
                <p className="text-sm text-blue-600">+{bid.milestones.length - 2} more milestones</p>
              )}
            </div>
          </div>
        )}

        {/* Attachments */}
        {bid.attachments.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {bid.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                >
                  <FileText className="h-3 w-3" />
                  <span>{attachment.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Submitted {bid.submittedTime}</span>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedBid(bid)}>
                  <Eye className="mr-1 h-3 w-3" />
                  View Details
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-1 h-3 w-3" />
              Message
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleRejectBid(bid.id)}>
              <ThumbsDown className="mr-1 h-3 w-3" />
              Decline
            </Button>
            <Button size="sm" onClick={() => handleAcceptBid(bid.id)}>
              <ThumbsUp className="mr-1 h-3 w-3" />
              Accept
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/jobs/${job.id}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposals for: {job.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>{job.totalBids} proposals received</span>
            <span>•</span>
            <span>Budget: {job.budget}</span>
            <span>•</span>
            <span>Posted {job.postedTime}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="lowest-bid">Lowest Bid</SelectItem>
                      <SelectItem value="highest-bid">Highest Bid</SelectItem>
                      <SelectItem value="highest-rated">Highest Rated</SelectItem>
                      <SelectItem value="fastest-delivery">Fastest Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by</label>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Proposals</SelectItem>
                      <SelectItem value="featured">Top Rated Only</SelectItem>
                      <SelectItem value="top-rated">4.8+ Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Stats */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Bid:</span>
                      <span className="font-medium">$3,925</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Bid:</span>
                      <span className="font-medium">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest Bid:</span>
                      <span className="font-medium">$4,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Delivery:</span>
                      <span className="font-medium">55 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals List */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Proposals ({bids.length})</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted (0)</TabsTrigger>
                <TabsTrigger value="interviewed">Interviewed (0)</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {filteredAndSortedBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))}
              </TabsContent>

              <TabsContent value="shortlisted">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No shortlisted proposals</h3>
                    <p className="text-gray-600">Shortlist your favorite proposals to review them later</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interviewed">
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
                    <p className="text-gray-600">Schedule interviews with promising candidates</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bid Details Modal */}
        {selectedBid && (
          <Dialog open={!!selectedBid} onOpenChange={() => setSelectedBid(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Proposal Details - {selectedBid.freelancer.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Freelancer Header */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedBid.freelancer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xl">{selectedBid.freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedBid.freelancer.name}</h3>
                      {selectedBid.featured && <Badge className="bg-yellow-100 text-yellow-800">Top Rated</Badge>}
                    </div>
                    <p className="text-gray-600 mb-2">{selectedBid.freelancer.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>
                          {selectedBid.freelancer.rating} ({selectedBid.freelancer.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedBid.freelancer.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">${selectedBid.bidAmount.toLocaleString()}</p>
                    <p className="text-gray-600">in {selectedBid.deliveryTime} days</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{selectedBid.freelancer.completedJobs}</p>
                    <p className="text-sm text-gray-600">Jobs Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{selectedBid.freelancer.successRate}</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{selectedBid.freelancer.responseTime}</p>
                    <p className="text-sm text-gray-600">Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{selectedBid.freelancer.memberSince}</p>
                    <p className="text-sm text-gray-600">Member Since</p>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cover Letter</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{selectedBid.coverLetter}</p>
                  </div>
                </div>

                {/* Milestones */}
                {selectedBid.milestones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Project Milestones</h4>
                    <div className="space-y-3">
                      {selectedBid.milestones.map((milestone, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">${milestone.amount}</p>
                              <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-right pt-2 border-t">
                        <p className="font-semibold">
                          Total: ${selectedBid.milestones.reduce((sum, m) => sum + m.amount, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {selectedBid.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {selectedBid.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-600">{attachment.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleAcceptBid(selectedBid.id)
                      setSelectedBid(null)
                    }}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Accept Proposal
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleRejectBid(selectedBid.id)
                      setSelectedBid(null)
                    }}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
