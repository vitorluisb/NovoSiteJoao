import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    closeCart, 
    generateWhatsAppMessage 
  } = useCart();

  const { items, isOpen, total } = state;

  const handleWhatsAppOrder = () => {
    try {
      const message = generateWhatsAppMessage();
      const phoneNumber = '5583999511219';
      
      // Usar o formato que funcionou (WhatsApp Web)
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
      console.log('Mensagem gerada:', message);
      console.log('URL WhatsApp:', whatsappUrl);
      
      window.open(whatsappUrl, '_blank');
      
      clearCart();
      closeCart();
    } catch (error) {
      console.error('Erro ao processar pedido WhatsApp:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-orange-50">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Meu Carrinho</h2>
              {state.itemCount > 0 && (
                <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                  {state.itemCount}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Seu carrinho está vazio
                </h3>
                <p className="text-gray-500 mb-6">
                  Adicione alguns produtos incríveis para seu pet!
                </p>
                <button
                  onClick={closeCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-orange-600 font-bold">
                          R$ {item.price.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200 group"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                          </button>
                        </div>
                        
                        {/* Subtotal */}
                        <div className="mt-2 text-right">
                          <span className="text-sm text-gray-600">Subtotal: </span>
                          <span className="font-bold text-gray-900">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-orange-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Finalizar no WhatsApp</span>
                </button>
                

                
                <div className="flex space-x-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={closeCart}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
              
              {/* Info */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Você será redirecionado para o WhatsApp para finalizar seu pedido
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}