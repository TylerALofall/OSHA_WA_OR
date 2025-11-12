'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  AlertTriangle,
  Users,
  BarChart3,
  Bell,
  Menu,
  X,
  Coffee
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useCompany } from '@/lib/context/CompanyContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Safety Resources', href: '/safety-resources', icon: BookOpen },
  { name: 'Training', href: '/training', icon: GraduationCap },
  { name: 'Compliance', href: '/compliance', icon: ClipboardCheck },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(0);
  const [showCoffeeMessage, setShowCoffeeMessage] = useState(false);
  const { selectedCompany, setSelectedCompany, companies } = useCompany();

  return (
    <>
      {/* Company Selector Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white border-b border-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium text-blue-200">Select Company:</span>
            </div>
            <div className="flex items-center space-x-2">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCompany.id === company.id
                      ? 'bg-white text-blue-900 shadow-lg scale-105'
                      : 'bg-blue-800 text-blue-100 hover:bg-blue-700'
                  }`}
                  style={
                    selectedCompany.id === company.id
                      ? { backgroundColor: company.color, color: 'white' }
                      : {}
                  }
                >
                  {company.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: selectedCompany.color }}
                >
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">{selectedCompany.name}</h1>
                  <p className="text-xs text-gray-500">Safety Management - Sandra Casey</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right side - Notifications, Coffee, and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Coffee Button with Smartass Message */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowCoffeeMessage(true)}
                  onMouseLeave={() => setShowCoffeeMessage(false)}
                  onClick={() =>
                    alert(
                      "☕ Safety first, but coffee's a close second. OSHA says nothing about caffeine limits! 😏"
                    )
                  }
                  className="relative p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Click for your daily dose of wisdom"
                >
                  <Coffee className="w-5 h-5" />
                </button>
                {showCoffeeMessage && (
                  <div className="absolute right-0 top-12 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-50 animate-fadeIn">
                    <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"></div>
                    <p className="font-semibold mb-1">☕ Coffee-Fueled Compliance™</p>
                    <p className="text-gray-300">
                      Because OSHA violations are expensive, but this coffee? Priceless. Click me for
                      wisdom!
                    </p>
                  </div>
                )}
              </div>

              {/* User Badge */}
              <div className="hidden sm:block">
                <Badge variant="info" size="md">
                  Sandra Casey
                </Badge>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
