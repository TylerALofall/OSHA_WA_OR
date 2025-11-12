import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDaysUntilExpiration(expirationDate: string): number {
  const today = new Date();
  const expDate = new Date(expirationDate);
  const diffTime = expDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getExpirationStatus(daysUntilExpiration: number): {
  status: 'valid' | 'expiring_soon' | 'expiring_critical' | 'expired';
  color: string;
  label: string;
} {
  if (daysUntilExpiration < 0) {
    return { status: 'expired', color: 'red', label: 'Expired' };
  } else if (daysUntilExpiration <= 30) {
    return { status: 'expiring_critical', color: 'red', label: `${daysUntilExpiration} days` };
  } else if (daysUntilExpiration <= 90) {
    return { status: 'expiring_soon', color: 'orange', label: `${daysUntilExpiration} days` };
  } else {
    return { status: 'valid', color: 'green', label: 'Valid' };
  }
}

export function calculateTRIR(incidents: number, hoursWorked: number): number {
  // TRIR = (Number of recordable incidents × 200,000) / Total hours worked
  if (hoursWorked === 0) return 0;
  return Number(((incidents * 200000) / hoursWorked).toFixed(1));
}

export function calculateLTIR(lostTimeIncidents: number, hoursWorked: number): number {
  // LTIR = (Number of lost time incidents × 200,000) / Total hours worked
  if (hoursWorked === 0) return 0;
  return Number(((lostTimeIncidents * 200000) / hoursWorked).toFixed(1));
}

export function getCompanyColor(companyId: string): string {
  const colors: Record<string, string> = {
    'eagle-roofing': '#1E40AF',
    'central-oregon': '#059669',
    'palmer-roofing': '#DC2626',
  };
  return colors[companyId] || '#6B7280';
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high' | 'critical'): string {
  const colors = {
    low: '#6B7280',
    medium: '#F59E0B',
    high: '#F97316',
    critical: '#DC2626',
  };
  return colors[priority];
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    valid: '#10B981',
    expiring_soon: '#F59E0B',
    expiring_critical: '#EF4444',
    expired: '#DC2626',
    completed: '#10B981',
    in_progress: '#3B82F6',
    pending: '#6B7280',
    pass: '#10B981',
    fail: '#EF4444',
    pass_with_conditions: '#F59E0B',
  };
  return statusColors[status] || '#6B7280';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
