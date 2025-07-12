"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Search, Filter, Star, Clock, DollarSign, MapPin, Briefcase, Heart, BookmarkPlus } from "lucide-react"

export default function JobsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer for E-commerce Platform",
      description:
        "We are looking for an experienced full-stack developer to build a modern e-commerce platform from scratch. This project involves creating a responsive frontend with React.js and a robust backend with Node.js.",
      budget: "$3,000 - $5,000",
      budgetType: "Fixed Price",
      duration: "2-3 months",
      experienceLevel: "Intermediate",
      skills: ["React", "Node.js", "MongoDB", "Payment Integration", "E-commerce"],
      client: {
        name: "TechCorp Solutions",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviews: 23,
        location: "San Francisco, CA",
        verified: true,
      },
      postedTime: "2 hours ago",
      proposals: 12,
      category: "Web Development",
      featured: true,
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description:
        "Looking for a talented UI/UX designer to create beautiful and intuitive designs for our fitness mobile app. The app should have a modern, clean design that appeals to health-conscious users.",
      budget: "$1,500 - $2,500",
      budgetType: "Fixed Price",
      duration: "3-4 weeks",
      experienceLevel: "Expert",
      skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
      client: {
        name: "FitLife Startup",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviews: 15,
        location: "New York, NY",
        verified: true,
      },
      postedTime: "4 hours ago",
      proposals: 8,
      category: "Design",
      featured: false,
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      description:
        "We need a skilled content writer to create engaging blog posts about emerging technologies, software development trends, and industry insights. Must have experience in tech writing.",
      budget: "$500 - $800",
      budgetType: "Fixed Price",
      duration: "1-2 weeks",
      experienceLevel: "Intermediate",
      skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
      client: {
        name: "Digital Insights",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        reviews: 31,
        location: "Austin, TX",
        verified: false,
      },
      postedTime: "1 day ago",
      proposals: 15,
      category: "Writing",
      featured: false,
    },
    {
      id: 4,
      title: "Python Data Analysis & Visualization",
      description:
        "Seeking a data analyst to analyze sales data and create comprehensive visualizations and reports. Experience with pandas, matplotlib, and statistical analysis required.",
      budget: "$1,200 - $2,000",
      budgetType: "Fixed Price",
      duration: "2-3 weeks",
      experienceLevel: "Intermediate",
      skills: ["Python", "Data Analysis", "Pandas", "Matplotlib", "Statistics"],
      client: {
        name: "DataDriven Co.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
        reviews: 18,
        location: "Seattle, WA",
        verified: true,
      },
      postedTime: "2 days ago",
      proposals: 7,
      category: "Data Science",
      featured: false,
    },
    {
      id: 5,
      title: "WordPress Website Development",
      description:
        "Need a WordPress developer to create a professional business website with custom theme, contact forms, and SEO optimization. Must be responsive and fast-loading.",
      budget: "$800 - $1,500",
      budgetType: "Fixed Price",
      duration: "2-4 weeks",
      experienceLevel: "Entry Level",
      skills: ["WordPress", "PHP", "CSS", "JavaScript", "SEO"],
      client: {
        name: "Local Business Hub",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
        reviews: 12,
        location: "Chicago, IL",
        verified: false,
      },
      postedTime: "3 days ago",
      proposals: 22,
      category: "Web Development",
      featured: false,
    },
    {
      id: 6,
      title: "Social Media Marketing Campaign",
      description:
        "Looking for a social media expert to create and manage marketing campaigns across Instagram, Facebook, and Twitter. Must have experience with content creation and analytics.",
      budget: "$25 - $40",
      budgetType: "Hourly",
      duration: "1-3 months",
      experienceLevel: "Intermediate",
      skills: ["Social Media Marketing", "Content Creation", "Analytics", "Instagram", "Facebook"],
      client: {
        name: "Brand Boost Agency",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviews: 27,
        location: "Los Angeles, CA",
        verified: true,
      },
      postedTime: "5 days ago",
      proposals: 18,
      category: "Marketing",
      featured: true,
    },
  ]

  const categories = [
    "All Categories",
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing",
    "Data Science",
    "Marketing",
    "Translation",
  ]

  const budgetRanges = [
    "All Budgets",
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "Over $10,000",
  ]

  const experienceLevels = ["All Levels", "Entry Level", "Intermediate", "Expert"]

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || job.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesExperience =
      selectedExperience === "all" || job.experienceLevel.toLowerCase() === selectedExperience.toLowerCase()

    return matchesSearch && matchesCategory && matchesExperience
  })

  const JobCard = ({ job }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">{job.title}</h3>
              </Link>
              {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
            </div>
            <p className="text-gray-600 line-clamp-3 mb-3">{job.description}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{job.budget}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span>{job.proposals} proposals</span>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
              <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900">{job.client.name}</p>
                {job.client.verified && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{job.client.rating}</span>
                  <span>({job.client.reviews} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{job.client.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">Posted {job.postedTime}</p>
            {user?.role === "freelancer" && (
              <Link href={`/jobs/${job.id}/apply`}>
                <Button size="sm">Apply Now</Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Project</h1>
          <p className="text-gray-600">Discover amazing opportunities from clients worldwide</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for jobs, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex space-x-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === "All Categories" ? "all" : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level === "All Levels" ? "all" : level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Budget Range</h4>
                    <div className="space-y-2">
                      {budgetRanges.map((range) => (
                        <label key={range} className="flex items-center space-x-2">
                          <Checkbox />
                          <span className="text-sm">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Job Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Fixed Price</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Hourly</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Client History</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Payment Verified</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">5+ Reviews</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Previous Hires</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} jobs found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="budget-high">Highest Budget</SelectItem>
              <SelectItem value="budget-low">Lowest Budget</SelectItem>
              <SelectItem value="proposals">Fewest Proposals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedExperience("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
