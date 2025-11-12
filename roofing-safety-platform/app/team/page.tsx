'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileUpload } from '@/components/ui/FileUpload';
import {
  UserPlus,
  Users,
  Mail,
  Phone,
  Calendar,
  Award,
  X,
  Briefcase,
  Camera
} from 'lucide-react';
import { useCompany } from '@/lib/context/CompanyContext';
import {
  saveEmployee,
  getEmployees,
  deleteEmployee,
  generateId,
  fileToBase64
} from '@/lib/utils/storage';

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

export default function TeamPage() {
  const { selectedCompany } = useCompany();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    hireDate: '',
    yearsExperience: 0,
    pastJobs: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);

  // Load employees from localStorage
  useEffect(() => {
    const loadedEmployees = getEmployees();
    setEmployees(loadedEmployees);
  }, []);

  // Filter employees by selected company
  const companyEmployees = employees.filter(
    (emp) => emp.companyId === selectedCompany.id
  );

  const handleAddEmployee = async () => {
    if (!formData.firstName || !formData.lastName || !formData.position) {
      alert('Please fill in all required fields (Name and Position)');
      return;
    }

    // Convert photo to base64
    let photoBase64 = '';
    if (photoFile) {
      photoBase64 = await fileToBase64(photoFile);
    }

    // Convert certificates to base64
    const certificates = await Promise.all(
      certificateFiles.map(async (file) => ({
        id: generateId(),
        name: file.name,
        file: await fileToBase64(file),
        uploadDate: new Date().toISOString(),
      }))
    );

    const newEmployee: Employee = {
      id: generateId(),
      companyId: selectedCompany.id,
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      position: formData.position!,
      email: formData.email || '',
      phone: formData.phone || '',
      hireDate: formData.hireDate || new Date().toISOString(),
      yearsExperience: formData.yearsExperience || 0,
      photo: photoBase64,
      certificates,
      pastJobs: formData.pastJobs || '',
    };

    saveEmployee(newEmployee);
    setEmployees([...employees, newEmployee]);

    // Reset form
    setShowAddModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      phone: '',
      hireDate: '',
      yearsExperience: 0,
      pastJobs: '',
    });
    setPhotoFile(null);
    setCertificateFiles([]);
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Team Management
            </h1>
            <p className="text-gray-600">
              Manage crew members for {selectedCompany.name}
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            size="lg"
            className="btn-glow"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Team Member
          </Button>
        </div>

        {/* Team Members Grid */}
        {companyEmployees.length === 0 ? (
          <EmptyState
            icon={<Users className="w-12 h-12 text-gray-400" />}
            title="No Team Members Yet"
            description="Get started by adding your first crew member. Upload their photo, certifications, and track their experience."
            actionLabel="Add First Team Member"
            onAction={() => setShowAddModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyEmployees.map((employee) => (
              <div
                key={employee.id}
                className="floating-panel p-6 relative group animate-fade-in"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="absolute top-4 right-4 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>

                {/* Photo */}
                <div className="flex justify-center mb-4">
                  {employee.photo ? (
                    <img
                      src={employee.photo}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </div>
                  )}
                </div>

                {/* Name & Position */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {employee.position}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  {employee.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                  )}
                  {employee.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {employee.phone}
                    </div>
                  )}
                  {employee.hireDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      Hired: {new Date(employee.hireDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                    {employee.yearsExperience} years experience
                  </div>
                </div>

                {/* Certificates Badge */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">
                      Certifications
                    </span>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="cert-badge valid px-2 py-1">
                        {employee.certificates.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setShowAddModal(false)}
              />

              {/* Modal */}
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <UserPlus className="w-6 h-6 mr-2" />
                      Add Team Member
                    </h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Camera className="w-4 h-4 inline mr-1" />
                      Employee Photo
                    </label>
                    <FileUpload
                      onFilesSelected={(files) => setPhotoFile(files[0])}
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5}
                    />
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Crew Leader, Roofer, Foreman, etc."
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Hire Date & Experience */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hire Date
                      </label>
                      <input
                        type="date"
                        value={formData.hireDate}
                        onChange={(e) =>
                          setFormData({ ...formData, hireDate: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Years Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.yearsExperience}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            yearsExperience: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  {/* Past Jobs */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Past Jobs / Notes
                    </label>
                    <textarea
                      value={formData.pastJobs}
                      onChange={(e) =>
                        setFormData({ ...formData, pastJobs: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Notable projects, specializations, etc."
                    />
                  </div>

                  {/* Certificates Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Award className="w-4 h-4 inline mr-1" />
                      Certifications (PDF, Images)
                    </label>
                    <FileUpload
                      onFilesSelected={(files) => setCertificateFiles(files)}
                      accept="image/*,.pdf"
                      maxFiles={10}
                      maxSize={10}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddEmployee} className="btn-glow">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
