'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';
import { safetyArticles } from '@/lib/data';
import Link from 'next/link';
import { useState } from 'react';

export default function SafetyResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(safetyArticles.map(a => a.category)))];

  // Filter articles
  const filteredArticles = safetyArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Resources</h1>
          <p className="text-gray-600">
            OSHA compliance guides, safety protocols, and best practices for roofing operations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/safety-resources/${article.slug}`}>
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant={
                        article.category === 'Fall Protection' || article.category === 'Compliance'
                          ? 'danger'
                          : article.category === 'Training'
                          ? 'info'
                          : article.category === 'PPE'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {article.category}
                    </Badge>
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} min read</span>
                    </div>
                    <span>{article.publishedDate}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Featured Resources Section */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-blue-600">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">OSHA Standards</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Federal, Oregon, and Washington regulations
                </p>
                <Link
                  href="/compliance"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Standards →
                </Link>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-600">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Toolbox Talks</h3>
                <p className="text-sm text-gray-600 mb-3">
                  15-minute safety meeting templates
                </p>
                <Link
                  href="/safety-resources?category=Training"
                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Browse Library →
                </Link>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-orange-600">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Checklists</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Daily inspections and safety briefings
                </p>
                <Link
                  href="/compliance"
                  className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                >
                  Download Forms →
                </Link>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-purple-600">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Training Materials</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Certification courses and videos
                </p>
                <Link
                  href="/training"
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Start Training →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
