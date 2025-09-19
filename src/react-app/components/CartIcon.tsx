import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function CartIcon() {
  const { state, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-orange-100 rounded-full transition-colors duration-200 group"
    >
      <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-orange-600" />
      
      {state.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
          {state.itemCount > 99 ? '99+' : state.itemCount}
        </span>
      )}
    </button>
  );
}