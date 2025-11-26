import React from 'react';
import { X } from 'lucide-react';

const ThingModal = ({ show, onClose, thingForm, setThingForm, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Add Thing to Do</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
              <input
                type="text"
                value={thingForm.name}
                onChange={(e) => setThingForm({ name: e.target.value })}
                placeholder="e.g., Water Sports"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && onSave()}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={onSave} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingModal;

