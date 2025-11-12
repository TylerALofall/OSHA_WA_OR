import { Company, Location } from '../types';

export const companies: Company[] = [
  {
    id: 'eagle-roofing',
    name: 'Eagle Roofing Bend',
    location: 'Bend, Oregon',
    address: 'Bend, OR 97701',
    website: 'http://eagleroofingbend.com/',
    phone: '(541) 555-0100',
    email: 'info@eagleroofingbend.com',
    specialization: [
      'Commercial Flat Roofing',
      'PVC',
      'TPO',
      'Built-up Bituminous',
      'Membrane Roofing'
    ],
    yearsInBusiness: 30,
    employeeCount: 45,
    color: '#1E40AF', // Blue
  },
  {
    id: 'central-oregon',
    name: 'Central Oregon Roofing',
    location: 'Redmond, Oregon',
    address: '494 SW Veterans Way, Suite 8, Redmond, OR 97756',
    phone: '(541) 555-0200',
    email: 'contact@centraloregonroofing.com',
    specialization: [
      'Residential & Commercial',
      'Single-ply',
      'PVC',
      'Composition',
      'EPDM',
      'Metal'
    ],
    yearsInBusiness: 85,
    employeeCount: 62,
    color: '#059669', // Green
  },
  {
    id: 'palmer-roofing',
    name: 'Palmer Roofing',
    location: 'Kennewick, WA & Pendleton, OR',
    address: '722 N Hartford St, Kennewick, WA 99336',
    website: 'https://www.palmerroofing.net/',
    phone: '(509) 555-0300',
    email: 'info@palmerroofing.net',
    specialization: [
      'Residential & Commercial',
      'Asphalt Shingles',
      'Metal',
      'Tile',
      'TPO',
      'EPDM',
      'Gutters'
    ],
    yearsInBusiness: 55,
    employeeCount: 38,
    color: '#DC2626', // Red
  },
];

export const locations: Location[] = [
  {
    id: 'loc-eagle-bend',
    companyId: 'eagle-roofing',
    name: 'Bend Office',
    address: 'Eagle Roofing Bend',
    city: 'Bend',
    state: 'OR',
    zipCode: '97701',
    phone: '(541) 555-0100',
    activeCrew: 12,
    activeJobSites: 3,
  },
  {
    id: 'loc-central-redmond',
    companyId: 'central-oregon',
    name: 'Redmond Office',
    address: '494 SW Veterans Way, Suite 8',
    city: 'Redmond',
    state: 'OR',
    zipCode: '97756',
    phone: '(541) 555-0200',
    activeCrew: 15,
    activeJobSites: 5,
  },
  {
    id: 'loc-palmer-kennewick',
    companyId: 'palmer-roofing',
    name: 'Kennewick Office',
    address: '722 N Hartford St',
    city: 'Kennewick',
    state: 'WA',
    zipCode: '99336',
    phone: '(509) 555-0300',
    activeCrew: 8,
    activeJobSites: 2,
  },
  {
    id: 'loc-palmer-pendleton',
    companyId: 'palmer-roofing',
    name: 'Pendleton Office',
    address: '2505 NE Riverside Pl',
    city: 'Pendleton',
    state: 'OR',
    zipCode: '97801',
    phone: '(541) 555-0301',
    activeCrew: 10,
    activeJobSites: 4,
  },
];
