// Local storage utilities for data persistence

const STORAGE_KEYS = {
  EMPLOYEES: 'roofing_safety_employees',
  CERTIFICATIONS: 'roofing_safety_certifications',
  INCIDENTS: 'roofing_safety_incidents',
  CHECKLISTS: 'roofing_safety_checklists',
} as const;

// Employee storage
export const saveEmployee = (employee: any) => {
  const employees = getEmployees();
  employees.push(employee);
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
};

export const getEmployees = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  return data ? JSON.parse(data) : [];
};

export const updateEmployee = (id: string, updates: any) => {
  const employees = getEmployees();
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }
};

export const deleteEmployee = (id: string) => {
  const employees = getEmployees().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
};

// Certificate storage
export const saveCertificate = (certificate: any) => {
  const certs = getCertificates();
  certs.push(certificate);
  localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certs));
};

export const getCertificates = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
  return data ? JSON.parse(data) : [];
};

// Incident storage
export const saveIncident = (incident: any) => {
  const incidents = getIncidents();
  incidents.push(incident);
  localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
};

export const getIncidents = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
  return data ? JSON.parse(data) : [];
};

// Checklist storage
export const saveChecklist = (checklist: any) => {
  const checklists = getChecklists();
  checklists.push(checklist);
  localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
};

export const getChecklists = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
  return data ? JSON.parse(data) : [];
};

// Generate unique IDs
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// File to base64 conversion
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
