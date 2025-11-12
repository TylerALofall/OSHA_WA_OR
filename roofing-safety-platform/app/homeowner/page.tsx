'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Users,
  Award,
  CheckCircle,
  Shield,
  Star,
  Briefcase,
  Phone,
  Mail
} from 'lucide-react';
import { useCompany } from '@/lib/context/CompanyContext';
import { getEmployees } from '@/lib/utils/storage';

interface Employee {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
  hireDate: string;
  yearsExperience: number;
  photo?: string;
  certificates: {
    id: string;
    name: string;
    file: string;
    uploadDate: string;
  }[];
  pastJobs: string;
}

export default function HomeownerPage() {
  const { selectedCompany } = useCompany();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const loadedEmployees = getEmployees();
    setEmployees(loadedEmployees);
  }, []);

  const companyEmployees = employees.filter(
    (emp) => emp.companyId === selectedCompany.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 shadow-xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Your Professional Crew
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Licensed, Certified, and Dedicated to Excellence
          </p>
          <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold">OSHA Certified</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold">Fully Insured</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-semibold">Experienced Professionals</span>
            </div>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="floating-panel p-8 mb-12 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: selectedCompany.color }}
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCompany.name}
            </h2>
          </div>
          <p className="text-gray-600 mb-4">{selectedCompany.location}</p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a
              href={`tel:${selectedCompany.phone}`}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              {selectedCompany.phone}
            </a>
            <a
              href={`mailto:${selectedCompany.email}`}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              {selectedCompany.email}
            </a>
          </div>
        </div>

        {/* Team Members Grid */}
        {companyEmployees.length === 0 ? (
          <EmptyState
            icon={<Users className="w-12 h-12 text-gray-400" />}
            title="Crew Information Coming Soon"
            description="Your dedicated roofing crew information will be displayed here before work begins."
          />
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Dedicated Team ({companyEmployees.length} Professionals)
              </h2>
              <p className="text-gray-600">
                Each member is certified, background-checked, and committed to your satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyEmployees.map((employee, index) => (
                <div
                  key={employee.id}
                  className="floating-panel overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Photo Section */}
                  <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-8">
                    <div className="flex justify-center">
                      {employee.photo ? (
                        <img
                          src={employee.photo}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-xl">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </div>
                      )}
                    </div>

                    {/* Certification Badge */}
                    {employee.certificates.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    {/* Name & Position */}
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-blue-600 font-semibold text-lg">
                        {employee.position}
                      </p>
                    </div>

                    {/* Experience Badge */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">
                          {employee.yearsExperience} {employee.yearsExperience === 1 ? 'Year' : 'Years'} Experience
                        </span>
                      </div>
                    </div>

                    {/* Certifications */}
                    {employee.certificates.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <Award className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-700">
                            Safety Certifications
                          </span>
                        </div>
                        <div className="space-y-1">
                          {employee.certificates.slice(0, 3).map((cert) => (
                            <div
                              key={cert.id}
                              className="flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                              <span className="text-xs text-gray-600">{cert.name}</span>
                            </div>
                          ))}
                          {employee.certificates.length > 3 && (
                            <p className="text-xs text-gray-500 text-center">
                              +{employee.certificates.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Past Jobs */}
                    {employee.pastJobs && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Specializations:
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {employee.pastJobs}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 floating-panel p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Trust {selectedCompany.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                OSHA Compliant
              </h3>
              <p className="text-sm text-gray-600">
                All crew members are trained in OSHA safety standards and follow strict protocols to ensure a safe work environment.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Fully Certified
              </h3>
              <p className="text-sm text-gray-600">
                Every team member holds current safety certifications and undergoes regular training to maintain the highest standards.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Experienced Professionals
              </h3>
              <p className="text-sm text-gray-600">
                Our crew brings years of expertise to every project, ensuring quality workmanship and attention to detail.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Commitment */}
        <div className="mt-8 alert-success p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Our Safety Commitment
              </h3>
              <p className="text-sm text-green-800 leading-relaxed">
                Your safety and satisfaction are our top priorities. Every crew member is background-checked, drug-tested, and carries proper identification. We maintain comprehensive insurance coverage and follow all local building codes and safety regulations. Your property will be treated with the utmost respect and professionalism.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Questions about your project or our team?
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href={`tel:${selectedCompany.phone}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg btn-glow"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Today
            </a>
            <a
              href={`mailto:${selectedCompany.email}`}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
