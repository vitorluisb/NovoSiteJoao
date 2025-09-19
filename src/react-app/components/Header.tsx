import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Heart, Phone } from 'lucide-react';
import CartIcon from './CartIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Loja', href: '/loja' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleWhatsApp = () => {
    window.open('https://wa.me/5583999511219?text=Olá! Gostaria de saber mais sobre os serviços do Clube dos Bichos.', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-500">
                Clube dos Bichos
              </h1>
              <p className="text-xs text-amber-800 font-medium">Amor & Cuidado</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-orange-100 text-orange-600 shadow-md'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart, WhatsApp Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            <button
              onClick={handleWhatsApp}
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleWhatsApp}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-3 rounded-lg font-medium mt-4"
              >
                <Phone className="w-4 h-4" />
                <span>Contato via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
