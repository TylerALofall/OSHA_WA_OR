'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  ClipboardCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { useCompany } from '@/lib/context/CompanyContext';
import {
  saveChecklist,
  getChecklists,
  generateId
} from '@/lib/utils/storage';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  notes?: string;
}

interface Checklist {
  id: string;
  companyId: string;
  type: 'oregon' | 'washington' | 'prejob' | 'daily' | 'equipment';
  title: string;
  date: string;
  jobSite: string;
  inspector: string;
  items: ChecklistItem[];
  completedBy?: string;
  status: 'incomplete' | 'complete';
}

// Oregon OSHA Requirements (6 ft fall protection)
const OREGON_CHECKLIST_ITEMS: Omit<ChecklistItem, 'id' | 'checked' | 'notes'>[] = [
  { label: 'Fall protection required when working 6 feet or more above lower level' },
  { label: 'Personal fall arrest systems inspected and in good condition' },
  { label: 'Guardrail systems installed where required (42" high with midrail and toeboard)' },
  { label: 'Safety net systems properly installed if applicable' },
  { label: 'Warning line systems in place for low-slope roofs' },
  { label: 'Roof holes and openings covered or guarded' },
  { label: 'Ladders extend 3 feet above landing surface' },
  { label: 'Ladder tie-offs secure and inspected' },
  { label: 'Roof access points clearly marked and safe' },
  { label: 'Weather conditions safe for roofing work (wind, rain, ice)' },
];

// Washington OSHA Requirements (4 ft steep-pitch + safety watch)
const WASHINGTON_CHECKLIST_ITEMS: Omit<ChecklistItem, 'id' | 'checked' | 'notes'>[] = [
  { label: 'Fall protection required for steep roofs (>4:12 pitch) at 4 feet or more' },
  { label: 'Safety watch person designated and positioned' },
  { label: 'All workers within visual/audio contact of safety watch' },
  { label: 'Personal fall arrest systems meet WAC 296-880 standards' },
  { label: 'Anchor points rated for 5,000 lbs per person attached' },
  { label: 'Full body harnesses (NOT body belts) worn by all workers' },
  { label: 'D-ring attachment between shoulder blades' },
  { label: 'Slide guards inspected and properly secured' },
  { label: 'Toe boards installed on steep pitches' },
  { label: 'Emergency rescue plan in place and communicated' },
];

// Pre-Job Safety Briefing
const PREJOB_CHECKLIST_ITEMS: Omit<ChecklistItem, 'id' | 'checked' | 'notes'>[] = [
  { label: 'Job site hazards identified and discussed' },
  { label: 'Fall protection plan reviewed with crew' },
  { label: 'Emergency procedures and contacts posted' },
  { label: 'First aid kit location identified' },
  { label: 'Weather forecast reviewed (cancel if unsafe)' },
  { label: 'All crew members have required certifications' },
  { label: 'Personal protective equipment (PPE) verified for all workers' },
  { label: 'Tool and equipment inspection completed' },
  { label: 'Communication methods established' },
  { label: 'Homeowner contact info confirmed' },
];

// Daily Equipment Inspection
const EQUIPMENT_CHECKLIST_ITEMS: Omit<ChecklistItem, 'id' | 'checked' | 'notes'>[] = [
  { label: 'Ladders: no cracks, bends, or missing rungs' },
  { label: 'Harnesses: no fraying, cuts, or excessive wear' },
  { label: 'Lanyards: shock absorbers intact, no damage' },
  { label: 'Anchor points: secure and properly rated' },
  { label: 'Ropes: no fraying or degradation' },
  { label: 'Carabiners: spring-loaded gates function properly' },
  { label: 'Roof jacks: secure mounting, no rust or damage' },
  { label: 'Scaffolding: properly assembled and level' },
  { label: 'Power tools: cords intact, safety guards in place' },
  { label: 'All equipment tagged with last inspection date' },
];

export default function SafetyPage() {
  const { selectedCompany } = useCompany();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [showNewChecklistModal, setShowNewChecklistModal] = useState(false);
  const [selectedType, setSelectedType] = useState<Checklist['type']>('oregon');
  const [viewChecklist, setViewChecklist] = useState<Checklist | null>(null);
  const [formData, setFormData] = useState({
    jobSite: '',
    inspector: '',
  });

  useEffect(() => {
    const loadedChecklists = getChecklists();
    setChecklists(loadedChecklists);
  }, []);

  const companyChecklists = checklists.filter(
    (checklist) => checklist.companyId === selectedCompany.id
  );

  const getChecklistTemplate = (type: Checklist['type']) => {
    switch (type) {
      case 'oregon':
        return { title: 'Oregon OSHA Compliance Checklist', items: OREGON_CHECKLIST_ITEMS };
      case 'washington':
        return { title: 'Washington OSHA Compliance Checklist', items: WASHINGTON_CHECKLIST_ITEMS };
      case 'prejob':
        return { title: 'Pre-Job Safety Briefing', items: PREJOB_CHECKLIST_ITEMS };
      case 'equipment':
        return { title: 'Daily Equipment Inspection', items: EQUIPMENT_CHECKLIST_ITEMS };
      default:
        return { title: 'Daily Safety Checklist', items: [] };
    }
  };

  const handleCreateChecklist = () => {
    if (!formData.jobSite || !formData.inspector) {
      alert('Please enter job site and inspector name');
      return;
    }

    const template = getChecklistTemplate(selectedType);
    const newChecklist: Checklist = {
      id: generateId(),
      companyId: selectedCompany.id,
      type: selectedType,
      title: template.title,
      date: new Date().toISOString(),
      jobSite: formData.jobSite,
      inspector: formData.inspector,
      items: template.items.map((item) => ({
        id: generateId(),
        label: item.label,
        checked: false,
        notes: '',
      })),
      status: 'incomplete',
    };

    saveChecklist(newChecklist);
    setChecklists([...checklists, newChecklist]);
    setShowNewChecklistModal(false);
    setViewChecklist(newChecklist);
    setFormData({ jobSite: '', inspector: '' });
  };

  const updateChecklistItem = (checklistId: string, itemId: string, updates: Partial<ChecklistItem>) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        );
        const allChecked = updatedItems.every((item) => item.checked);
        return {
          ...checklist,
          items: updatedItems,
          status: (allChecked ? 'complete' : 'incomplete') as 'complete' | 'incomplete',
        };
      }
      return checklist;
    });

    setChecklists(updatedChecklists);
    if (viewChecklist && viewChecklist.id === checklistId) {
      setViewChecklist(updatedChecklists.find((c) => c.id === checklistId) || null);
    }

    // Update localStorage
    localStorage.setItem('roofing_safety_checklists', JSON.stringify(updatedChecklists));
  };

  const getStateForCompany = () => {
    // Based on company location - you can make this more sophisticated
    if (selectedCompany.name.includes('Oregon') || selectedCompany.name.includes('Bend') || selectedCompany.name.includes('Central')) {
      return 'Oregon';
    }
    return 'Washington';
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
                OSHA Safety Checklists
              </h1>
              <p className="text-gray-600">
                {selectedCompany.name} - {getStateForCompany()} Compliance
              </p>
            </div>
            <Button
              onClick={() => setShowNewChecklistModal(true)}
              size="lg"
              className="btn-glow"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Checklist
            </Button>
          </div>

          {/* State-Specific Warning */}
          <div className="alert-warning p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-orange-900 mb-1">
                {getStateForCompany()} State Requirements
              </p>
              <p className="text-sm text-orange-800">
                {getStateForCompany() === 'Oregon'
                  ? 'Fall protection required at 6 feet. Slide guards NOT required by state law.'
                  : 'Fall protection required at 4 feet for steep roofs (>4:12 pitch). Safety watch system required. Slide guards must be inspected.'}
              </p>
            </div>
          </div>
        </div>

        {/* Checklists List */}
        {companyChecklists.length === 0 ? (
          <EmptyState
            icon={<ClipboardCheck className="w-12 h-12 text-gray-400" />}
            title="No Safety Checklists Yet"
            description="Create your first OSHA compliance checklist to ensure crew safety and regulatory compliance."
            actionLabel="Create First Checklist"
            onAction={() => setShowNewChecklistModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyChecklists.map((checklist) => {
              const completedItems = checklist.items.filter((item) => item.checked).length;
              const totalItems = checklist.items.length;
              const completionPercentage = Math.round((completedItems / totalItems) * 100);

              return (
                <div
                  key={checklist.id}
                  className="floating-panel p-6 animate-fade-in cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setViewChecklist(checklist)}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`cert-badge ${
                        checklist.status === 'complete' ? 'valid' : 'expiring'
                      } text-xs`}
                    >
                      {checklist.status === 'complete' ? (
                        <>
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Complete
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 inline mr-1" />
                          Incomplete
                        </>
                      )}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(checklist.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Checklist Info */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {checklist.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Job Site:</strong> {checklist.jobSite}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Inspector:</strong> {checklist.inspector}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          completionPercentage === 100
                            ? 'bg-green-600'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Item Count */}
                  <p className="text-xs text-gray-500">
                    {completedItems} of {totalItems} items completed
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* New Checklist Modal */}
        {showNewChecklistModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setShowNewChecklistModal(false)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ClipboardCheck className="w-6 h-6 mr-2 text-blue-600" />
                  Create New Checklist
                </h3>

                <div className="space-y-4">
                  {/* Checklist Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Checklist Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as Checklist['type'])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="oregon">Oregon OSHA Compliance</option>
                      <option value="washington">Washington OSHA Compliance</option>
                      <option value="prejob">Pre-Job Safety Briefing</option>
                      <option value="equipment">Equipment Inspection</option>
                    </select>
                  </div>

                  {/* Job Site */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Site Address
                    </label>
                    <input
                      type="text"
                      value={formData.jobSite}
                      onChange={(e) => setFormData({ ...formData, jobSite: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="123 Main St, City, State"
                    />
                  </div>

                  {/* Inspector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inspector Name
                    </label>
                    <input
                      type="text"
                      value={formData.inspector}
                      onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewChecklistModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateChecklist} className="btn-glow">
                    Create Checklist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View/Edit Checklist Modal */}
        {viewChecklist && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setViewChecklist(null)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {viewChecklist.title}
                      </h3>
                      <p className="text-sm text-blue-100">
                        {viewChecklist.jobSite} • {new Date(viewChecklist.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewChecklist(null)}
                      className="text-white border-white hover:bg-blue-500"
                    >
                      Close
                    </Button>
                  </div>
                </div>

                {/* Checklist Items */}
                <div className="px-6 py-6 max-h-[60vh] overflow-y-auto space-y-3">
                  {viewChecklist.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) =>
                            updateChecklistItem(viewChecklist.id, item.id, {
                              checked: e.target.checked,
                            })
                          }
                          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            {item.label}
                          </label>
                          <input
                            type="text"
                            value={item.notes || ''}
                            onChange={(e) =>
                              updateChecklistItem(viewChecklist.id, item.id, {
                                notes: e.target.value,
                              })
                            }
                            placeholder="Add notes..."
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <strong>Inspector:</strong> {viewChecklist.inspector}
                  </div>
                  <div className="flex items-center space-x-2">
                    {viewChecklist.status === 'complete' ? (
                      <div className="alert-success px-4 py-2 rounded-lg flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-semibold text-green-900">
                          Checklist Complete
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-orange-600 font-medium">
                        Complete all items to finish
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
