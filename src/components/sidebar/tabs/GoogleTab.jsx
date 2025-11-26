import React from 'react';
import { Globe, ExternalLink, Search } from 'lucide-react';

const GoogleTab = ({ destination, tripName }) => {
  const googleSearches = [
    {
      title: 'Things to Do',
      query: `things to do in ${destination}`,
      icon: '🎯'
    },
    {
      title: 'Best Restaurants',
      query: `best restaurants in ${destination}`,
      icon: '🍽️'
    },
    {
      title: 'Hotels & Stays',
      query: `hotels in ${destination}`,
      icon: '🏨'
    },
    {
      title: 'Weather Forecast',
      query: `weather ${destination}`,
      icon: '🌤️'
    },
    {
      title: 'Travel Guide',
      query: `${destination} travel guide`,
      icon: '📖'
    },
    {
      title: 'Local Events',
      query: `events festivals ${destination}`,
      icon: '🎉'
    },
    {
      title: 'Shopping',
      query: `shopping in ${destination}`,
      icon: '🛍️'
    },
    {
      title: 'Nightlife',
      query: `nightlife ${destination}`,
      icon: '🌃'
    }
  ];

  const handleSearch = (query) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Search</h3>
        <p className="text-sm text-gray-600 mb-4">Quick searches for {destination}</p>
      </div>

      <div className="space-y-2">
        {googleSearches.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSearch(item.query)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group text-left"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xl">{item.icon}</span>
              <div>
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">{item.title}</h5>
                <p className="text-xs text-gray-500">{item.query}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Search size={14} className="text-gray-400 group-hover:text-blue-600" />
              <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(tripName + ' ' + destination)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          <Globe size={18} />
          <span>Search Everything About Trip</span>
        </a>
      </div>
    </div>
  );
};

export default GoogleTab;

