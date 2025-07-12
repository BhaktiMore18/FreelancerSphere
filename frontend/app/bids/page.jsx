"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Clock, Star, MessageSquare, Eye, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function BidsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("active")
  const [sortBy, setSortBy] = useState("newest")

  // Mock bids data
  const bids = [
    {
      id: 1,
      job: {
        id: 1,
        title: "Full Stack Developer for E-commerce Platform",
        client: "TechCorp Solutions",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        budget: "$3,000 - $5,000",
      },
      bidAmount: 4200,
      deliveryTime: 45,
      status: "pending",
      submittedTime: "2 hours ago",
      clientViewed: true,
      clientRating: 4.8,
      responses: 0,
    },
    {
      id: 2,
      job: {
        id: 2,
        title: "Mobile App UI/UX Design",
        client: "FitLife Startup",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        budget: "$1,500 - $2,500",
      },
      bidAmount: 2000,
      deliveryTime: 21,
      status: "accepted",
      submittedTime: "1 day ago",
      clientViewed: true,
      clientRating: 4.9,
      responses: 3,
      acceptedTime: "6 hours ago",
    },
    {
      id: 3,
      job: {
        id: 3,
        title: "Content Writer for Tech Blog",
        client: "Digital Insights",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        budget: "$500 - $800",
      },
      bidAmount: 650,
      deliveryTime: 14,
      status: "rejected",
      submittedTime: "3 days ago",
      clientViewed: true,
      clientRating: 4.7,
      responses: 1,
      rejectedTime: "2 days ago",
    },
    {
      id: 4,
      job: {
        id: 4,
        title: "Python Data Analysis & Visualization",
        client: "DataDriven Co.",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        budget: "$1,200 - $2,000",
      },
      bidAmount: 1500,
      deliveryTime: 18,
      status: "pending",
      submittedTime: "5 days ago",
      clientViewed: false,
      clientRating: 4.6,
      responses: 0,
    },
    {
      id: 5,
      job: {
        id: 5,
        title: "WordPress Website Development",
        client: "Local Business Hub",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        budget: "$800 - $1,500",
      },
      bidAmount: 1200,
      deliveryTime: 28,
      status: "completed",
      submittedTime: "2 weeks ago",
      clientViewed: true,
      clientRating: 4.5,
      responses: 5,
      completedTime: "3 days ago",
      projectRating: 5.0,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredBids = bids.filter((bid) => {
    switch (activeTab) {
      case "active":
        return bid.status === "pending" || bid.status === "accepted"
      case "pending":
        return bid.status === "pending"
      case "accepted":
        return bid.status === "accepted"
      case "completed":
        return bid.status === "completed"
      case "rejected":
        return bid.status === "rejected"
      default:
        return true
    }
  })

  const sortedBids = filteredBids.sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.submittedTime) - new Date(b.submittedTime)
      case "highest-bid":
        return b.bidAmount - a.bidAmount
      case "lowest-bid":
        return a.bidAmount - b.bidAmount
      default: // newest
        return new Date(b.submittedTime) - new Date(a.submittedTime)
    }
  })

  const stats = {
    total: bids.length,
    pending: bids.filter((b) => b.status === "pending").length,
    accepted: bids.filter((b) => b.status === "accepted").length,
    completed: bids.filter((b) => b.status === "completed").length,
    rejected: bids.filter((b) => b.status === "rejected").length,
    totalEarnings: bids.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.bidAmount, 0),
    averageBid: Math.round(bids.reduce((sum, b) => sum + b.bidAmount, 0) / bids.length),
  }

  const BidCard = ({ bid }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Link href={`/jobs/${bid.job.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">{bid.job.title}</h3>
              </Link>
              <Badge className={getStatusColor(bid.status)}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(bid.status)}
                  <span className="capitalize">{bid.status}</span>
                </div>
              </Badge>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={bid.job.clientAvatar || "/placeholder.svg"} />
                <AvatarFallback>{bid.job.client.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{bid.job.client}</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-sm text-gray-600">{bid.clientRating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-green-600">${bid.bidAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{bid.deliveryTime} days</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-600">Client Budget</p>
            <p className="font-medium">{bid.job.budget}</p>
          </div>
          <div>
            <p className="text-gray-600">Submitted</p>
            <p className="font-medium">{bid.submittedTime}</p>
          </div>
          <div>
            <p className="text-gray-600">Client Viewed</p>
            <p className="font-medium">{bid.clientViewed ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-gray-600">Messages</p>
            <p className="font-medium">{bid.responses}</p>
          </div>
        </div>

        {/* Status-specific information */}
        {bid.status === "accepted" && (
          <div className="p-3 bg-green-50 rounded-lg mb-4">
            <p className="text-sm text-green-800">🎉 Congratulations! Your proposal was accepted {bid.acceptedTime}.</p>
          </div>
        )}

        {bid.status === "rejected" && (
          <div className="p-3 bg-red-50 rounded-lg mb-4">
            <p className="text-sm text-red-800">
              Your proposal was not selected {bid.rejectedTime}. Keep improving and try again!
            </p>
          </div>
        )}

        {bid.status === "completed" && (
          <div className="p-3 bg-blue-50 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">Project completed {bid.completedTime}</p>
              {bid.projectRating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{bid.projectRating}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!bid.clientViewed && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Not viewed yet
              </Badge>
            )}
          </div>

          <div className="flex space-x-2">
            <Link href={`/jobs/${bid.job.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="mr-1 h-3 w-3" />
                View Job
              </Button>
            </Link>
            {bid.responses > 0 && (
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-1 h-3 w-3" />
                Messages ({bid.responses})
              </Button>
            )}
            {bid.status === "accepted" && (
              <Link href={`/projects/${bid.id}`}>
                <Button size="sm">Go to Project</Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Proposals</h1>
          <p className="text-gray-600">Track all your job proposals and their status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Bids</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              <p className="text-sm text-gray-600">Accepted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">${stats.averageBid}</p>
              <p className="text-sm text-gray-600">Avg. Bid</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest-bid">Highest Bid</SelectItem>
                        <SelectItem value="lowest-bid">Lowest Bid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Link href="/jobs">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Browse New Jobs
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Star className="mr-2 h-4 w-4" />
                          Improve Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals List */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="active">Active ({stats.pending + stats.accepted})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="accepted">Accepted ({stats.accepted})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {sortedBids.length > 0 ? (
                  sortedBids.map((bid) => <BidCard key={bid.id} bid={bid} />)
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
                      <p className="text-gray-600 mb-4">
                        {activeTab === "pending" && "You don't have any pending proposals."}
                        {activeTab === "accepted" && "You don't have any accepted proposals."}
                        {activeTab === "completed" && "You haven't completed any projects yet."}
                        {activeTab === "rejected" && "You don't have any rejected proposals."}
                        {activeTab === "active" && "You don't have any active proposals."}
                      </p>
                      <Link href="/jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
