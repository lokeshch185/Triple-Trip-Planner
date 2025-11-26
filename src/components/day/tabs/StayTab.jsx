import React from 'react';
import { Plus, Hotel, Edit2, Trash2 } from 'lucide-react';

const StayTab = ({ day, date, index, onAdd, onEdit, onDelete }) => {
  return (
    <div>
      <button
        onClick={() => onAdd(date)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
      >
        <Plus size={16} />
        Add Stay
      </button>
      <div className="space-y-3">
        {day.placesToStay?.length > 0 ? (
          day.placesToStay.map((stay, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Hotel size={18} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-800">{stay.hotel}</h3>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(date, idx)} className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => onDelete(date, idx)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {stay.checkIn && <p className="text-sm text-gray-600">Check-in: {stay.checkIn}</p>}
              {stay.checkOut && <p className="text-sm text-gray-600">Check-out: {stay.checkOut}</p>}
              {stay.address && <p className="text-sm text-gray-600">Address: {stay.address}</p>}
              {stay.phone && <p className="text-sm text-gray-600">Phone: {stay.phone}</p>}
              {stay.confirmationNo && <p className="text-sm text-gray-600">Confirmation: {stay.confirmationNo}</p>}
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-400">No stays added</p>
        )}
      </div>
      
      {/* Day Total from Timeline */}
      {day.timeline?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Day {index + 1} Total</span>
            <span className="text-lg font-bold text-gray-800">
              ₹{day.timeline.reduce((sum, item) => sum + (item.cost || 0), 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StayTab;

