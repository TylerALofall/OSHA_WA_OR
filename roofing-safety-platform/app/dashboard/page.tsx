'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Award,
  FileWarning
} from 'lucide-react';
import { employees, certifications, safetyAlerts, incidents, safetyMetrics } from '@/lib/data';
import { getExpirationStatus, formatDateShort } from '@/lib/utils/helpers';
import Link from 'next/link';

export default function DashboardPage() {
  const aggregateMetrics = safetyMetrics.find(m => !m.companyId);
  const unreadAlerts = safetyAlerts.filter(a => !a.read);
  const recentIncidents = incidents.slice(0, 3);

  // Get certifications by status
  const expiredCerts = certifications.filter(c => c.status === 'expired');
  const criticalCerts = certifications.filter(c => c.status === 'expiring_critical');
  const soonCerts = certifications.filter(c => c.status === 'expiring_soon');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Safety Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, Sandra Casey - Multi-company safety oversight
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Days Without Incident"
            value={aggregateMetrics?.daysWithoutIncident || 0}
            icon={<Calendar className="w-6 h-6" />}
            color="#10B981"
          />
          <StatCard
            title="Compliance Rate"
            value={`${aggregateMetrics?.compliancePercentage || 0}%`}
            icon={<CheckCircle2 className="w-6 h-6" />}
            color="#059669"
            trend={{
              value: 2,
              label: 'vs. last quarter',
              positive: true
            }}
          />
          <StatCard
            title="Active Employees"
            value={employees.length}
            icon={<Users className="w-6 h-6" />}
            color="#3B82F6"
          />
          <StatCard
            title="Training Completion"
            value={`${aggregateMetrics?.trainingCompletionRate || 0}%`}
            icon={<Award className="w-6 h-6" />}
            color="#F59E0B"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Critical Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Alerts</CardTitle>
                  <Badge variant="danger" size="sm">
                    {unreadAlerts.length} New
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unreadAlerts.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No active alerts</p>
                  ) : (
                    unreadAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {alert.priority === 'critical' && (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          )}
                          {alert.priority === 'high' && (
                            <FileWarning className="w-5 h-5 text-orange-600" />
                          )}
                          {(alert.priority === 'medium' || alert.priority === 'low') && (
                            <Clock className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{alert.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                            </div>
                            <Badge
                              variant={
                                alert.priority === 'critical' || alert.priority === 'high'
                                  ? 'danger'
                                  : alert.priority === 'medium'
                                  ? 'warning'
                                  : 'default'
                              }
                              size="sm"
                            >
                              {alert.priority}
                            </Badge>
                          </div>
                          {alert.actionRequired && (
                            <p className="text-xs text-red-600 mt-2 font-medium">
                              Action Required
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.map((incident) => {
                    const employee = employees.find(e => e.id === incident.employeeId);
                    return (
                      <div
                        key={incident.id}
                        className="border-l-4 border-orange-500 bg-gray-50 p-4 rounded-r-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {incident.type.replace('_', ' ').toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {employee?.firstName} {employee?.lastName} - {formatDateShort(incident.date)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              incident.severity === 'critical' || incident.severity === 'serious'
                                ? 'danger'
                                : incident.severity === 'moderate'
                                ? 'warning'
                                : 'default'
                            }
                            size="sm"
                          >
                            {incident.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{incident.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Investigation: {incident.investigationStatus}</span>
                          <span>{incident.correctiveActions.length} corrective actions</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/incidents"
                  className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View All Incidents →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Certification Expirations */}
            <Card>
              <CardHeader>
                <CardTitle>Credential Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Expired */}
                  {expiredCerts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-red-800">Expired</span>
                        <Badge variant="danger" size="sm">
                          {expiredCerts.length}
                        </Badge>
                      </div>
                      <p className="text-xs text-red-700">Immediate action required</p>
                    </div>
                  )}

                  {/* Critical (< 30 days) */}
                  {criticalCerts.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-orange-800">
                          Critical (&lt;30 days)
                        </span>
                        <Badge variant="warning" size="sm">
                          {criticalCerts.length}
                        </Badge>
                      </div>
                      <p className="text-xs text-orange-700">Renewal needed urgently</p>
                    </div>
                  )}

                  {/* Expiring Soon (30-90 days) */}
                  {soonCerts.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-yellow-800">
                          Expiring Soon (30-90 days)
                        </span>
                        <Badge variant="warning" size="sm">
                          {soonCerts.length}
                        </Badge>
                      </div>
                      <p className="text-xs text-yellow-700">Schedule renewals</p>
                    </div>
                  )}

                  {expiredCerts.length === 0 && criticalCerts.length === 0 && soonCerts.length === 0 && (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">All certifications current</p>
                    </div>
                  )}
                </div>
                <Link
                  href="/team"
                  className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Manage Credentials →
                </Link>
              </CardContent>
            </Card>

            {/* Safety Metrics Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Metrics (YTD)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">TRIR</span>
                      <span className="font-semibold text-gray-900">
                        {aggregateMetrics?.trir.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min((3 / aggregateMetrics!.trir) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">LTIR</span>
                      <span className="font-semibold text-gray-900">
                        {aggregateMetrics?.ltir.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min((2 / aggregateMetrics!.ltir) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Total Incidents</span>
                      <span className="font-semibold">{aggregateMetrics?.incidentCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Near Misses</span>
                      <span className="font-semibold">{aggregateMetrics?.nearMisses}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Hours Worked</span>
                      <span className="font-semibold">
                        {aggregateMetrics?.hoursWorked.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/reports"
                  className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Detailed Reports →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
