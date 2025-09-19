import { Heart, MapPin, Clock, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5583999511219?text=Olá! Gostaria de saber mais sobre os serviços do Clube dos Bichos.', '_blank');
  };

  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Clube dos Bichos</h3>
                <p className="text-orange-200 font-medium">Amor & Cuidado</p>
              </div>
            </div>
            <p className="text-orange-100 mb-6 max-w-md leading-relaxed">
              Há mais de 10 anos cuidando dos seus amigos de quatro patas com muito amor, carinho e profissionalismo. 
              Seu pet merece o melhor, e é isso que oferecemos todos os dias.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-200">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-orange-100 text-sm">Rui Barbosa, 367</p>
                  <p className="text-orange-100 text-sm">Centro - Guarabira, PB</p>
                  <p className="text-orange-100 text-sm">CEP: 58200-000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <button 
                  onClick={handleWhatsApp}
                  className="text-orange-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  (83) 99951-1219
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <a 
                  href="mailto:contato@clubedosbichos.com.br"
                  className="text-orange-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  contato@clubedosbichos.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-200">Horários</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-orange-100">Segunda à Sexta</p>
                  <p className="text-orange-200">8h às 18h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-orange-100">Sábados</p>
                  <p className="text-orange-200">8h às 16h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-orange-100">Domingos</p>
                  <p className="text-orange-200">Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-700 mt-12 pt-8 text-center">
          <p className="text-orange-200 text-sm">
            © {new Date().getFullYear()} Clube dos Bichos. Todos os direitos reservados. Feito com ❤️ para os pets e suas famílias.
          </p>
        </div>
      </div>
    </footer>
  );
}
