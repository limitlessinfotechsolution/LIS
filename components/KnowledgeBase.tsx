'use client'

import { useState } from 'react'
import { FaSearch, FaBook, FaThumbsUp, FaThumbsDown, FaChevronRight } from 'react-icons/fa'

interface Article {
  id: string
  title: string
  category: string
  content: string
  views: number
  helpful: number
  notHelpful: number
}

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'features', name: 'Features', count: 12 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 6 },
    { id: 'billing', name: 'Billing', count: 4 }
  ]

  const articles: Article[] = [
    {
      id: '1',
      title: 'How to get started with our platform',
      category: 'getting-started',
      content: 'Complete guide to getting started...',
      views: 1234,
      helpful: 89,
      notHelpful: 5
    },
    {
      id: '2',
      title: 'Understanding our pricing plans',
      category: 'billing',
      content: 'Detailed explanation of pricing...',
      views: 987,
      helpful: 76,
      notHelpful: 8
    },
    {
      id: '3',
      title: 'How to integrate with third-party services',
      category: 'features',
      content: 'Step-by-step integration guide...',
      views: 756,
      helpful: 65,
      notHelpful: 3
    },
    {
      id: '4',
      title: 'Troubleshooting common issues',
      category: 'troubleshooting',
      content: 'Solutions to common problems...',
      views: 654,
      helpful: 54,
      notHelpful: 7
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleVote = async (articleId: string, helpful: boolean) => {
    await fetch('/api/kb/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, helpful })
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {!selectedArticle ? (
        <>
          {/* Header */}
          <div className="text-center mb-12">
            <FaBook className="text-5xl text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
            <p className="text-gray-600 text-lg">Find answers to your questions</p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 rounded-lg text-lg focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Categories */}
            <div className="md:col-span-1">
              <h2 className="font-bold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 rounded-lg text-left flex justify-between items-center ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Articles */}
            <div className="md:col-span-3">
              <h2 className="font-bold mb-4">
                {filteredArticles.length} Articles Found
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No articles found. Try a different search term.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="w-full p-6 bg-white rounded-lg shadow hover:shadow-lg transition text-left"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>{article.views} views</span>
                            <span>
                              {Math.round((article.helpful / (article.helpful + article.notHelpful)) * 100)}% helpful
                            </span>
                          </div>
                        </div>
                        <FaChevronRight className="text-gray-400 mt-2" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Article View */
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-blue-600 hover:underline"
          >
            ← Back to articles
          </button>

          <article className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold mb-4">{selectedArticle.title}</h1>
            
            <div className="flex gap-4 text-sm text-gray-600 mb-8 pb-8 border-b">
              <span>{selectedArticle.views} views</span>
              <span>Category: {selectedArticle.category}</span>
            </div>

            <div className="prose max-w-none mb-8">
              <p>{selectedArticle.content}</p>
              {/* In production, render full article content */}
            </div>

            <div className="border-t pt-8">
              <h3 className="font-semibold mb-4">Was this article helpful?</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleVote(selectedArticle.id, true)}
                  className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2"
                >
                  <FaThumbsUp />
                  Yes ({selectedArticle.helpful})
                </button>
                <button
                  onClick={() => handleVote(selectedArticle.id, false)}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                >
                  <FaThumbsDown />
                  No ({selectedArticle.notHelpful})
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
