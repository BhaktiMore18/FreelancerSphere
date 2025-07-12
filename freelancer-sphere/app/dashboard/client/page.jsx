"use client"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { DollarSign, Briefcase, Users, MessageSquare, Plus, Calendar, Award, Target, FileText } from "lucide-react"

export default function ClientDashboard() {
  const { user } = useAuth()

  // Mock data
  const stats = {
    totalSpent: 28750,
    activeProjects: 5,
    completedProjects: 12,
    totalFreelancers: 18,
    avgProjectRating: 4.7,
    responseRate: 92,
  }

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: "Sarah Johnson",
      freelancerAvatar: "/placeholder.svg?height=40&width=40",
      status: "In Progress",
      budget: 3500,
      deadline: "2024-02-15",
      progress: 65,
      proposals: 12,
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      freelancer: "Mike Chen",
      freelancerAvatar: "/placeholder.svg?height=40&width=40",
      status: "Review",
      budget: 2200,
      deadline: "2024-02-10",
      progress: 90,
      proposals: 8,
    },
    {
      id: 3,
      title: "Content Writing Project",
      freelancer: "Emily Rodriguez",
      freelancerAvatar: "/placeholder.svg?height=40&width=40",
      status: "Completed",
      budget: 800,
      deadline: "2024-01-30",
      progress: 100,
      proposals: 15,
    },
  ]

  const recentJobs = [
    {
      id: 1,
      title: "React Developer for SaaS Platform",
      status: "Open",
      proposals: 23,
      budget: "$4,000 - $6,000",
      postedDate: "2024-01-28",
    },
    {
      id: 2,
      title: "WordPress Website Redesign",
      status: "In Progress",
      proposals: 18,
      budget: "$1,500 - $2,500",
      postedDate: "2024-01-26",
    },
    {
      id: 3,
      title: "Python Data Analysis",
      status: "Completed",
      proposals: 12,
      budget: "$2,000 - $3,000",
      postedDate: "2024-01-20",
    },
  ]

  const topFreelancers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Full Stack Developer",
      rating: 4.9,
      projectsCompleted: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mike Chen",
      title: "UI/UX Designer",
      rating: 4.8,
      projectsCompleted: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Content Writer",
      rating: 4.9,
      projectsCompleted: 4,
      avatar: "/placeholder.svg?height=40&width=40",
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
      case "Open":
        return "bg-purple-100 text-purple-800"
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
          <p className="text-gray-600 mt-2">Manage your projects and find the best talent</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">Freelancers Hired</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFreelancers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgProjectRating}</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Projects</CardTitle>
                <Link href="/projects">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={project.freelancerAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{project.freelancer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-gray-600">{project.freelancer}</p>
                          </div>
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

            {/* Recent Job Posts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Job Posts</CardTitle>
                <Link href="/post-job">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.budget}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.proposals} proposals
                          </span>
                        </div>
                        <span>Posted {job.postedDate}</span>
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
                <Link href="/post-job">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Target className="mr-2 h-4 w-4" />
                    Browse Freelancers
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
                <Link href="/payments">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Invoices
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Top Freelancers */}
            <Card>
              <CardHeader>
                <CardTitle>Your Top Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFreelancers.map((freelancer) => (
                    <div key={freelancer.id} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{freelancer.name}</p>
                        <p className="text-sm text-gray-600">{freelancer.title}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="flex items-center mr-3">⭐ {freelancer.rating}</span>
                          <span>{freelancer.projectsCompleted} projects</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      <p className="text-sm font-medium">New proposal received</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Project milestone approved</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Payment processed</p>
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
