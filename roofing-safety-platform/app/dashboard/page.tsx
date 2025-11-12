'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Award,
  FileWarning,
  Shield,
  ClipboardCheck
} from 'lucide-react';
import { useCompany } from '@/lib/context/CompanyContext';
import {
  getEmployees,
  getIncidents,
  getChecklists,
  getCertificates
} from '@/lib/utils/storage';
import Link from 'next/link';

export default function DashboardPage() {
  const { selectedCompany } = useCompany();
  const [employees, setEmployees] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [checklists, setChecklists] = useState<any[]>([]);

  useEffect(() => {
    setEmployees(getEmployees());
    setIncidents(getIncidents());
    setChecklists(getChecklists());
  }, []);

  // Filter by company
  const companyEmployees = employees.filter(e => e.companyId === selectedCompany.id);
  const companyIncidents = incidents.filter(i => i.companyId === selectedCompany.id);
  const companyChecklists = checklists.filter(c => c.companyId === selectedCompany.id);

  // Calculate metrics
  const totalCertificates = companyEmployees.reduce((sum, emp) => sum + (emp.certificates?.length || 0), 0);
  const activeIncidents = companyIncidents.filter(i => i.status === 'open' || i.status === 'under-review').length;
  const completeChecklists = companyChecklists.filter(c => c.status === 'complete').length;
  const complianceRate = companyChecklists.length > 0
    ? Math.round((completeChecklists / companyChecklists.length) * 100)
    : 100;

  // Recent incidents (last 3)
  const recentIncidents = companyIncidents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Days without incident
  const lastIncident = companyIncidents.length > 0
    ? Math.floor((Date.now() - new Date(companyIncidents[0].date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Safety Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, Sandra Casey - {selectedCompany.name} Overview
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="floating-panel p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{companyEmployees.length}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="floating-panel p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Compliance Rate</p>
                <p className="text-3xl font-bold text-green-600">{complianceRate}%</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="floating-panel p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Incidents</p>
                <p className="text-3xl font-bold text-orange-600">{activeIncidents}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <div className="floating-panel p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Certifications</p>
                <p className="text-3xl font-bold text-blue-600">{totalCertificates}</p>
              </div>
              <Award className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="floating-panel p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/team">
                  <div className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Team</h3>
                    <p className="text-sm text-gray-600">Manage crew members</p>
                  </div>
                </Link>
                <Link href="/safety">
                  <div className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer">
                    <ClipboardCheck className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Checklists</h3>
                    <p className="text-sm text-gray-600">OSHA compliance</p>
                  </div>
                </Link>
                <Link href="/incidents">
                  <div className="p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer">
                    <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Incidents</h3>
                    <p className="text-sm text-gray-600">Report & track</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="floating-panel p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Incidents</h2>
                <Link href="/incidents">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>

              {recentIncidents.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Incidents Reported
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Great job! Keep up the excellent safety practices.
                  </p>
                  {companyIncidents.length > 0 && (
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Last incident: {lastIncident} days ago</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{incident.type}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(incident.date).toLocaleDateString()} at {incident.time}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          incident.severity === 'serious' ? 'bg-red-100 text-red-800' :
                          incident.severity === 'medical' ? 'bg-orange-100 text-orange-800' :
                          incident.severity === 'first-aid' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {incident.severity.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{incident.description}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Location: {incident.location}</span>
                        <span>Reported by: {incident.reportedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compliance Summary */}
            <div className="floating-panel p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-4">OSHA Compliance</h2>
              {companyChecklists.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No checklists completed yet</p>
                  <Link href="/safety">
                    <Button>Create First Checklist</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 font-semibold mb-1">Completed</p>
                      <p className="text-2xl font-bold text-green-900">{completeChecklists}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-800 font-semibold mb-1">Incomplete</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {companyChecklists.length - completeChecklists}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Compliance</span>
                      <span className="font-semibold text-gray-900">{complianceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          complianceRate >= 90 ? 'bg-green-600' :
                          complianceRate >= 75 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${complianceRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Team Summary */}
            <div className="floating-panel p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Summary</h3>
              {companyEmployees.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-3">No team members yet</p>
                  <Link href="/team">
                    <Button size="sm">Add Team Member</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Crew</span>
                    <span className="font-semibold text-gray-900">{companyEmployees.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Certifications</span>
                    <span className="font-semibold text-gray-900">{totalCertificates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Experience</span>
                    <span className="font-semibold text-gray-900">
                      {companyEmployees.length > 0
                        ? Math.round(
                            companyEmployees.reduce((sum, emp) => sum + (emp.yearsExperience || 0), 0) /
                              companyEmployees.length
                          )
                        : 0}{' '}
                      years
                    </span>
                  </div>
                  <Link href="/team" className="block mt-4">
                    <Button variant="outline" size="sm" fullWidth>
                      Manage Team
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Safety Status */}
            <div className="floating-panel p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Safety Status</h3>
              <div className="space-y-4">
                {activeIncidents === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-900">All Clear</span>
                    </div>
                    <p className="text-sm text-green-700">
                      No active incidents or open cases
                    </p>
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="font-semibold text-orange-900">
                        {activeIncidents} Active {activeIncidents === 1 ? 'Case' : 'Cases'}
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Requires attention and follow-up
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-900">OSHA Compliant</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {complianceRate}% checklist completion rate
                  </p>
                </div>
              </div>
            </div>

            {/* Homeowner View Link */}
            <div className="floating-panel p-6 animate-fade-in bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Homeowner View</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional crew showcase for customers
              </p>
              <Link href="/homeowner">
                <Button variant="primary" size="sm" fullWidth className="btn-glow">
                  View Crew Showcase
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
