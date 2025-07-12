"use client"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { DollarSign, Briefcase, Star, MessageSquare, Eye, Calendar, Award, Target, User } from "lucide-react"

export default function FreelancerDashboard() {
  const { user } = useAuth()

  // Mock data
  const stats = {
    totalEarnings: 12450,
    activeProjects: 3,
    completedProjects: 28,
    rating: 4.8,
    profileViews: 156,
    responseRate: 95,
  }

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechCorp Solutions",
      status: "In Progress",
      budget: 3500,
      deadline: "2024-02-15",
      progress: 65,
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      status: "Review",
      budget: 2200,
      deadline: "2024-02-10",
      progress: 90,
    },
    {
      id: 3,
      title: "Content Writing Project",
      client: "Digital Marketing Co",
      status: "Completed",
      budget: 800,
      deadline: "2024-01-30",
      progress: 100,
    },
  ]

  const recentBids = [
    {
      id: 1,
      jobTitle: "React Developer for SaaS Platform",
      bidAmount: 4500,
      status: "Pending",
      submittedDate: "2024-01-28",
    },
    {
      id: 2,
      jobTitle: "WordPress Website Redesign",
      bidAmount: 1800,
      status: "Shortlisted",
      submittedDate: "2024-01-26",
    },
    {
      id: 3,
      jobTitle: "Python Data Analysis",
      bidAmount: 2200,
      status: "Rejected",
      submittedDate: "2024-01-24",
    },
  ]

  const upcomingDeadlines = [
    {
      project: "E-commerce Website",
      deadline: "Feb 15, 2024",
      daysLeft: 8,
    },
    {
      project: "Mobile App UI",
      deadline: "Feb 10, 2024",
      daysLeft: 3,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Review":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      case "Shortlisted":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your freelance work</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                    <Star className="h-5 w-5 text-yellow-500 ml-1" />
                  </div>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.profileViews}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Link href="/projects">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.client}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />${project.budget}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {project.deadline}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bids */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Proposals</CardTitle>
                <Link href="/bids">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBids.map((bid) => (
                    <div key={bid.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{bid.jobTitle}</h3>
                        <Badge className={getStatusColor(bid.status)}>{bid.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />${bid.bidAmount}
                        </span>
                        <span>Submitted {bid.submittedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/jobs">
                  <Button className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Find New Jobs
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.project}</p>
                        <p className="text-sm text-gray-600">{item.deadline}</p>
                      </div>
                      <Badge variant={item.daysLeft <= 3 ? "destructive" : "secondary"}>{item.daysLeft} days</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold">{stats.responseRate}%</span>
                </div>
                <Progress value={stats.responseRate} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Projects</span>
                  <span className="font-semibold">{stats.completedProjects}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Client Rating</span>
                  <div className="flex items-center">
                    <span className="font-semibold">{stats.rating}</span>
                    <Star className="h-4 w-4 text-yellow-500 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New message from TechCorp</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Project milestone completed</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Proposal shortlisted</p>
                      <p className="text-xs text-gray-600">2 days ago</p>
                    </div>
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
