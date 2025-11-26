import React from 'react';
import { X } from 'lucide-react';

const StayModal = ({ 
  show, 
  onClose, 
  stayForm, 
  setStayForm, 
  editingItem, 
  onSave, 
  onDelete 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {editingItem !== null ? 'Edit Stay' : 'Add Stay'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
              <input
                type="text"
                value={stayForm.hotel}
                onChange={(e) => setStayForm({ ...stayForm, hotel: e.target.value })}
                placeholder="e.g., Grand Plaza Hotel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                <input
                  type="time"
                  value={stayForm.checkIn}
                  onChange={(e) => setStayForm({ ...stayForm, checkIn: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                <input
                  type="time"
                  value={stayForm.checkOut}
                  onChange={(e) => setStayForm({ ...stayForm, checkOut: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={stayForm.address}
                onChange={(e) => setStayForm({ ...stayForm, address: e.target.value })}
                placeholder="Hotel address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={stayForm.phone}
                onChange={(e) => setStayForm({ ...stayForm, phone: e.target.value })}
                placeholder="Contact number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Number</label>
              <input
                type="text"
                value={stayForm.confirmationNo}
                onChange={(e) => setStayForm({ ...stayForm, confirmationNo: e.target.value })}
                placeholder="Booking reference"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              {editingItem !== null && (
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                {editingItem !== null ? 'Update' : 'Add'} Stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayModal;

