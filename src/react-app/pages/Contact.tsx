import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Car } from 'lucide-react';

export default function Contact() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5583999511219?text=Olá! Gostaria de entrar em contato com o Clube dos Bichos.', '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Rui+Barbosa+367+Centro+Guarabira+PB', '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      details: ['(83) 99951-1219', 'WhatsApp disponível'],
      action: handleWhatsApp,
      actionText: 'Chamar no WhatsApp',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: ['contato@clubedosbichos.com.br', 'Resposta em até 24h'],
      action: () => window.open('mailto:contato@clubedosbichos.com.br'),
      actionText: 'Enviar E-mail',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      details: ['Rui Barbosa, 367', 'Centro - Guarabira, PB'],
      action: handleDirections,
      actionText: 'Ver no Mapa',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  const schedules = [
    { day: 'Segunda à Sexta', hours: '8h às 18h', available: true },
    { day: 'Sábados', hours: '8h às 16h', available: true },
    { day: 'Domingos', hours: 'Fechado', available: false },
  ];

  const services = [
    { name: 'Banho e Tosa', emergency: false },
    { name: 'Consulta Veterinária', emergency: false },
    { name: 'Emergências', emergency: true },
    { name: 'Atendimento Domiciliar', emergency: false },
  ];

  return (
    <div className="pt-20 min-h-screen bg-orange-50">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold mb-4">
              <MessageCircle className="w-5 h-5" />
              <span>Fale Conosco</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Entre em
              <br />
              <span className="text-cyan-500">
                Contato Conosco
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para tirar suas dúvidas, agendar serviços e proporcionar o melhor cuidado para seu pet.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8">
                  <div className={`w-16 h-16 ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    {contact.title}
                  </h3>
                  
                  <div className="text-center mb-6 space-y-1">
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className={`${idx === 0 ? 'text-gray-900 font-medium' : 'text-gray-600 text-sm'}`}>
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  <button
                    onClick={contact.action}
                    className={`w-full ${index === 0 ? 'bg-green-500 hover:bg-green-600' : index === 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                  >
                    {contact.actionText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map & Location */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa Localização</h2>
              
              <div className="bg-orange-100 rounded-2xl p-8 mb-8">
                <div className="aspect-video bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577086664693-894d8d25c7b0?w=600&h=400&fit=crop"
                    alt="Localização do Clube dos Bichos"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-orange-900/20 flex items-center justify-center">
                    <button
                      onClick={handleDirections}
                      className="bg-white/90 backdrop-blur-sm text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-white transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                    >
                      <Navigation className="w-5 h-5" />
                      <span>Abrir no Google Maps</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Rui Barbosa, 367</p>
                      <p className="text-gray-600">Centro - Guarabira, PB</p>
                      <p className="text-gray-600">CEP: 58200-000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Car className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Estacionamento</p>
                      <p className="text-gray-600">Gratuito para clientes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Services */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Horários e Serviços</h2>
              
              {/* Schedule */}
              <div className="bg-cyan-100 rounded-2xl p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Horários de Funcionamento</h3>
                </div>
                
                <div className="space-y-4">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/50 last:border-b-0">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className={`font-bold ${schedule.available ? 'text-green-600' : 'text-red-500'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    🚨 Emergências: Atendemos 24h via WhatsApp para casos urgentes
                  </p>
                </div>
              </div>

              {/* Services Available */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Serviços Disponíveis</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        service.emergency 
                          ? 'border-red-200 bg-red-50' 
                          : 'border-orange-200 bg-orange-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {service.emergency ? (
                          <span className="text-red-600">🚨</span>
                        ) : (
                          <span className="text-orange-600">🐾</span>
                        )}
                        <span className={`font-medium ${
                          service.emergency ? 'text-red-800' : 'text-orange-800'
                        }`}>
                          {service.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600">
              Tire suas principais dúvidas sobre nossos serviços
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Preciso agendar horário?',
                answer: 'Sim, recomendamos agendamento para garantir o melhor atendimento. Entre em contato via WhatsApp!'
              },
              {
                question: 'Vocês atendem emergências?',
                answer: 'Sim! Temos suporte 24h via WhatsApp para casos de emergência veterinária.'
              },
              {
                question: 'Quais formas de pagamento aceitas?',
                answer: 'Aceitamos dinheiro, cartão de débito/crédito, PIX e parcelamos em até 6x sem juros.'
              },
              {
                question: 'Fazem atendimento domiciliar?',
                answer: 'Sim! Oferecemos banho e tosa domiciliar para pets com dificuldade de locomoção.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Cuidar do Seu Pet?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Entre em contato agora e agende o melhor cuidado para seu melhor amigo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg text-lg flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => window.open('mailto:contato@clubedosbichos.com.br')}
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 shadow-lg text-lg flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>E-mail</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
