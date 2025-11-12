'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { GraduationCap } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <GraduationCap className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Training Module</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Online training courses, certification tracking, and progress monitoring.
            This module will include OSHA-compliant training materials, quizzes, and certificate generation.
          </p>
        </div>
      </main>
    </div>
  );
}
