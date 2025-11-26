import React from 'react';
import { Calendar, Edit2, Save, FileText, Trash2 } from 'lucide-react';

const TripHeader = ({
  tripName,
  destination,
  startDate,
  endDate,
  tripDays,
  editingTrip,
  setEditingTrip,
  setTripName,
  setDestination,
  setStartDate,
  setEndDate,
  onExport,
  onClear
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          {editingTrip ? (
            <div className="space-y-2">
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 w-full"
                placeholder="Trip Name"
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-gray-500 w-full"
                placeholder="Destination"
              />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {tripName}
              </h1>
              <p className="text-gray-600">{destination || 'Plan your perfect getaway'}</p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditingTrip(!editingTrip)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {editingTrip ? <Save size={18} /> : <Edit2 size={18} />}
            {editingTrip ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <FileText size={18} />
            Export
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 size={18} />
            Clear
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="flex items-center gap-2">
            <Calendar className="text-purple-600" size={20} />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">{tripDays}</span> days trip
        </div>
      </div>
    </div>
  );
};

export default TripHeader;

