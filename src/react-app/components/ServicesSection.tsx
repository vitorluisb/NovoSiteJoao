import { Bath, Scissors, Stethoscope, ShoppingBag, Heart, Star } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Bath,
      title: 'Banho & Higiene',
      description: 'Banho relaxante com produtos premium, limpeza de ouvidos, corte de unhas e muito carinho.',
      features: ['Produtos hipoalergênicos', 'Secagem profissional', 'Aromatização'],
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: Scissors,
      title: 'Tosa Completa',
      description: 'Corte personalizado para cada raça, realçando a beleza natural do seu pet.',
      features: ['Tosa higiênica', 'Tosa estética', 'Designs especiais'],
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Stethoscope,
      title: 'Cuidados Veterinários',
      description: 'Consultas, vacinas e cuidados preventivos com veterinários especializados.',
      features: ['Check-up completo', 'Vacinação', 'Emergências'],
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: ShoppingBag,
      title: 'Pet Shop',
      description: 'Produtos selecionados para a saúde, diversão e bem-estar do seu companheiro.',
      features: ['Ração premium', 'Brinquedos', 'Acessórios'],
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
    },
  ];

  const handleWhatsApp = (service: string) => {
    window.open(`https://wa.me/5583999511219?text=Olá! Gostaria de agendar o serviço de ${service} para meu pet.`, '_blank');
  };

  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium mb-4">
            <Heart className="w-4 h-4 fill-current" />
            <span>Nossos Serviços</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Cuidado Completo para
            <br />
            <span className="text-orange-500">
              Seu Melhor Amigo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços para manter seu pet feliz, saudável e sempre lindo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`${service.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
              >
                <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleWhatsApp(service.title)}
                  className={`w-full ${service.color} hover:opacity-90 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  Agendar Agora
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-orange-500 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Pacotes Especiais Disponíveis!</h3>
          <p className="text-xl mb-8 text-orange-100">
            Combine serviços e economize ainda mais. Pergunte sobre nossos planos mensais.
          </p>
          <button
            onClick={() => handleWhatsApp('informações sobre pacotes especiais')}
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 shadow-lg"
          >
            Ver Pacotes Especiais
          </button>
        </div>
      </div>
    </section>
  );
}
