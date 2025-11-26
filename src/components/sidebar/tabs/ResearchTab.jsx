import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const ResearchTab = ({ destination, tripName }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const researchLinks = [
    {
      title: 'Best Time to Visit',
      url: `https://www.google.com/search?q=best+time+to+visit+${encodeURIComponent(destination)}`,
      description: 'Find the best weather and seasons'
    },
    {
      title: 'Top Attractions',
      url: `https://www.google.com/search?q=top+attractions+in+${encodeURIComponent(destination)}`,
      description: 'Discover must-see places'
    },
    {
      title: 'Local Culture & Customs',
      url: `https://www.google.com/search?q=culture+and+customs+${encodeURIComponent(destination)}`,
      description: 'Learn about local traditions'
    },
    {
      title: 'Travel Tips',
      url: `https://www.google.com/search?q=travel+tips+${encodeURIComponent(destination)}`,
      description: 'Essential travel information'
    },
    {
      title: 'Budget Guide',
      url: `https://www.google.com/search?q=budget+travel+guide+${encodeURIComponent(destination)}`,
      description: 'Cost estimates and money-saving tips'
    },
    {
      title: 'Safety Information',
      url: `https://www.google.com/search?q=safety+travel+${encodeURIComponent(destination)}`,
      description: 'Travel safety and advisories'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' ' + destination)}`, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Research {destination}</h3>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Quick Research Links</h4>
        {researchLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">{link.title}</h5>
                <p className="text-xs text-gray-500 mt-1">{link.description}</p>
              </div>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 mt-1" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResearchTab;

