"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Star, ThumbsUp, MessageSquare, Calendar, Award, TrendingUp } from "lucide-react"

export default function ReviewsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedReview, setSelectedReview] = useState(null)
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    project: "",
  })

  // Mock reviews data
  const stats = {
    averageRating: 4.8,
    totalReviews: 24,
    fiveStars: 18,
    fourStars: 4,
    threeStars: 2,
    twoStars: 0,
    oneStars: 0,
  }

  const receivedReviews = [
    {
      id: 1,
      client: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "TechCorp Solutions",
      },
      project: "E-commerce Website Development",
      rating: 5,
      comment:
        "Exceptional work! John delivered exactly what we needed on time and within budget. His attention to detail and communication throughout the project was outstanding. I would definitely hire him again for future projects.",
      date: "2024-01-15",
      helpful: 12,
      projectValue: 2500,
    },
    {
      id: 2,
      client: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "StartupHub",
      },
      project: "Mobile App Backend Development",
      rating: 5,
      comment:
        "Great technical skills and problem-solving abilities. John was able to optimize our API performance significantly and delivered clean, well-documented code. Highly recommended!",
      date: "2024-01-10",
      helpful: 8,
      projectValue: 1800,
    },
    {
      id: 3,
      client: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "DesignCo",
      },
      project: "Dashboard Development",
      rating: 4,
      comment:
        "Good work overall. The dashboard looks great and functions well. There were minor delays in delivery, but the quality of work made up for it. Would consider working together again.",
      date: "2024-01-05",
      helpful: 5,
      projectValue: 1200,
    },
    {
      id: 4,
      client: {
        name: "David Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "DataFlow Inc",
      },
      project: "API Integration",
      rating: 5,
      comment:
        "Fantastic developer! John integrated multiple APIs seamlessly and provided excellent documentation. His expertise in Node.js and database optimization is impressive.",
      date: "2023-12-28",
      helpful: 15,
      projectValue: 3200,
    },
  ]

  const givenReviews = [
    {
      id: 1,
      freelancer: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Full Stack Developer",
      },
      project: "API Development",
      rating: 5,
      comment: "Alex delivered excellent work on our API project. Very professional and responsive to feedback.",
      date: "2024-01-12",
      projectValue: 1500,
    },
    {
      id: 2,
      freelancer: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Content Writer",
      },
      project: "Blog Content Creation",
      rating: 4,
      comment: "Good quality content, delivered on time. Would work with Maria again.",
      date: "2024-01-08",
      projectValue: 600,
    },
  ]

  const pendingReviews = [
    {
      id: 1,
      project: "WordPress Website",
      freelancer: "Lisa Thompson",
      completedDate: "2024-01-18",
      projectValue: 900,
    },
    {
      id: 2,
      project: "Logo Design",
      freelancer: "James Wilson",
      completedDate: "2024-01-16",
      projectValue: 400,
    },
  ]

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const submitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      toast({
        title: "Error",
        description: "Please provide a rating and comment.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review submitted!",
      description: "Your review has been posted successfully.",
    })

    setNewReview({ rating: 0, comment: "", project: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage your reviews and build your reputation</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <span className="text-3xl font-bold text-gray-900">{stats.averageRating}</span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">{stats.totalReviews}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">{stats.fiveStars}</p>
              <p className="text-sm text-gray-600">5-Star Reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center text-green-600 mb-2">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">98%</span>
              </div>
              <p className="text-sm text-gray-600">Positive Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats[`${["", "one", "two", "three", "four", "five"][rating]}Stars`]
                const percentage = (count / stats.totalReviews) * 100

                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Tabs */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="received">Reviews Received ({receivedReviews.length})</TabsTrigger>
            <TabsTrigger value="given">Reviews Given ({givenReviews.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Reviews ({pendingReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-6">
            {receivedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.client.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.client.name}</h3>
                        <p className="text-sm text-gray-600">{review.client.company}</p>
                        <p className="text-sm text-blue-600">{review.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(review.rating)}
                      <p className="text-sm text-gray-600 mt-1">{review.date}</p>
                      <Badge variant="outline" className="mt-1">
                        ${review.projectValue.toLocaleString()}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                    <Button variant="outline" size="sm">
                      Share Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="given" className="space-y-6">
            {givenReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.freelancer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.freelancer.name}</h3>
                        <p className="text-sm text-gray-600">{review.freelancer.title}</p>
                        <p className="text-sm text-blue-600">{review.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(review.rating)}
                      <p className="text-sm text-gray-600 mt-1">{review.date}</p>
                      <Badge variant="outline" className="mt-1">
                        ${review.projectValue.toLocaleString()}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Edit Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {pendingReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.project}</h3>
                      <p className="text-sm text-gray-600">
                        {user?.role === "freelancer" ? "Client" : "Freelancer"}: {review.freelancer}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>Completed on {review.completedDate}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      ${review.projectValue.toLocaleString()}
                    </Badge>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Leave Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          {renderStars(newReview.rating, true, (rating) =>
                            setNewReview((prev) => ({ ...prev, rating })),
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Your Review</label>
                          <Textarea
                            placeholder="Share your experience working on this project..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                            rows={4}
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button onClick={submitReview} className="flex-1">
                            Submit Review
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}

            {pendingReviews.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reviews</h3>
                  <p className="text-gray-600">Complete more projects to receive and give reviews</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
