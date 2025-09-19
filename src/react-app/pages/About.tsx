import { Heart, Users, Award, Star, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Amor pelos Animais',
      description: 'Cada pet é tratado como membro da nossa família, com carinho e respeito únicos.',
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Profissionais certificados e apaixonados por proporcionar o melhor cuidado.',
    },
    {
      icon: Award,
      title: 'Excelência em Serviços',
      description: 'Sempre buscamos a perfeição em cada detalhe dos nossos atendimentos.',
    },
    {
      icon: CheckCircle,
      title: 'Compromisso com Qualidade',
      description: 'Utilizamos apenas produtos premium e técnicas mais avançadas do mercado.',
    },
  ];

  const team = [
    {
      name: 'Dr. Carlos Mendes',
      role: 'Veterinário Chefe',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      description: 'Mais de 15 anos cuidando da saúde dos pets com especialização em medicina preventiva.'
    },
    {
      name: 'Ana Silva',
      role: 'Groomer Sênior',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=300&h=300&fit=crop&crop=face',
      description: 'Especialista em tosa criativa e cuidados estéticos, transformando cada pet em uma obra de arte.'
    },
    {
      name: 'Roberto Santos',
      role: 'Coordenador de Banho',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Expert em técnicas de relaxamento e bem-estar, garantindo uma experiência única.'
    },
  ];

  const stats = [
    { number: '2000+', label: 'Pets Atendidos' },
    { number: '10', label: 'Anos de Experiência' },
    { number: '98%', label: 'Satisfação dos Clientes' },
    { number: '24h', label: 'Suporte de Emergência' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold mb-4">
              <Heart className="w-5 h-5 fill-current" />
              <span>Nossa História</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Conheça o
              <br />
              <span className="text-cyan-500">
                Clube dos Bichos
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma história de amor, dedicação e cuidado que começou há mais de 10 anos e continua crescendo a cada patinha que passa por aqui.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop"
                alt="Interior do Clube dos Bichos"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Nossa Missão</h2>
              <p className="text-gray-600 leading-relaxed">
                O Clube dos Bichos nasceu do sonho de criar um espaço onde cada pet recebesse o cuidado que merece. 
                Fundado em 2014 por uma família apaixonada por animais, começamos pequenos mas sempre com grandes ideais.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hoje, somos referência em cuidados pet na região, oferecendo serviços completos desde banho e tosa 
                até acompanhamento veterinário, sempre com o amor e a dedicação que nossos amiguinhos merecem.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow-md">
                    <div className="text-2xl font-bold text-orange-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam cada decisão e cada cuidado que oferecemos aos seus pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa Equipe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os profissionais apaixonados que cuidam do seu pet com todo carinho e expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-orange-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  
                  <div className="flex justify-center mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossas Instalações</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um ambiente pensado especialmente para o conforto e bem-estar dos seus pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
                alt="Área de banho"
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Área de Banho</h3>
              <p className="text-gray-600">Banheiras especiais e sistema de aquecimento para máximo conforto.</p>
            </div>
            
            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
                alt="Sala de tosa"
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Sala de Tosa</h3>
              <p className="text-gray-600">Equipamentos profissionais para tosas criativas e precision cuts.</p>
            </div>
            
            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop"
                alt="Consultório veterinário"
                className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Consultório Veterinário</h3>
              <p className="text-gray-600">Equipado com tecnologia moderna para diagnósticos precisos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-white mb-8">
            Venha conhecer pessoalmente nossa equipe e instalações. Seu pet merece o melhor cuidado!
          </p>
          <button
            onClick={() => window.open('https://wa.me/5583999511219?text=Olá! Gostaria de agendar uma visita ao Clube dos Bichos.', '_blank')}
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 shadow-lg text-lg"
          >
            Agendar uma Visita
          </button>
        </div>
      </section>
    </div>
  );
}
