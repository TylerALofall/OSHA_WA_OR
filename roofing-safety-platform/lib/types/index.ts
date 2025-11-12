// Type definitions for the Roofing Safety Management Platform

export interface Company {
  id: string;
  name: string;
  location: string;
  address: string;
  website?: string;
  phone?: string;
  specialization: string[];
  yearsInBusiness: number;
  employeeCount: number;
  logoUrl?: string;
  color: string; // Brand color
}

export interface Location {
  id: string;
  companyId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  activeCrew: number;
  activeJobSites: number;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyId: string;
  locationId: string;
  position: string;
  role: 'admin' | 'manager' | 'supervisor' | 'crew_lead' | 'worker';
  hireDate: string;
  photoUrl?: string;
  certifications: Certification[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Certification {
  id: string;
  employeeId: string;
  name: string;
  type: 'OSHA' | 'Fall Protection' | 'First Aid' | 'CPR' | 'Scaffold' | 'Forklift' | 'Confined Space' | 'Hot Work' | 'Ladder Safety' | 'Other';
  issueDate: string;
  expirationDate: string;
  certificateNumber?: string;
  status: 'valid' | 'expiring_soon' | 'expiring_critical' | 'expired';
  daysUntilExpiration: number;
}

export interface Incident {
  id: string;
  companyId: string;
  locationId: string;
  jobSiteId?: string;
  date: string;
  time: string;
  type: 'injury' | 'illness' | 'near_miss' | 'property_damage' | 'environmental';
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  employeeId: string;
  description: string;
  immediateCause: string;
  bodyPartAffected?: string;
  witnessIds: string[];
  reportedBy: string;
  investigationStatus: 'pending' | 'in_progress' | 'completed';
  investigationDueDate: string;
  photos?: string[];
  correctiveActions: CorrectiveAction[];
}

export interface CorrectiveAction {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedDate?: string;
}

export interface TrainingCourse {
  id: string;
  name: string;
  description: string;
  duration: number; // hours
  type: 'OSHA' | 'Fall Protection' | 'Safety' | 'Equipment' | 'Compliance';
  requiredFor: string[]; // positions
  expirationMonths: number;
  modules: TrainingModule[];
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: number; // minutes
  content: string;
  completed?: boolean;
}

export interface TrainingRecord {
  id: string;
  employeeId: string;
  courseId: string;
  startDate: string;
  completionDate?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'expired';
  score?: number;
  certificateUrl?: string;
}

export interface SafetyAlert {
  id: string;
  companyId?: string; // undefined means all companies
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'weather' | 'regulatory' | 'equipment' | 'incident' | 'training' | 'compliance';
  title: string;
  message: string;
  createdAt: string;
  expiresAt?: string;
  actionRequired: boolean;
  read: boolean;
}

export interface SafetyArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Fall Protection' | 'Ladder Safety' | 'PPE' | 'Training' | 'Heat Safety' | 'Compliance' | 'Incident Response' | 'Equipment' | 'Weather' | 'General';
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: number; // minutes
  tags: string[];
  relatedArticles: string[];
}

export interface JobSite {
  id: string;
  companyId: string;
  locationId: string;
  name: string;
  address: string;
  projectType: string;
  roofType: 'low_slope' | 'steep_pitch';
  height: number; // feet
  startDate: string;
  estimatedEndDate: string;
  status: 'planning' | 'active' | 'suspended' | 'completed';
  assignedCrew: string[]; // employee IDs
  competentPerson: string; // employee ID
  fallProtectionPlan: string;
  hazards: string[];
  emergencyContacts: {
    hospital: string;
    address: string;
    distance: string;
    phone: string;
  };
}

export interface SafetyMetrics {
  companyId?: string; // undefined means aggregate all companies
  period: 'week' | 'month' | 'quarter' | 'year';
  hoursWorked: number;
  incidentCount: number;
  lostTimIncidents: number;
  nearMisses: number;
  trir: number; // Total Recordable Incident Rate
  ltir: number; // Lost Time Incident Rate
  daysWithoutIncident: number;
  compliancePercentage: number;
  trainingCompletionRate: number;
  activeCertifications: number;
  expiringCertifications: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  required: boolean;
  notes?: string;
}

export interface DailyInspection {
  id: string;
  jobSiteId: string;
  date: string;
  inspector: string; // employee ID
  weatherConditions: {
    temperature: number;
    windSpeed: number;
    precipitation: string;
    visibility: string;
  };
  fallProtection: ChecklistItem[];
  ladders: ChecklistItem[];
  scaffolds: ChecklistItem[];
  ppe: ChecklistItem[];
  housekeeping: ChecklistItem[];
  hazardsIdentified: string[];
  correctiveActions: string[];
  overallStatus: 'pass' | 'pass_with_conditions' | 'fail';
  signature: string;
}
