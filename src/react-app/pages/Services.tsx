import { useState } from 'react';
import { Heart, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useServices } from '@/react-app/hooks/useApi';

export default function Services() {
  const { services, loading } = useServices();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos os Serviços' },
    { id: 'grooming', name: 'Estética' },
    { id: 'veterinary', name: 'Veterinário' },
  ];

  // Mock services if database is empty
  const mockServices = [
    {
      id: 1,
      name: 'Banho Completo',
      description: 'Banho relaxante com produtos premium, secagem profissional e cuidados especiais.',
      price: 'A partir de R$ 35',
      duration: '45-60 min',
      image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      category: 'grooming',
    },
    {
      id: 2,
      name: 'Tosa Higiênica',
      description: 'Corte nas áreas íntimas, patas e orelhas para manter a higiene do seu pet.',
      price: 'A partir de R$ 25',
      duration: '30-45 min',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'grooming',
    },
    {
      id: 3,
      name: 'Tosa Completa',
      description: 'Corte personalizado seguindo o padrão da raça ou preferência do tutor.',
      price: 'A partir de R$ 45',
      duration: '60-90 min',
      image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      category: 'grooming',
    },
    {
      id: 4,
      name: 'Consulta Veterinária',
      description: 'Avaliação completa da saúde do seu pet com veterinário especializado.',
      price: 'A partir de R$ 80',
      duration: '30-45 min',
      image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
      category: 'veterinary',
    },
    {
      id: 5,
      name: 'Vacinação',
      description: 'Aplicação de vacinas essenciais para manter seu pet protegido.',
      price: 'A partir de R$ 60',
      duration: '15-20 min',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
      category: 'veterinary',
    },

  ];

  const displayServices = services.length > 0 ? services : mockServices;

  const filteredServices = selectedCategory === 'all' 
    ? displayServices 
    : displayServices.filter(service => service.category === selectedCategory);

  const handleWhatsApp = (serviceName: string) => {
    window.open(`https://wa.me/5583999511219?text=Olá! Gostaria de agendar o serviço: ${serviceName}`, '_blank');
  };

  const features = [
    'Produtos premium e hipoalergênicos',
    'Profissionais certificados e experientes',
    'Ambiente climatizado e relaxante',
    'Equipamentos modernos e seguros',
    'Atendimento personalizado',
    'Suporte pós-serviço'
  ];



  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando serviços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-orange-50">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold mb-4">
              <Heart className="w-5 h-5 fill-current" />
              <span>Nossos Serviços</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Cuidado Completo para
              <br />
              <span className="text-cyan-500">
                Seu Melhor Amigo
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços especializados para manter seu pet sempre feliz, saudável e lindo.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop'}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  {service.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {service.price || 'Consulte preço'}
                    </div>
                    
                    {service.duration && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.9/5)</span>
                  </div>
                  
                  <button
                    onClick={() => handleWhatsApp(service.name)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Agendar Agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Por que Escolher o Clube dos Bichos?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Agende Seu Atendimento!
          </h2>
          <p className="text-xl text-white mb-8">
            Seu pet merece o melhor cuidado! Entre em contato e agende nossos serviços especializados.
          </p>
          <button
            onClick={() => window.open('https://wa.me/5583999511219?text=Olá! Gostaria de agendar um atendimento para meu pet.', '_blank')}
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 shadow-lg text-lg"
          >
            Agendar Agora
          </button>
        </div>
      </section>
    </div>
  );
}
