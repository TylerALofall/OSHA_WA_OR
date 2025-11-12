'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { companies, locations, safetyMetrics } from '@/lib/data';
import { Building2, MapPin, Users, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
          <p className="text-gray-600">
            Manage {companies.length} roofing companies across Oregon and Washington
          </p>
        </div>

        <div className="space-y-6">
          {companies.map((company) => {
            const companyLocations = locations.filter(l => l.companyId === company.id);
            const companyMetrics = safetyMetrics.find(m => m.companyId === company.id);

            return (
              <Card key={company.id} hover>
                <div
                  className="h-2 rounded-t-lg"
                  style={{ backgroundColor: company.color }}
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                        style={{ backgroundColor: company.color }}
                      >
                        {company.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{company.name}</CardTitle>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.location}
                        </p>
                      </div>
                    </div>
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Contact</p>
                      <p className="text-sm font-medium text-gray-900">{company.phone}</p>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Website →
                        </a>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Employees</p>
                      <p className="text-2xl font-bold text-gray-900">{company.employeeCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Experience</p>
                      <p className="text-2xl font-bold text-gray-900">{company.yearsInBusiness}+</p>
                      <p className="text-xs text-gray-500">years in business</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Compliance</p>
                      <Badge variant="success" size="lg">
                        {companyMetrics?.compliancePercentage}%
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Locations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companyLocations.map((location) => (
                        <div key={location.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-gray-900">{location.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                          <p className="text-sm text-gray-600">
                            {location.city}, {location.state} {location.zipCode}
                          </p>
                          <div className="flex items-center justify-between mt-3 text-sm">
                            <span className="text-gray-600">Active Crew: {location.activeCrew}</span>
                            <span className="text-gray-600">Job Sites: {location.activeJobSites}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.specialization.map((spec, index) => (
                        <Badge key={index} variant="info" size="sm">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {companyMetrics && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Safety Metrics (YTD)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">TRIR</p>
                          <p className="text-xl font-bold text-gray-900">{companyMetrics.trir.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">LTIR</p>
                          <p className="text-xl font-bold text-gray-900">{companyMetrics.ltir.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Days W/O Incident</p>
                          <p className="text-xl font-bold text-green-600">{companyMetrics.daysWithoutIncident}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Training Completion</p>
                          <p className="text-xl font-bold text-blue-600">{companyMetrics.trainingCompletionRate}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
