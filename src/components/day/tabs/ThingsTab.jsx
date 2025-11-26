import React from 'react';
import { Plus, MapPin, Trash2 } from 'lucide-react';

const ThingsTab = ({ day, date, onAdd, onDelete }) => {
  return (
    <div>
      <button
        onClick={() => onAdd(date)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
      >
        <Plus size={16} />
        Add Activity
      </button>
      <div className="space-y-2">
        {day.thingsToDo?.length > 0 ? (
          day.thingsToDo.map((thing, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 group">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-600" />
                <span className="font-medium">{thing}</span>
              </div>
              <button onClick={() => onDelete(date, idx)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-400">No activities added</p>
        )}
      </div>
    </div>
  );
};

export default ThingsTab;

