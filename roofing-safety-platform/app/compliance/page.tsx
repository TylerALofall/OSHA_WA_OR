'use client';

import { Header } from '@/components/layout/Header';
import { ClipboardCheck } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ClipboardCheck className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compliance Management</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            OSHA checklists, inspection forms, and compliance tracking for Oregon and Washington.
            Includes daily jobsite inspections, pre-job briefings, and audit documentation.
          </p>
        </div>
      </main>
    </div>
  );
}
