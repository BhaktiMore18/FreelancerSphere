"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Shield, AlertTriangle, Send, Eye, FileText, DollarSign, CheckCircle, Clock } from "lucide-react"

export function EscrowCard({ escrow, onReleasePayment, onDispute, onViewDetails }) {
  const { toast } = useToast()

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "dispute":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{escrow.project}</CardTitle>
            <p className="text-sm text-gray-600">
              {escrow.client} → {escrow.freelancer} • Created {escrow.createdDate}
            </p>
          </div>
          <Badge className={getStatusColor(escrow.status)}>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span className="capitalize">{escrow.status}</span>
            </div>
          </Badge>
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

        {/* Milestones Preview */}
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-900">Recent Milestones</h4>
          {escrow.milestones.slice(0, 2).map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Badge className={getMilestoneStatusColor(milestone.status)}>
                  {milestone.status === "completed" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {milestone.status.replace("_", " ")}
                </Badge>
                <span className="text-sm font-medium">{milestone.title}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">${milestone.amount.toLocaleString()}</p>
                {milestone.status === "completed" && !milestone.releaseDate && (
                  <Button size="sm" className="mt-1" onClick={() => onReleasePayment(escrow.id, milestone.id)}>
                    <Send className="h-3 w-3 mr-1" />
                    Release
                  </Button>
                )}
              </div>
            </div>
          ))}
          {escrow.milestones.length > 2 && (
            <p className="text-sm text-gray-600">+{escrow.milestones.length - 2} more milestones</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onViewDetails(escrow)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          {escrow.status === "active" && (
            <Button variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
