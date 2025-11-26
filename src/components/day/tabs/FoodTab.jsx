import React from 'react';
import { Plus, Utensils, Trash2 } from 'lucide-react';

const FoodTab = ({ day, date, onAdd, onDelete }) => {
  return (
    <div>
      <button
        onClick={() => onAdd(date)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm"
      >
        <Plus size={16} />
        Add Food Place
      </button>
      <div className="space-y-2">
        {day.foodToEat?.length > 0 ? (
          day.foodToEat.map((food, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 group">
              <div className="flex items-center gap-2">
                <Utensils size={16} className="text-orange-600" />
                <span className="font-medium">{food.place}</span>
              </div>
              <button onClick={() => onDelete(date, idx)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-400">No food places added</p>
        )}
      </div>
    </div>
  );
};

export default FoodTab;

