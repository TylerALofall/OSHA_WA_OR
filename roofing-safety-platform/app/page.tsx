'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Users,
  CheckCircle,
  Award,
  AlertTriangle,
  Calendar,
  Building2,
  ArrowRight,
  LayoutDashboard,
  BookOpen
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { companies, safetyMetrics, safetyAlerts, certifications } from '@/lib/data';
import { getExpirationStatus } from '@/lib/utils/helpers';

export default function HomePage() {
  // Calculate aggregate statistics
  const aggregateMetrics = safetyMetrics.find(m => !m.companyId);
  const criticalAlerts = safetyAlerts.filter(a => a.priority === 'critical' && !a.read);

  // Calculate certifications expiring soon
  const expiringCerts = certifications.filter(c => {
    const status = getExpirationStatus(c.daysUntilExpiration);
    return status.status === 'expiring_critical' || status.status === 'expiring_soon';
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Animated Shield Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl"
            >
              <Shield className="w-14 h-14 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Roofing Safety Management Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Comprehensive OSHA Compliance Management for {companies.length} Roofing Companies
              <br />
              <span className="text-base text-blue-200 mt-2 block">Oregon & Washington Operations</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/dashboard">
                <Button size="lg" variant="success" className="min-w-[200px]">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Access Dashboard
                </Button>
              </Link>
              <Link href="/safety-resources">
                <Button size="lg" variant="outline" className="min-w-[200px] bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Safety Resources
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real-Time Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Days Without Incident"
            value={aggregateMetrics?.daysWithoutIncident || 0}
            icon={<Calendar className="w-6 h-6" />}
            color="#10B981"
            delay={0}
          />
          <StatCard
            title="Workers Trained"
            value={`${certifications.length}+`}
            icon={<Users className="w-6 h-6" />}
            color="#3B82F6"
            delay={0.1}
          />
          <StatCard
            title="Compliance Rate"
            value={`${aggregateMetrics?.compliancePercentage || 0}%`}
            icon={<CheckCircle className="w-6 h-6" />}
            color="#059669"
            delay={0.2}
            trend={{
              value: 2,
              label: 'vs. last quarter',
              positive: true
            }}
          />
          <StatCard
            title="Active Certifications"
            value={aggregateMetrics?.activeCertifications || 0}
            icon={<Award className="w-6 h-6" />}
            color="#F59E0B"
            delay={0.3}
          />
        </div>
      </section>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-l-4 border-red-600">
              <CardContent className="flex items-start space-x-4 p-6">
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Critical Alerts Requiring Attention
                  </h3>
                  <div className="space-y-2">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between">
                        <p className="text-gray-700">{alert.message}</p>
                        <Badge variant="danger" size="sm">Action Required</Badge>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium">
                    View All Alerts <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Companies Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Companies Under Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => {
              const companyMetrics = safetyMetrics.find(m => m.companyId === company.id);
              return (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Link href={`/companies/${company.id}`}>
                    <Card hover>
                      <div
                        className="h-2 rounded-t-lg"
                        style={{ backgroundColor: company.color }}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>{company.name}</CardTitle>
                            <p className="text-sm text-gray-500 mt-1">{company.location}</p>
                          </div>
                          <Building2 className="w-6 h-6 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Employees</span>
                            <span className="font-semibold text-gray-900">{company.employeeCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Compliance</span>
                            <Badge variant="success" size="sm">
                              {companyMetrics?.compliancePercentage || 0}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">TRIR</span>
                            <span className="font-semibold text-gray-900">
                              {companyMetrics?.trir.toFixed(1) || '0.0'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Days Without Incident</span>
                            <Badge variant="success" size="sm">
                              {companyMetrics?.daysWithoutIncident || 0}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            {company.yearsInBusiness}+ years in business
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Quick Stats Row */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">{companies.length}</p>
              <p className="mt-2 text-sm text-gray-600">Companies Managed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">
                {companies.reduce((sum, c) => sum + c.employeeCount, 0)}+
              </p>
              <p className="mt-2 text-sm text-gray-600">Total Employees</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-600">{expiringCerts.length}</p>
              <p className="mt-2 text-sm text-gray-600">Certifications Expiring Soon</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">
                {aggregateMetrics?.nearMisses || 0}
              </p>
              <p className="mt-2 text-sm text-gray-600">Near Misses Reported</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
