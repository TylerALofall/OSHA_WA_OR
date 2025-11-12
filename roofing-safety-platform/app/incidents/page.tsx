'use client';

import { Header } from '@/components/layout/Header';
import { AlertTriangle } from 'lucide-react';

export default function IncidentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <AlertTriangle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Incident Management</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Report, track, and investigate incidents and near-misses. Includes OSHA 300 logs,
            root cause analysis, and corrective action tracking.
          </p>
        </div>
      </main>
    </div>
  );
}
