import React from 'react';
import { Plus, Clock, Utensils, MapPin, Hotel, Train, Edit2, Trash2 } from 'lucide-react';

const TimelineTab = ({ day, date, onAdd, onEdit, onDelete }) => {
  return (
    <div>
      <button
        onClick={() => onAdd(date)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
      >
        <Plus size={16} />
        Add Timeline Item
      </button>
      <div className="space-y-3">
        {day.timeline?.length > 0 ? (
          day.timeline.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-colors border border-gray-200 group"
            >
              <div className="flex items-center gap-2 min-w-24">
                <Clock size={16} className="text-gray-600" />
                <span className="font-semibold text-gray-800">{item.time}</span>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {item.type === 'food' && <Utensils size={18} className="text-orange-600" />}
                  {item.type === 'activity' && <MapPin size={18} className="text-purple-600" />}
                  {item.type === 'stay' && <Hotel size={18} className="text-blue-600" />}
                  {item.type === 'transport' && <Train size={18} className="text-green-600" />}
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
                {item.notes && <p className="text-xs text-gray-500 mt-1">{item.notes}</p>}
              </div>
              {item.cost > 0 && (
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">₹{item.cost}</span>
                </div>
              )}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(date, idx)} className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(date, idx)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Clock size={48} className="mx-auto mb-2 opacity-50" />
            <p>No timeline items</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineTab;

