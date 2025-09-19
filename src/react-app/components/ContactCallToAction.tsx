import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactCallToAction() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5583999511219?text=Olá! Gostaria de agendar um horário para meu pet no Clube dos Bichos.', '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Rui+Barbosa+367+Centro+Guarabira+PB', '_blank');
  };

  return (
    <section className="py-20 bg-amber-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Pronto para Cuidar do
            <br />
            <span className="text-orange-300">Seu Melhor Amigo?</span>
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Estamos aqui para proporcionar o melhor cuidado para seu pet. 
            Entre em contato e agende já o próximo momento especial!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">WhatsApp Direto</h3>
                  <p className="text-orange-200">Resposta rápida e personalizada</p>
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Conversar no WhatsApp
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Nossa Localização</h3>
                  <p className="text-orange-200">Rui Barbosa, 367 - Centro, Guarabira</p>
                </div>
              </div>
              <button
                onClick={handleDirections}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-4 rounded-lg transition-all duration-200 border border-white/30"
              >
                Ver no Google Maps
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Horários</h3>
                  <p className="text-orange-200">Segunda a Sábado</p>
                </div>
              </div>
              <div className="space-y-2 text-orange-100">
                <div className="flex justify-between">
                  <span>Segunda à Sexta:</span>
                  <span className="font-medium">8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-medium">8h às 16h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="font-medium text-orange-300">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center lg:text-left">
            <div className="bg-orange-400 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">
                Agende Agora Mesmo!
              </h3>
              <p className="text-xl text-orange-100 mb-8">
                Seu pet merece o melhor cuidado! Entre em contato conosco e agende os serviços.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Avaliação gratuita do seu pet</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Produtos premium inclusos</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Equipe especializada e carinhosa</span>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="group w-full bg-white text-orange-600 font-bold text-lg py-4 rounded-xl hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Entrar em Contato</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
