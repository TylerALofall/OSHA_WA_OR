import { Employee, Certification } from '../types';

// Helper function to calculate days until expiration and status
function getCertificationStatus(expirationDate: string): { status: Certification['status'], daysUntilExpiration: number } {
  const today = new Date();
  const expDate = new Date(expirationDate);
  const diffTime = expDate.getTime() - today.getTime();
  const daysUntilExpiration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let status: Certification['status'];
  if (daysUntilExpiration < 0) {
    status = 'expired';
  } else if (daysUntilExpiration <= 30) {
    status = 'expiring_critical';
  } else if (daysUntilExpiration <= 90) {
    status = 'expiring_soon';
  } else {
    status = 'valid';
  }

  return { status, daysUntilExpiration };
}

// Mock certifications for employees
const certifications: Certification[] = [
  // John Daniels - Eagle Roofing
  {
    id: 'cert-001',
    employeeId: 'emp-001',
    name: 'OSHA 30-Hour Construction',
    type: 'OSHA',
    issueDate: '2023-01-15',
    expirationDate: '2028-01-15',
    certificateNumber: 'OSHA-30-2023-001',
    ...getCertificationStatus('2028-01-15'),
  },
  {
    id: 'cert-002',
    employeeId: 'emp-001',
    name: 'Fall Protection Training',
    type: 'Fall Protection',
    issueDate: '2024-03-10',
    expirationDate: '2025-03-10',
    certificateNumber: 'FP-2024-001',
    ...getCertificationStatus('2025-03-10'),
  },
  {
    id: 'cert-003',
    employeeId: 'emp-001',
    name: 'Scaffold Competent Person',
    type: 'Scaffold',
    issueDate: '2023-06-20',
    expirationDate: '2025-06-20',
    certificateNumber: 'SCP-2023-001',
    ...getCertificationStatus('2025-06-20'),
  },
  {
    id: 'cert-004',
    employeeId: 'emp-001',
    name: 'First Aid & CPR',
    type: 'First Aid',
    issueDate: '2024-05-15',
    expirationDate: '2026-05-15',
    ...getCertificationStatus('2026-05-15'),
  },

  // Sarah Martinez - Eagle Roofing
  {
    id: 'cert-005',
    employeeId: 'emp-002',
    name: 'OSHA 10-Hour Construction',
    type: 'OSHA',
    issueDate: '2024-02-01',
    expirationDate: '2029-02-01',
    certificateNumber: 'OSHA-10-2024-005',
    ...getCertificationStatus('2029-02-01'),
  },
  {
    id: 'cert-006',
    employeeId: 'emp-002',
    name: 'Fall Protection Training',
    type: 'Fall Protection',
    issueDate: '2024-02-15',
    expirationDate: '2025-02-15',
    certificateNumber: 'FP-2024-002',
    ...getCertificationStatus('2025-02-15'),
  },
  {
    id: 'cert-007',
    employeeId: 'emp-002',
    name: 'Ladder Safety Certification',
    type: 'Ladder Safety',
    issueDate: '2024-01-10',
    expirationDate: '2025-01-10',
    ...getCertificationStatus('2025-01-10'),
  },

  // Mike Thompson - Central Oregon
  {
    id: 'cert-008',
    employeeId: 'emp-003',
    name: 'OSHA 30-Hour Construction',
    type: 'OSHA',
    issueDate: '2022-11-01',
    expirationDate: '2027-11-01',
    certificateNumber: 'OSHA-30-2022-008',
    ...getCertificationStatus('2027-11-01'),
  },
  {
    id: 'cert-009',
    employeeId: 'emp-003',
    name: 'Fall Protection Training',
    type: 'Fall Protection',
    issueDate: '2024-04-01',
    expirationDate: '2025-04-01',
    certificateNumber: 'FP-2024-003',
    ...getCertificationStatus('2025-04-01'),
  },
  {
    id: 'cert-010',
    employeeId: 'emp-003',
    name: 'Hot Work Certification',
    type: 'Hot Work',
    issueDate: '2023-09-15',
    expirationDate: '2025-09-15',
    ...getCertificationStatus('2025-09-15'),
  },
  {
    id: 'cert-011',
    employeeId: 'emp-003',
    name: 'CPR & AED',
    type: 'CPR',
    issueDate: '2024-06-01',
    expirationDate: '2026-06-01',
    ...getCertificationStatus('2026-06-01'),
  },

  // Critical expirations for demo
  {
    id: 'cert-012',
    employeeId: 'emp-004',
    name: 'Fall Protection Training',
    type: 'Fall Protection',
    issueDate: '2024-01-01',
    expirationDate: '2024-12-15', // Expiring in ~1 month
    certificateNumber: 'FP-2024-004',
    ...getCertificationStatus('2024-12-15'),
  },
  {
    id: 'cert-013',
    employeeId: 'emp-005',
    name: 'OSHA 10-Hour Construction',
    type: 'OSHA',
    issueDate: '2023-12-01',
    expirationDate: '2024-11-20', // Expired
    certificateNumber: 'OSHA-10-2023-013',
    ...getCertificationStatus('2024-11-20'),
  },
];

export const employees: Employee[] = [
  // Eagle Roofing Bend
  {
    id: 'emp-001',
    firstName: 'John',
    lastName: 'Daniels',
    email: 'john.daniels@eagleroofingbend.com',
    phone: '(541) 555-1001',
    companyId: 'eagle-roofing',
    locationId: 'loc-eagle-bend',
    position: 'Crew Supervisor',
    role: 'supervisor',
    hireDate: '2019-03-15',
    certifications: certifications.filter(c => c.employeeId === 'emp-001'),
    emergencyContact: {
      name: 'Mary Daniels',
      relationship: 'Spouse',
      phone: '(541) 555-1002',
    },
  },
  {
    id: 'emp-002',
    firstName: 'Sarah',
    lastName: 'Martinez',
    email: 'sarah.martinez@eagleroofingbend.com',
    phone: '(541) 555-1003',
    companyId: 'eagle-roofing',
    locationId: 'loc-eagle-bend',
    position: 'Roofing Technician',
    role: 'worker',
    hireDate: '2021-06-01',
    certifications: certifications.filter(c => c.employeeId === 'emp-002'),
    emergencyContact: {
      name: 'Carlos Martinez',
      relationship: 'Brother',
      phone: '(541) 555-1004',
    },
  },
  {
    id: 'emp-003',
    firstName: 'Mike',
    lastName: 'Thompson',
    email: 'mike.thompson@centraloregonroofing.com',
    phone: '(541) 555-2001',
    companyId: 'central-oregon',
    locationId: 'loc-central-redmond',
    position: 'Lead Roofer',
    role: 'crew_lead',
    hireDate: '2018-01-20',
    certifications: certifications.filter(c => c.employeeId === 'emp-003'),
    emergencyContact: {
      name: 'Jennifer Thompson',
      relationship: 'Spouse',
      phone: '(541) 555-2002',
    },
  },
  {
    id: 'emp-004',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@centraloregonroofing.com',
    phone: '(541) 555-2003',
    companyId: 'central-oregon',
    locationId: 'loc-central-redmond',
    position: 'Roofing Specialist',
    role: 'worker',
    hireDate: '2020-09-10',
    certifications: certifications.filter(c => c.employeeId === 'emp-004'),
    emergencyContact: {
      name: 'Lisa Wilson',
      relationship: 'Mother',
      phone: '(541) 555-2004',
    },
  },
  {
    id: 'emp-005',
    firstName: 'Travis',
    lastName: 'Nelson',
    email: 'travis.nelson@palmerroofing.net',
    phone: '(509) 555-3001',
    companyId: 'palmer-roofing',
    locationId: 'loc-palmer-kennewick',
    position: 'Site Manager',
    role: 'manager',
    hireDate: '2017-05-15',
    certifications: certifications.filter(c => c.employeeId === 'emp-005'),
    emergencyContact: {
      name: 'Rachel Nelson',
      relationship: 'Spouse',
      phone: '(509) 555-3002',
    },
  },
  {
    id: 'emp-006',
    firstName: 'Michael',
    lastName: 'Boodt',
    email: 'michael.boodt@palmerroofing.net',
    phone: '(541) 555-3003',
    companyId: 'palmer-roofing',
    locationId: 'loc-palmer-pendleton',
    position: 'Operations Manager',
    role: 'manager',
    hireDate: '2016-08-01',
    certifications: [],
    emergencyContact: {
      name: 'Sarah Boodt',
      relationship: 'Spouse',
      phone: '(541) 555-3004',
    },
  },
  {
    id: 'emp-007',
    firstName: 'James',
    lastName: 'Rodriguez',
    email: 'james.rodriguez@eagleroofingbend.com',
    phone: '(541) 555-1005',
    companyId: 'eagle-roofing',
    locationId: 'loc-eagle-bend',
    position: 'Commercial Roofer',
    role: 'worker',
    hireDate: '2022-02-15',
    certifications: [],
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Spouse',
      phone: '(541) 555-1006',
    },
  },
  {
    id: 'emp-008',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@centraloregonroofing.com',
    phone: '(541) 555-2005',
    companyId: 'central-oregon',
    locationId: 'loc-central-redmond',
    position: 'Metal Fabricator',
    role: 'worker',
    hireDate: '2019-11-01',
    certifications: [],
    emergencyContact: {
      name: 'Linda Chen',
      relationship: 'Mother',
      phone: '(541) 555-2006',
    },
  },
];

export { certifications };
