"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Plus, X, ExternalLink, Github, Linkedin, Globe, Upload, Eye, Edit, Save, Star } from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Experienced full-stack developer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about creating scalable web applications and delivering high-quality solutions.",
    title: "Full Stack Developer",
    hourlyRate: 45,
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "JavaScript", "Python", "AWS", "MongoDB", "TypeScript", "GraphQL"],
    languages: ["English (Native)", "Spanish (Conversational)"],
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
    portfolio: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution built with React and Node.js",
        image: "/placeholder.svg?height=200&width=300",
        link: "https://example-ecommerce.com",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Real-time collaborative task management application",
        image: "/placeholder.svg?height=200&width=300",
        link: "https://example-tasks.com",
        technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      },
    ],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  const availableSkills = [
    "JavaScript",
    "Python",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "PHP",
    "Laravel",
    "Ruby",
    "Rails",
    "Java",
    "Spring",
    "C#",
    ".NET",
    "Go",
    "Rust",
    "TypeScript",
    "GraphQL",
    "REST API",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "Testing",
    "Agile",
  ]

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfile(profileData)
      setMessage("Profile updated successfully!")
      setIsEditing(false)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addLanguage = () => {
    if (newLanguage && !profileData.languages.includes(newLanguage)) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (languageToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-2">Manage your professional profile and portfolio</p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </div>

        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Picture & Basic Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button size="sm" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
                    <p className="text-gray-600 mb-2">{profileData.title}</p>
                    <p className="text-sm text-gray-500 mb-4">{profileData.location}</p>

                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-600">(127 reviews)</span>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">${profileData.hourlyRate}/hr</p>
                      <p className="text-sm text-gray-600">Hourly Rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={profileData.title}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, title: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) =>
                          setProfileData((prev) => ({ ...prev, hourlyRate: Number.parseInt(e.target.value) }))
                        }
                        disabled={!isEditing}
                        className="max-w-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="Tell clients about yourself, your experience, and what makes you unique..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </div>
                        <Input
                          id="linkedin"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, linkedin: e.target.value }))}
                          disabled={!isEditing}
                          className="rounded-l-none"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                          <Github className="h-4 w-4" />
                        </div>
                        <Input
                          id="github"
                          value={profileData.github}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, github: e.target.value }))}
                          disabled={!isEditing}
                          className="rounded-l-none"
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                          <Globe className="h-4 w-4" />
                        </div>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                          className="rounded-l-none"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-gray-500 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2">
                        <Select value={newSkill} onValueChange={setNewSkill}>
                          <SelectTrigger className="max-w-xs">
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSkills
                              .filter((skill) => !profileData.skills.includes(skill))
                              .map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={addSkill} disabled={!newSkill}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-sm">
                          {language}
                          {isEditing && (
                            <button
                              onClick={() => removeLanguage(language)}
                              className="ml-2 text-gray-500 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="e.g., Spanish (Fluent)"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          className="max-w-xs"
                        />
                        <Button onClick={addLanguage} disabled={!newLanguage}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Portfolio</CardTitle>
                {isEditing && (
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {profileData.portfolio.map((project) => (
                    <div key={project.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Project
                          </a>
                          {isEditing && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {profileData.portfolio.length === 0 && (
                  <div className="text-center py-12">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
                    <p className="text-gray-600 mb-4">Showcase your best work to attract more clients</p>
                    {isEditing && (
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Project
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
