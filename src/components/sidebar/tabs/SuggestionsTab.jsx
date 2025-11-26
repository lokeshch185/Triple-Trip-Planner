import React, { useState } from 'react';
import { Lightbulb, Sparkles, TrendingUp, Star } from 'lucide-react';

const SuggestionsTab = ({ destination }) => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      type: 'popular',
      title: 'Visit Local Markets',
      description: 'Experience authentic local culture and find unique souvenirs',
      icon: '🛒'
    },
    {
      id: 2,
      type: 'hidden',
      title: 'Explore Off-the-Beaten Path',
      description: 'Discover lesser-known spots away from tourist crowds',
      icon: '🗺️'
    },
    {
      id: 3,
      type: 'food',
      title: 'Try Street Food',
      description: 'Sample authentic local cuisine from street vendors',
      icon: '🍜'
    },
    {
      id: 4,
      type: 'culture',
      title: 'Attend Cultural Events',
      description: 'Check local event calendars for festivals and performances',
      icon: '🎭'
    },
    {
      id: 5,
      type: 'nature',
      title: 'Sunrise/Sunset Spots',
      description: 'Find the best viewpoints for stunning sunrise or sunset',
      icon: '🌅'
    },
    {
      id: 6,
      type: 'photo',
      title: 'Instagram-Worthy Spots',
      description: 'Capture memorable photos at these photogenic locations',
      icon: '📸'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'popular':
        return <TrendingUp size={16} className="text-orange-500" />;
      case 'hidden':
        return <Sparkles size={16} className="text-purple-500" />;
      default:
        return <Star size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Lightbulb size={20} className="text-yellow-500" />
          Suggestions for {destination}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Personalized recommendations to enhance your trip experience
        </p>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{suggestion.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(suggestion.type)}
                  <h5 className="font-semibold text-gray-800">{suggestion.title}</h5>
                </div>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">Pro Tip</h5>
              <p className="text-sm text-gray-700">
                Check local tourism websites and ask locals for insider tips. They often know the best hidden gems!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsTab;

