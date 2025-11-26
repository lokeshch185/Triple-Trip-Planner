import React from 'react';
import { Train, Utensils, MapPin, DollarSign } from 'lucide-react';

const BudgetCards = ({ budget, totalBudget, tripDays }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Train size={20} />
          <span className="text-sm opacity-90">Transport</span>
        </div>
        <p className="text-2xl font-bold">₹{budget.transport}</p>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Utensils size={20} />
          <span className="text-sm opacity-90">Food</span>
        </div>
        <p className="text-2xl font-bold">₹{budget.food}</p>
        <p className="text-xs opacity-75 mt-1">₹{Math.round(budget.food / tripDays)}/day</p>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={20} />
          <span className="text-sm opacity-90">Activities</span>
        </div>
        <p className="text-2xl font-bold">₹{budget.activities}</p>
        <p className="text-xs opacity-75 mt-1">₹{Math.round(budget.activities / tripDays)}/day</p>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign size={20} />
          <span className="text-sm opacity-90">Total</span>
        </div>
        <p className="text-2xl font-bold">₹{totalBudget}</p>
        <p className="text-xs opacity-75 mt-1">₹{Math.round(totalBudget / tripDays)}/day</p>
      </div>
    </div>
  );
};

export default BudgetCards;

