'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { CameraCapture } from '@/components/ui/CameraCapture';
import { FileUpload } from '@/components/ui/FileUpload';
import {
  AlertTriangle,
  Camera,
  FileText,
  MapPin,
  Clock,
  User,
  Plus,
  Eye,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useCompany } from '@/lib/context/CompanyContext';
import {
  saveIncident,
  getIncidents,
  generateId,
  fileToBase64
} from '@/lib/utils/storage';

interface Incident {
  id: string;
  companyId: string;
  date: string;
  time: string;
  location: string;
  jobSite: string;
  severity: 'near-miss' | 'first-aid' | 'medical' | 'serious';
  type: string;
  description: string;
  involvedPerson?: string;
  witnesses?: string;
  photos: string[];
  actionsTaken: string;
  rootCause?: string;
  preventiveMeasures?: string;
  reportedBy: string;
  status: 'open' | 'under-review' | 'closed';
}

const INCIDENT_TYPES = [
  'Fall from height',
  'Slip/Trip',
  'Struck by object',
  'Equipment malfunction',
  'Weather-related',
  'Electrical hazard',
  'Chemical exposure',
  'Cut/Laceration',
  'Strain/Sprain',
  'Other'
];

export default function IncidentsPage() {
  const { selectedCompany } = useCompany();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [viewIncident, setViewIncident] = useState<Incident | null>(null);
  const [incidentPhotos, setIncidentPhotos] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<Incident>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    location: '',
    jobSite: '',
    severity: 'near-miss',
    type: '',
    description: '',
    involvedPerson: '',
    witnesses: '',
    actionsTaken: '',
    rootCause: '',
    preventiveMeasures: '',
    reportedBy: '',
    status: 'open',
  });

  useEffect(() => {
    const loadedIncidents = getIncidents();
    setIncidents(loadedIncidents);
  }, []);

  const companyIncidents = incidents.filter(
    (incident) => incident.companyId === selectedCompany.id
  );

  const handlePhotoCapture = async (photoBlob: Blob) => {
    const base64 = await fileToBase64(photoBlob as File);
    setIncidentPhotos([...incidentPhotos, base64]);
  };

  const handleFileUpload = async (files: File[]) => {
    const base64Photos = await Promise.all(
      files.map((file) => fileToBase64(file))
    );
    setIncidentPhotos([...incidentPhotos, ...base64Photos]);
  };

  const handleCreateIncident = () => {
    if (!formData.location || !formData.description || !formData.reportedBy) {
      alert('Please fill in required fields: Location, Description, and Reported By');
      return;
    }

    const newIncident: Incident = {
      id: generateId(),
      companyId: selectedCompany.id,
      date: formData.date!,
      time: formData.time!,
      location: formData.location!,
      jobSite: formData.jobSite || '',
      severity: formData.severity!,
      type: formData.type || 'Other',
      description: formData.description!,
      involvedPerson: formData.involvedPerson,
      witnesses: formData.witnesses,
      photos: incidentPhotos,
      actionsTaken: formData.actionsTaken || '',
      rootCause: formData.rootCause,
      preventiveMeasures: formData.preventiveMeasures,
      reportedBy: formData.reportedBy!,
      status: formData.status!,
    };

    saveIncident(newIncident);
    setIncidents([...incidents, newIncident]);

    // Reset form
    setShowNewIncidentModal(false);
    setIncidentPhotos([]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      location: '',
      jobSite: '',
      severity: 'near-miss',
      type: '',
      description: '',
      involvedPerson: '',
      witnesses: '',
      actionsTaken: '',
      rootCause: '',
      preventiveMeasures: '',
      reportedBy: '',
      status: 'open',
    });
  };

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'near-miss':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'first-aid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medical':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'serious':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Incident['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Incident Reports
              </h1>
              <p className="text-gray-600">
                Track and manage safety incidents for {selectedCompany.name}
              </p>
            </div>
            <Button
              onClick={() => setShowNewIncidentModal(true)}
              size="lg"
              variant="danger"
              className="btn-glow"
            >
              <Plus className="w-5 h-5 mr-2" />
              Report Incident
            </Button>
          </div>

          {/* Safety Notice */}
          <div className="alert-danger p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">
                Report ALL Incidents Immediately
              </p>
              <p className="text-sm text-red-800">
                Near-misses, injuries, and safety hazards must be reported within 24 hours. Serious injuries require immediate OSHA notification (within 8 hours for fatalities, 24 hours for hospitalizations).
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="floating-panel p-6">
            <p className="text-sm text-gray-600 mb-1">Total Incidents</p>
            <p className="text-3xl font-bold text-gray-900">{companyIncidents.length}</p>
          </div>
          <div className="floating-panel p-6">
            <p className="text-sm text-gray-600 mb-1">Near Misses</p>
            <p className="text-3xl font-bold text-blue-600">
              {companyIncidents.filter((i) => i.severity === 'near-miss').length}
            </p>
          </div>
          <div className="floating-panel p-6">
            <p className="text-sm text-gray-600 mb-1">Medical Incidents</p>
            <p className="text-3xl font-bold text-orange-600">
              {companyIncidents.filter((i) => i.severity === 'medical' || i.severity === 'serious').length}
            </p>
          </div>
          <div className="floating-panel p-6">
            <p className="text-sm text-gray-600 mb-1">Open Cases</p>
            <p className="text-3xl font-bold text-red-600">
              {companyIncidents.filter((i) => i.status === 'open' || i.status === 'under-review').length}
            </p>
          </div>
        </div>

        {/* Incidents List */}
        {companyIncidents.length === 0 ? (
          <EmptyState
            icon={<AlertTriangle className="w-12 h-12 text-gray-400" />}
            title="No Incidents Reported"
            description="Great! No incidents have been reported yet. Continue following safety protocols to maintain a safe work environment."
            actionLabel="Report Incident"
            onAction={() => setShowNewIncidentModal(true)}
          />
        ) : (
          <div className="space-y-4">
            {companyIncidents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((incident) => (
              <div
                key={incident.id}
                className="floating-panel p-6 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setViewIncident(incident)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(incident.status)}`}>
                        {incident.status.replace('-', ' ').toUpperCase()}
                      </span>
                      {incident.photos.length > 0 && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <Camera className="w-3 h-3 mr-1" />
                          {incident.photos.length} photo{incident.photos.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {incident.type}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {incident.description}
                    </p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(incident.date).toLocaleDateString()} {incident.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {incident.location}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {incident.reportedBy}
                      </div>
                      {incident.involvedPerson && (
                        <div className="flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {incident.involvedPerson}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Button */}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Incident Modal */}
        {showNewIncidentModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setShowNewIncidentModal(false)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2" />
                      Report New Incident
                    </h3>
                    <button
                      onClick={() => setShowNewIncidentModal(false)}
                      className="p-2 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Location & Job Site */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="e.g., Roof, Ladder, Ground level"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Job Site Address
                      </label>
                      <input
                        type="text"
                        value={formData.jobSite}
                        onChange={(e) => setFormData({ ...formData, jobSite: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="123 Main St, City"
                      />
                    </div>
                  </div>

                  {/* Severity & Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Severity *
                      </label>
                      <select
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value as Incident['severity'] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      >
                        <option value="near-miss">Near Miss</option>
                        <option value="first-aid">First Aid</option>
                        <option value="medical">Medical Attention</option>
                        <option value="serious">Serious / Hospitalization</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Incident Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select type...</option>
                        {INCIDENT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Incident Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="Describe what happened in detail..."
                    />
                  </div>

                  {/* Involved Person & Witnesses */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Involved Person
                      </label>
                      <input
                        type="text"
                        value={formData.involvedPerson}
                        onChange={(e) => setFormData({ ...formData, involvedPerson: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Employee name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Witnesses
                      </label>
                      <input
                        type="text"
                        value={formData.witnesses}
                        onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Names of witnesses"
                      />
                    </div>
                  </div>

                  {/* Photos */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photos / Evidence
                    </label>
                    <div className="space-y-3">
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowCameraModal(true)}
                          className="flex-1"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      {incidentPhotos.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {incidentPhotos.map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Incident ${idx + 1}`}
                              className="w-full h-20 object-cover rounded border border-gray-300"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Taken */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Immediate Actions Taken
                    </label>
                    <textarea
                      value={formData.actionsTaken}
                      onChange={(e) => setFormData({ ...formData, actionsTaken: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="What was done immediately after the incident?"
                    />
                  </div>

                  {/* Root Cause */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Root Cause Analysis
                    </label>
                    <textarea
                      value={formData.rootCause}
                      onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="What caused this incident?"
                    />
                  </div>

                  {/* Preventive Measures */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preventive Measures
                    </label>
                    <textarea
                      value={formData.preventiveMeasures}
                      onChange={(e) => setFormData({ ...formData, preventiveMeasures: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="How can we prevent this in the future?"
                    />
                  </div>

                  {/* Reported By */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reported By *
                    </label>
                    <input
                      type="text"
                      value={formData.reportedBy}
                      onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewIncidentModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateIncident} variant="danger" className="btn-glow">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Camera Modal */}
        {showCameraModal && (
          <CameraCapture
            onPhotoCapture={handlePhotoCapture}
            onClose={() => setShowCameraModal(false)}
          />
        )}

        {/* View Incident Modal */}
        {viewIncident && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setViewIncident(null)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 sticky top-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {viewIncident.type}
                      </h3>
                      <p className="text-sm text-red-100">
                        {new Date(viewIncident.date).toLocaleDateString()} at {viewIncident.time}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewIncident(null)}
                      className="text-white border-white hover:bg-red-500"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                  {/* Badges */}
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getSeverityColor(viewIncident.severity)}`}>
                      {viewIncident.severity.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(viewIncident.status)}`}>
                      {viewIncident.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-900">{viewIncident.description}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Location</h4>
                      <p className="text-gray-900">{viewIncident.location}</p>
                    </div>
                    {viewIncident.jobSite && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Job Site</h4>
                        <p className="text-gray-900">{viewIncident.jobSite}</p>
                      </div>
                    )}
                    {viewIncident.involvedPerson && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Involved Person</h4>
                        <p className="text-gray-900">{viewIncident.involvedPerson}</p>
                      </div>
                    )}
                    {viewIncident.witnesses && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Witnesses</h4>
                        <p className="text-gray-900">{viewIncident.witnesses}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Reported By</h4>
                      <p className="text-gray-900">{viewIncident.reportedBy}</p>
                    </div>
                  </div>

                  {/* Photos */}
                  {viewIncident.photos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Photos</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {viewIncident.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`Evidence ${idx + 1}`}
                            className="w-full h-40 object-cover rounded-lg border border-gray-300"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Taken */}
                  {viewIncident.actionsTaken && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Actions Taken</h4>
                      <p className="text-gray-900">{viewIncident.actionsTaken}</p>
                    </div>
                  )}

                  {/* Root Cause */}
                  {viewIncident.rootCause && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Root Cause</h4>
                      <p className="text-gray-900">{viewIncident.rootCause}</p>
                    </div>
                  )}

                  {/* Preventive Measures */}
                  {viewIncident.preventiveMeasures && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Preventive Measures</h4>
                      <p className="text-gray-900">{viewIncident.preventiveMeasures}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
