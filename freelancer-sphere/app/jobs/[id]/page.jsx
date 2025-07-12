"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Clock, DollarSign, Star, Users, Briefcase, Heart, BookmarkPlus, Share2, Flag, ArrowLeft } from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock job data - in real app, this would be fetched based on params.id
  const job = {
    id: params.id,
    title: "Full Stack Developer for E-commerce Platform",
    description: `We are looking for an experienced full-stack developer to build a modern e-commerce platform from scratch. This is a comprehensive project that will involve:

**Frontend Requirements:**
- Modern, responsive design using React.js
- Shopping cart functionality
- User authentication and profiles
- Product search and filtering
- Payment integration (Stripe/PayPal)
- Order tracking system

**Backend Requirements:**
- RESTful API development with Node.js
- Database design and implementation (MongoDB preferred)
- User authentication and authorization
- Payment processing integration
- Admin dashboard for inventory management
- Email notifications system

**Additional Features:**
- SEO optimization
- Performance optimization
- Mobile-first responsive design
- Integration with third-party services
- Comprehensive testing

The ideal candidate should have:
- 3+ years of experience with React and Node.js
- Experience with e-commerce platforms
- Knowledge of payment gateway integrations
- Strong understanding of database design
- Experience with cloud deployment (AWS/Heroku)
- Good communication skills and ability to work independently

This is a great opportunity to work on a challenging project with a growing startup. We value quality code, attention to detail, and timely delivery.`,
    client: {
      name: "TechCorp Solutions",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 23,
      location: "San Francisco, CA",
      memberSince: "2022",
      totalSpent: "$45,000+",
      jobsPosted: 12,
      hireRate: "85%",
    },
    budget: "$3,000 - $5,000",
    budgetType: "Fixed Price",
    duration: "2-3 months",
    experienceLevel: "Intermediate",
    skills: ["React", "Node.js", "MongoDB", "Payment Integration", "E-commerce", "JavaScript", "API Development"],
    postedTime: "2 hours ago",
    proposals: 12,
    category: "Web Development",
    featured: true,
    status: "Open",
    attachments: [
      {
        name: "Project Requirements.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
      {
        name: "Design Mockups.zip",
        size: "15.8 MB",
        type: "zip",
      },
    ],
  }

  const similarJobs = [
    {
      id: 2,
      title: "React Developer for SaaS Platform",
      budget: "$2,500 - $4,000",
      proposals: 8,
      postedTime: "1 day ago",
    },
    {
      id: 3,
      title: "E-commerce Website with WordPress",
      budget: "$1,500 - $2,500",
      proposals: 15,
      postedTime: "3 days ago",
    },
    {
      id: 4,
      title: "Full Stack Developer - Fintech App",
      budget: "$4,000 - $7,000",
      proposals: 6,
      postedTime: "5 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/jobs">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span>Posted {job.postedTime}</span>
                      <span>•</span>
                      <span>{job.proposals} proposals</span>
                      <span>•</span>
                      <span>{job.category}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={isBookmarked ? "text-blue-600" : ""}
                    >
                      <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold">{job.budget}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{job.duration}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-semibold">{job.experienceLevel}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Proposals</p>
                    <p className="font-semibold">{job.proposals}</p>
                  </div>
                </div>

                {/* Apply Button */}
                {user?.role === "freelancer" && (
                  <Link href={`/jobs/${job.id}/apply`}>
                    <Button size="lg" className="w-full md:w-auto">
                      Apply for this Job
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700">{job.description}</div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            {job.attachments && job.attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {job.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">{attachment.type.toUpperCase()}</span>
                          </div>
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
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.client.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {job.client.rating} ({job.client.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{job.client.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">{job.client.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total spent</span>
                    <span className="font-medium">{job.client.totalSpent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Jobs posted</span>
                    <span className="font-medium">{job.client.jobsPosted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hire rate</span>
                    <span className="font-medium">{job.client.hireRate}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button variant="outline" className="w-full bg-transparent">
                  View Client Profile
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="border rounded-lg p-3">
                      <Link href={`/jobs/${similarJob.id}`}>
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                          {similarJob.title}
                        </h4>
                      </Link>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{similarJob.budget}</span>
                        <span>{similarJob.proposals} proposals</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{similarJob.postedTime}</p>
                    </div>
                  ))}
                </div>
                <Link href="/jobs">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View More Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.role === "freelancer" && (
                  <>
                    <Link href={`/jobs/${job.id}/apply`}>
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent">
                      Save Job
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Ask a Question
                    </Button>
                  </>
                )}
                {user?.role === "client" && (
                  <>
                    <Link href={`/jobs/${job.id}/bids`}>
                      <Button className="w-full">View Proposals</Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent">
                      Edit Job
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Close Job
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
