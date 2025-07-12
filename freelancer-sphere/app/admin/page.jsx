"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock admin data
  const stats = {
    totalUsers: 12450,
    activeJobs: 1250,
    totalRevenue: 485000,
    monthlyGrowth: 15.2,
    newUsersThisMonth: 890,
    completedProjects: 8750,
    pendingReports: 23,
    platformFee: 48500,
  }

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "freelancer",
      status: "active",
      joinDate: "2023-06-15",
      totalEarned: 15000,
      completedJobs: 28,
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "client",
      status: "active",
      joinDate: "2023-08-22",
      totalSpent: 25000,
      postedJobs: 12,
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@startup.com",
      role: "client",
      status: "suspended",
      joinDate: "2023-05-10",
      totalSpent: 8000,
      postedJobs: 5,
      rating: 3.2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@design.com",
      role: "freelancer",
      status: "active",
      joinDate: "2023-09-05",
      totalEarned: 22000,
      completedJobs: 45,
      rating: 4.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer for E-commerce Platform",
      client: "TechCorp Solutions",
      budget: 5000,
      status: "active",
      proposals: 12,
      postedDate: "2024-01-15",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "FitLife Startup",
      budget: 2500,
      status: "completed",
      proposals: 8,
      postedDate: "2024-01-10",
      category: "Design",
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      client: "Digital Insights",
      budget: 800,
      status: "flagged",
      proposals: 15,
      postedDate: "2024-01-08",
      category: "Writing",
    },
  ]

  const reports = [
    {
      id: 1,
      type: "user",
      reporter: "John Doe",
      reported: "Mike Chen",
      reason: "Unprofessional behavior",
      status: "pending",
      date: "2024-01-18",
      severity: "medium",
    },
    {
      id: 2,
      type: "job",
      reporter: "Emma Wilson",
      reported: "Fake Job Posting",
      reason: "Suspicious job requirements",
      status: "resolved",
      date: "2024-01-16",
      severity: "high",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, jobs, and platform operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+{stats.newUsersThisMonth} this month</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-green-600">{stats.activeJobs.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-blue-600 mt-1">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    <span>{stats.completedProjects.toLocaleString()} completed</span>
                  </div>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+{stats.monthlyGrowth}% this month</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingReports}</p>
                  <div className="flex items-center text-sm text-orange-600 mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>Requires attention</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="freelancer">Freelancers</SelectItem>
                      <SelectItem value="client">Clients</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>Joined: {user.joinDate}</span>
                          <span>Rating: {user.rating}⭐</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {user.role === "freelancer" ? (
                            <>
                              Earned: ${user.totalEarned?.toLocaleString()} • {user.completedJobs} jobs
                            </>
                          ) : (
                            <>
                              Spent: ${user.totalSpent?.toLocaleString()} • {user.postedJobs} jobs
                            </>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.client}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{job.category}</Badge>
                          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-green-600">${job.budget.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{job.proposals} proposals</p>
                        <p className="text-sm text-gray-500">Posted: {job.postedDate}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {report.type === "user" ? "User Report" : "Job Report"}
                          </h3>
                          <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Reporter: {report.reporter} • Reported: {report.reported}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">{report.reason}</p>
                      </div>

                      <div className="text-right">
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{report.date}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Platform Fee (10%)</span>
                      <span className="font-semibold">${stats.platformFee.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Transactions</span>
                      <span className="font-semibold">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Growth</span>
                      <span className="font-semibold text-green-600">+{stats.monthlyGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="font-semibold">{(stats.totalUsers * 0.85).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">New This Month</span>
                      <span className="font-semibold">{stats.newUsersThisMonth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Retention Rate</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Placeholder for Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Charts and analytics visualization would go here</p>
                    <p className="text-sm text-gray-500">Integration with Chart.js or similar library</p>
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
