import React from 'react';
import { Plus, MapPin, Trash2 } from 'lucide-react';

const PlacesTab = ({ day, date, onAdd, onDelete }) => {
  return (
    <div>
      <button
        onClick={() => onAdd(date)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
      >
        <Plus size={16} />
        Add Place
      </button>
      <div className="space-y-2">
        {day.placesToGo?.length > 0 ? (
          day.placesToGo.map((place, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 group">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                <span className="font-medium">{place}</span>
              </div>
              <button onClick={() => onDelete(date, idx)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-400">No places added</p>
        )}
      </div>
    </div>
  );
};

export default PlacesTab;

