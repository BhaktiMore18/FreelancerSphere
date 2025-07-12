"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info, Circle, CheckCheck, Clock } from "lucide-react"

export default function ChatPage() {
  const { user } = useAuth()
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef(null)

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great work on the latest milestone! Looking forward to the next phase.",
      timestamp: "2 min ago",
      unreadCount: 2,
      online: true,
      project: "E-commerce Website Development",
      role: "client",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we schedule a call to discuss the project requirements?",
      timestamp: "1 hour ago",
      unreadCount: 0,
      online: false,
      project: "Mobile App Backend",
      role: "client",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The design looks perfect! Please proceed with development.",
      timestamp: "3 hours ago",
      unreadCount: 1,
      online: true,
      project: "Dashboard UI Design",
      role: "client",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've submitted the proposal. Please review when you have time.",
      timestamp: "1 day ago",
      unreadCount: 0,
      online: false,
      project: "API Integration",
      role: "freelancer",
    },
  ])

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        senderName: "Sarah Johnson",
        content: "Hi! I've reviewed your proposal and I'm impressed with your portfolio.",
        timestamp: "10:30 AM",
        status: "read",
      },
      {
        id: 2,
        senderId: "me",
        senderName: user?.name,
        content: "Thank you! I'm excited to work on your e-commerce project. When would you like to start?",
        timestamp: "10:32 AM",
        status: "read",
      },
      {
        id: 3,
        senderId: 1,
        senderName: "Sarah Johnson",
        content: "We can start immediately. I'll send you the detailed requirements document.",
        timestamp: "10:35 AM",
        status: "read",
      },
      {
        id: 4,
        senderId: 1,
        senderName: "Sarah Johnson",
        content: "Great work on the latest milestone! Looking forward to the next phase.",
        timestamp: "2 min ago",
        status: "delivered",
      },
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        senderName: "Mike Chen",
        content: "Hello! I saw your application for the mobile app project.",
        timestamp: "Yesterday 3:20 PM",
        status: "read",
      },
      {
        id: 2,
        senderId: "me",
        senderName: user?.name,
        content: "Hi Mike! Yes, I'm very interested in the project. I have extensive experience with React Native.",
        timestamp: "Yesterday 3:25 PM",
        status: "read",
      },
      {
        id: 3,
        senderId: 2,
        senderName: "Mike Chen",
        content: "Can we schedule a call to discuss the project requirements?",
        timestamp: "1 hour ago",
        status: "delivered",
      },
    ],
  })

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedChat])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      senderId: "me",
      senderName: user?.name,
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }))

    setMessage("")

    // Mock delivery status update
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedChat.id]: prev[selectedChat.id].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
        ),
      }))
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Chat List Sidebar */}
            <div className="w-1/3 border-r flex flex-col">
              {/* Header */}
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Chat List */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                        selectedChat?.id === chat.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900 truncate">{chat.name}</p>
                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{chat.project}</p>
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs">{chat.unreadCount}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedChat.online && (
                          <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-600">{selectedChat.project}</p>
                        <p className="text-xs text-gray-500">
                          {selectedChat.online ? "Online" : "Last seen 2 hours ago"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {(messages[selectedChat.id] || []).map((msg) => (
                        <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.senderId === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <div
                              className={`flex items-center justify-end space-x-1 mt-1 ${
                                msg.senderId === "me" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              <span className="text-xs">{msg.timestamp}</span>
                              {msg.senderId === "me" && getStatusIcon(msg.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="pr-12"
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!message.trim()}
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
