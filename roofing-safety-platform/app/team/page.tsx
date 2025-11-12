'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { employees, companies, certifications } from '@/lib/data';
import { getExpirationStatus, formatDateShort } from '@/lib/utils/helpers';
import { useState } from 'react';

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany = selectedCompany === 'all' || employee.companyId === selectedCompany;

    if (statusFilter === 'expired') {
      return matchesSearch && matchesCompany && employee.certifications.some(c => c.status === 'expired');
    } else if (statusFilter === 'expiring') {
      return matchesSearch && matchesCompany && employee.certifications.some(c =>
        c.status === 'expiring_critical' || c.status === 'expiring_soon'
      );
    }

    return matchesSearch && matchesCompany;
  });

  // Get employee company
  const getEmployeeCompany = (companyId: string) => {
    return companies.find(c => c.id === companyId);
  };

  // Get certification status counts for an employee
  const getCertStatusCounts = (employeeCerts: typeof certifications) => {
    return {
      valid: employeeCerts.filter(c => c.status === 'valid').length,
      expiring: employeeCerts.filter(c => c.status === 'expiring_soon' || c.status === 'expiring_critical').length,
      expired: employeeCerts.filter(c => c.status === 'expired').length,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team & Credentials</h1>
          <p className="text-gray-600">
            Manage employees and track certification expirations across all companies
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Employees</p>
                  <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valid Certifications</p>
                  <p className="text-3xl font-bold text-green-600">
                    {certifications.filter(c => c.status === 'valid').length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {certifications.filter(c => c.status === 'expiring_soon' || c.status === 'expiring_critical').length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Expired</p>
                  <p className="text-3xl font-bold text-red-600">
                    {certifications.filter(c => c.status === 'expired').length}
                  </p>
                </div>
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, position, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4">
            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>

            <div className="flex-1 flex items-center justify-end text-sm text-gray-600">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="space-y-4">
          {filteredEmployees.map((employee) => {
            const company = getEmployeeCompany(employee.companyId);
            const certCounts = getCertStatusCounts(employee.certifications);
            const hasExpired = certCounts.expired > 0;
            const hasExpiring = certCounts.expiring > 0;

            return (
              <Card
                key={employee.id}
                className={`${
                  hasExpired
                    ? 'border-l-4 border-red-600'
                    : hasExpiring
                    ? 'border-l-4 border-orange-600'
                    : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Employee Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-semibold text-lg">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Company</p>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: company?.color }}
                            />
                            <p className="text-sm font-medium text-gray-900">{company?.name}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Contact</p>
                          <p className="text-sm text-gray-900">{employee.email}</p>
                          <p className="text-sm text-gray-600">{employee.phone}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Hire Date</p>
                          <p className="text-sm text-gray-900">{formatDateShort(employee.hireDate)}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Role</p>
                          <Badge variant="info" size="sm">
                            {employee.role.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Certification Status */}
                    <div className="ml-6">
                      <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
                        <p className="text-xs font-semibold text-gray-700 mb-3 uppercase">
                          Certifications
                        </p>
                        <div className="space-y-2">
                          {certCounts.valid > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Valid</span>
                              <Badge variant="success" size="sm">
                                {certCounts.valid}
                              </Badge>
                            </div>
                          )}
                          {certCounts.expiring > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Expiring</span>
                              <Badge variant="warning" size="sm">
                                {certCounts.expiring}
                              </Badge>
                            </div>
                          )}
                          {certCounts.expired > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Expired</span>
                              <Badge variant="danger" size="sm">
                                {certCounts.expired}
                              </Badge>
                            </div>
                          )}
                          {employee.certifications.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No certifications</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certification Details */}
                  {employee.certifications.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {employee.certifications.map((cert) => {
                          const status = getExpirationStatus(cert.daysUntilExpiration);
                          return (
                            <div
                              key={cert.id}
                              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-900 flex-1">
                                  {cert.name}
                                </p>
                                <Badge
                                  variant={
                                    status.status === 'expired'
                                      ? 'danger'
                                      : status.status === 'expiring_critical'
                                      ? 'danger'
                                      : status.status === 'expiring_soon'
                                      ? 'warning'
                                      : 'success'
                                  }
                                  size="sm"
                                  pulse={status.status === 'expiring_critical'}
                                >
                                  {status.label}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex justify-between">
                                  <span>Issued:</span>
                                  <span>{formatDateShort(cert.issueDate)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Expires:</span>
                                  <span
                                    className={
                                      status.status === 'expired' || status.status === 'expiring_critical'
                                        ? 'text-red-600 font-semibold'
                                        : status.status === 'expiring_soon'
                                        ? 'text-orange-600 font-semibold'
                                        : ''
                                    }
                                  >
                                    {formatDateShort(cert.expirationDate)}
                                  </span>
                                </div>
                                {cert.certificateNumber && (
                                  <div className="flex justify-between pt-1 border-t border-gray-300">
                                    <span>Cert #:</span>
                                    <span className="font-mono text-xs">{cert.certificateNumber}</span>
                                  </div>
                                )}
                              </div>

                              {/* Action Required Warning */}
                              {(status.status === 'expired' || status.status === 'expiring_critical') && (
                                <div className="mt-2 pt-2 border-t border-gray-300">
                                  <div className="flex items-center text-xs text-red-600 font-medium">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Action Required
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
