"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  CreditCard,
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  AlertTriangle,
  FileText,
  Send,
  Wallet,
} from "lucide-react"

export default function PaymentsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectedEscrow, setSelectedEscrow] = useState(null)

  // Mock payment data
  const stats = {
    totalEarned: 45000,
    totalSpent: 28750,
    pendingPayments: 3200,
    availableBalance: 8500,
    escrowBalance: 12500,
    thisMonth: {
      earned: 4200,
      spent: 2800,
      growth: 15,
    },
  }

  const transactions = [
    {
      id: 1,
      type: "received",
      amount: 2500,
      description: "Payment for E-commerce Website Development",
      client: "Sarah Johnson",
      project: "E-commerce Platform",
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "Bank Transfer",
      invoiceId: "INV-001",
      escrowId: "ESC-001",
    },
    {
      id: 2,
      type: "sent",
      amount: 1200,
      description: "Payment to Alex Rodriguez for API Integration",
      freelancer: "Alex Rodriguez",
      project: "API Integration",
      date: "2024-01-12",
      status: "completed",
      paymentMethod: "PayPal",
      invoiceId: "INV-002",
    },
    {
      id: 3,
      type: "escrow_deposit",
      amount: 1800,
      description: "Escrow deposit for Mobile App Design",
      client: "Mike Chen",
      project: "Mobile App UI/UX",
      date: "2024-01-10",
      status: "in_escrow",
      paymentMethod: "Stripe",
      escrowId: "ESC-003",
    },
    {
      id: 4,
      type: "escrow_release",
      amount: 3200,
      description: "Escrow release for Dashboard Development",
      client: "Emma Wilson",
      project: "Admin Dashboard",
      date: "2024-01-08",
      status: "pending_release",
      paymentMethod: "Bank Transfer",
      escrowId: "ESC-004",
    },
  ]

  const escrowAccounts = [
    {
      id: "ESC-001",
      project: "E-commerce Platform",
      client: "Sarah Johnson",
      freelancer: "John Doe",
      totalAmount: 4200,
      releasedAmount: 2500,
      remainingAmount: 1700,
      status: "active",
      milestones: [
        { id: 1, title: "Frontend Development", amount: 1500, status: "completed", releaseDate: "2024-01-15" },
        { id: 2, title: "Backend API", amount: 1000, status: "completed", releaseDate: "2024-01-15" },
        { id: 3, title: "Payment Integration", amount: 1000, status: "in_progress", dueDate: "2024-02-15" },
        { id: 4, title: "Testing & Deployment", amount: 700, status: "pending", dueDate: "2024-03-01" },
      ],
      createdDate: "2024-01-01",
      disputeStatus: null,
    },
    {
      id: "ESC-003",
      project: "Mobile App UI/UX",
      client: "Mike Chen",
      freelancer: "John Doe",
      totalAmount: 1800,
      releasedAmount: 0,
      remainingAmount: 1800,
      status: "active",
      milestones: [
        { id: 1, title: "Wireframes & Mockups", amount: 600, status: "in_progress", dueDate: "2024-02-01" },
        { id: 2, title: "UI Design", amount: 800, status: "pending", dueDate: "2024-02-15" },
        { id: 3, title: "Prototype", amount: 400, status: "pending", dueDate: "2024-02-28" },
      ],
      createdDate: "2024-01-10",
      disputeStatus: null,
    },
    {
      id: "ESC-004",
      project: "Admin Dashboard",
      client: "Emma Wilson",
      freelancer: "John Doe",
      totalAmount: 3200,
      releasedAmount: 0,
      remainingAmount: 3200,
      status: "dispute",
      milestones: [
        { id: 1, title: "Dashboard Design", amount: 1200, status: "completed", dueDate: "2024-01-20" },
        { id: 2, title: "Component Development", amount: 2000, status: "completed", dueDate: "2024-02-05" },
      ],
      createdDate: "2024-01-08",
      disputeStatus: "client_dispute",
      disputeReason: "Quality concerns with delivered work",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
      case "pending_release":
        return "bg-yellow-100 text-yellow-800"
      case "in_escrow":
        return "bg-blue-100 text-blue-800"
      case "dispute":
        return "bg-red-100 text-red-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
      case "pending_release":
        return <Clock className="h-4 w-4" />
      case "in_escrow":
        return <Shield className="h-4 w-4" />
      case "dispute":
        return <AlertTriangle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleReleaseEscrow = (escrowId, milestoneId) => {
    toast({
      title: "Escrow Released",
      description: "Payment has been released to the freelancer.",
    })
  }

  const handleDisputeEscrow = (escrowId) => {
    toast({
      title: "Dispute Initiated",
      description: "A dispute has been opened for this escrow account.",
    })
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.freelancer && transaction.freelancer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Escrow</h1>
          <p className="text-gray-600">Manage your payments, escrow accounts, and financial transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Balance</p>
                  <p className="text-3xl font-bold text-green-600">${stats.availableBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Escrow Balance</p>
                  <p className="text-3xl font-bold text-blue-600">${stats.escrowBalance.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user?.role === "freelancer" ? "Total Earned" : "Total Spent"}
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    $
                    {user?.role === "freelancer"
                      ? stats.totalEarned.toLocaleString()
                      : stats.totalSpent.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-orange-600">
                    $
                    {user?.role === "freelancer"
                      ? stats.thisMonth.earned.toLocaleString()
                      : stats.thisMonth.spent.toLocaleString()}
                  </p>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+{stats.thisMonth.growth}%</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-3xl font-bold text-yellow-600">${stats.pendingPayments.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="escrow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="escrow">Escrow Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="settings">Payment Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="escrow" className="space-y-6">
            <div className="grid gap-6">
              {escrowAccounts.map((escrow) => (
                <Card key={escrow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{escrow.project}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {escrow.client} → {escrow.freelancer} • Created {escrow.createdDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(escrow.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(escrow.status)}
                            <span className="capitalize">{escrow.status.replace("_", " ")}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Escrow Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">${escrow.totalAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Released</p>
                        <p className="text-xl font-bold text-green-600">${escrow.releasedAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Remaining</p>
                        <p className="text-xl font-bold text-blue-600">${escrow.remainingAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">
                          {Math.round((escrow.releasedAmount / escrow.totalAmount) * 100)}%
                        </span>
                      </div>
                      <Progress value={(escrow.releasedAmount / escrow.totalAmount) * 100} className="h-2" />
                    </div>

                    {/* Dispute Alert */}
                    {escrow.disputeStatus && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <h4 className="font-medium text-red-800">Dispute Active</h4>
                        </div>
                        <p className="text-sm text-red-700">{escrow.disputeReason}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          View Dispute Details
                        </Button>
                      </div>
                    )}

                    {/* Milestones */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Milestones</h4>
                      {escrow.milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Badge
                                className={
                                  milestone.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : milestone.status === "in_progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {milestone.status.replace("_", " ")}
                              </Badge>
                              <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">${milestone.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                {milestone.releaseDate
                                  ? `Released: ${milestone.releaseDate}`
                                  : `Due: ${milestone.dueDate}`}
                              </p>
                            </div>
                          </div>
                          {milestone.status === "completed" && !milestone.releaseDate && user?.role === "client" && (
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" onClick={() => handleReleaseEscrow(escrow.id, milestone.id)}>
                                <Send className="mr-1 h-3 w-3" />
                                Release Payment
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDisputeEscrow(escrow.id)}>
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Dispute
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 mt-6 pt-4 border-t">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedEscrow(escrow)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                      {escrow.status === "active" && user?.role === "client" && (
                        <Button variant="outline">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Add Funds
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "received" || transaction.type === "escrow_release"
                              ? "bg-green-100"
                              : transaction.type === "escrow_deposit"
                                ? "bg-blue-100"
                                : "bg-gray-100"
                          }`}
                        >
                          {transaction.type === "received" || transaction.type === "escrow_release" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          ) : transaction.type === "escrow_deposit" ? (
                            <Shield className="h-4 w-4 text-blue-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{transaction.client || transaction.freelancer}</span>
                            <span>•</span>
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.paymentMethod}</span>
                            {transaction.escrowId && (
                              <>
                                <span>•</span>
                                <span className="text-blue-600">{transaction.escrowId}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-semibold ${
                            transaction.type === "received" || transaction.type === "escrow_release"
                              ? "text-green-600"
                              : transaction.type === "escrow_deposit"
                                ? "text-blue-600"
                                : "text-gray-900"
                          }`}
                        >
                          {transaction.type === "received" || transaction.type === "escrow_release"
                            ? "+"
                            : transaction.type === "escrow_deposit"
                              ? ""
                              : "-"}
                          ${transaction.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(transaction.status)}
                              <span className="capitalize">{transaction.status.replace("_", " ")}</span>
                            </div>
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                  <p className="text-gray-600 mb-4">Create your first invoice to get started</p>
                  <Button>Create Invoice</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">Bank Account</p>
                          <p className="text-sm text-gray-600">****1234</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Primary</Badge>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-600">john@example.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Escrow Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Escrow Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Escrow Fee</label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2% - Basic</SelectItem>
                        <SelectItem value="3">3% - Standard</SelectItem>
                        <SelectItem value="5">5% - Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Auto-release Period (days)</label>
                    <Input type="number" defaultValue="7" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Require milestone approval</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Send payment notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable dispute mediation</span>
                    </label>
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Escrow Details Modal */}
        {selectedEscrow && (
          <Dialog open={!!selectedEscrow} onOpenChange={() => setSelectedEscrow(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Escrow Details - {selectedEscrow.project}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Escrow Summary */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${selectedEscrow.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Released</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedEscrow.releasedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${selectedEscrow.remainingAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Detailed Milestones */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Milestone Details</h4>
                  <div className="space-y-4">
                    {selectedEscrow.milestones.map((milestone) => (
                      <div key={milestone.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={
                                milestone.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : milestone.status === "in_progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {milestone.status.replace("_", " ")}
                            </Badge>
                            <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${milestone.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {milestone.releaseDate
                                ? `Released: ${milestone.releaseDate}`
                                : `Due: ${milestone.dueDate}`}
                            </p>
                          </div>
                        </div>

                        {milestone.status === "completed" && !milestone.releaseDate && (
                          <div className="flex space-x-2 pt-3 border-t">
                            <Button size="sm" onClick={() => handleReleaseEscrow(selectedEscrow.id, milestone.id)}>
                              <Send className="mr-1 h-3 w-3" />
                              Release ${milestone.amount.toLocaleString()}
                            </Button>
                            <Button variant="outline" size="sm">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Dispute
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction History */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Transaction History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="text-sm">Escrow account created</span>
                      <span className="text-sm text-gray-600">{selectedEscrow.createdDate}</span>
                    </div>
                    {selectedEscrow.milestones
                      .filter((m) => m.releaseDate)
                      .map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between p-3 bg-green-50 rounded">
                          <span className="text-sm">Released: {milestone.title}</span>
                          <div className="text-right">
                            <span className="text-sm font-medium">${milestone.amount.toLocaleString()}</span>
                            <br />
                            <span className="text-xs text-gray-600">{milestone.releaseDate}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                    <p className="font-mono text-sm">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Amount</label>
                    <p className="text-lg font-semibold">${selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date</label>
                    <p>{selectedTransaction.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Method</label>
                    <p>{selectedTransaction.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Badge className={getStatusColor(selectedTransaction.status)}>
                      {selectedTransaction.status.replace("_", " ")}
                    </Badge>
                  </div>
                  {selectedTransaction.escrowId && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Escrow ID</label>
                      <p className="font-mono text-sm text-blue-600">{selectedTransaction.escrowId}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p>{selectedTransaction.description}</p>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Invoice
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
