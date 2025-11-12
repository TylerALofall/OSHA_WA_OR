'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  HardHat,
  CheckCircle,
  Users,
  FileText,
  Camera,
  ArrowRight,
  Building2
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { useCompany } from '@/lib/context/CompanyContext';

export default function HomePage() {
  const { selectedCompany } = useCompany();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section - Professional Landing */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hard Hat Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full shadow-2xl">
                <HardHat className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {selectedCompany.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              OSHA Compliance & Safety Management
            </p>
            <p className="text-lg text-blue-200 mb-10">
              Professional roofing safety compliance for Oregon & Washington operations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="success" className="btn-glow min-w-[200px]">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety Dashboard
                </Button>
              </Link>
              <Link href="/team">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Manage Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#f8fafc"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Team Management',
              description: 'Add crew members, track certifications, manage credentials',
              href: '/team',
              color: '#3b82f6',
            },
            {
              icon: <FileText className="w-8 h-8" />,
              title: 'OSHA Compliance',
              description: 'State-specific checklists for Oregon & Washington',
              href: '/compliance',
              color: '#10b981',
            },
            {
              icon: <Camera className="w-8 h-8" />,
              title: 'Job Documentation',
              description: 'Upload photos, track incidents, document safety',
              href: '/incidents',
              color: '#f97316',
            },
            {
              icon: <Building2 className="w-8 h-8" />,
              title: 'Homeowner View',
              description: 'Professional crew showcase for customers',
              href: '/homeowner',
              color: '#8b5cf6',
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="floating-panel p-6 h-full cursor-pointer group">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
                      boxShadow: `0 0 20px ${card.color}30`,
                    }}
                  >
                    <div style={{ color: card.color }}>{card.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <div className="flex items-center text-sm font-medium" style={{ color: card.color }}>
                    Get Started <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compliance Status Bar */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCompany.name}
              </h3>
              <p className="text-gray-600">
                {selectedCompany.location} • {selectedCompany.employeeCount} Employees
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  <CheckCircle className="w-8 h-8 inline-block" />
                </div>
                <p className="text-sm text-gray-600">OSHA Compliant</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {selectedCompany.yearsInBusiness}+
                </div>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {selectedCompany.employeeCount}
                </div>
                <p className="text-sm text-gray-600">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="floating-panel p-12 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to manage your safety compliance?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Prevent OSHA violations, track certifications, and keep your crews safe.
            Start by adding your team members.
          </p>
          <Link href="/team">
            <Button size="lg" className="btn-glow">
              <Users className="w-5 h-5 mr-2" />
              Add Your First Team Member
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
