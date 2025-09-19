import { ArrowRight, Heart, Star, Users, Sparkles, Zap, Shield } from 'lucide-react';

export default function HeroSection() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5583999511219?text=Olá! Vim pelo site e gostaria de saber mais sobre os serviços do Clube dos Bichos.', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-teal-50">
      {/* Decorative Pet Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dog Icons */}
        <svg className="absolute top-20 left-16 w-24 h-24 text-amber-200 opacity-30 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 20c-8 0-15 4-20 10-3 4-5 9-5 14 0 8 4 15 10 20 3 2 6 3 10 3h10c4 0 7-1 10-3 6-5 10-12 10-20 0-5-2-10-5-14-5-6-12-10-20-10zm-15 25c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4zm30 0c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4zm-15 10c-3 0-5-1-7-3l-2 2c3 3 6 4 9 4s6-1 9-4l-2-2c-2 2-4 3-7 3z"/>
        </svg>
        
        {/* Cat Icons */}
        <svg className="absolute top-32 right-20 w-20 h-20 text-stone-400 opacity-25 animate-bounce" viewBox="0 0 100 100" fill="currentColor">
          <path d="M30 15l-5 15h-5c-5 0-10 5-10 10v20c0 8 7 15 15 15h40c8 0 15-7 15-15V40c0-5-5-10-10-10h-5l-5-15c-2-6-8-10-15-10s-13 4-15 10zm5 35c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5zm30 0c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5zm-15 15c-2 0-4-1-5-2l-2 2c2 2 4 3 7 3s5-1 7-3l-2-2c-1 1-3 2-5 2z"/>
        </svg>
        
        {/* Paw Prints */}
        <svg className="absolute bottom-40 left-24 w-16 h-16 text-teal-300 opacity-40 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="35" cy="25" rx="8" ry="12"/>
          <ellipse cx="65" cy="25" rx="8" ry="12"/>
          <ellipse cx="25" cy="45" rx="6" ry="10"/>
          <ellipse cx="75" cy="45" rx="6" ry="10"/>
          <ellipse cx="50" cy="65" rx="15" ry="20"/>
        </svg>
        
        <svg className="absolute top-1/3 right-1/4 w-12 h-12 text-stone-300 opacity-35 animate-bounce delay-300" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="35" cy="25" rx="6" ry="9"/>
          <ellipse cx="65" cy="25" rx="6" ry="9"/>
          <ellipse cx="25" cy="40" rx="5" ry="8"/>
          <ellipse cx="75" cy="40" rx="5" ry="8"/>
          <ellipse cx="50" cy="60" rx="12" ry="16"/>
        </svg>
        
        {/* Pet Toys */}
        <svg className="absolute bottom-32 right-16 w-18 h-18 text-amber-300 opacity-30 animate-spin" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="20"/>
          <circle cx="30" cy="30" r="8"/>
          <circle cx="70" cy="30" r="8"/>
          <circle cx="30" cy="70" r="8"/>
          <circle cx="70" cy="70" r="8"/>
        </svg>
        
        {/* Bone */}
        <svg className="absolute top-1/2 left-12 w-20 h-20 text-stone-400 opacity-25 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20 40c-5 0-10 5-10 10s5 10 10 10c2 0 4-1 5-2l50 0c1 1 3 2 5 2 5 0 10-5 10-10s-5-10-10-10c-2 0-4 1-5 2l-50 0c-1-1-3-2-5-2z"/>
          <circle cx="20" cy="35" r="5"/>
          <circle cx="20" cy="65" r="5"/>
          <circle cx="80" cy="35" r="5"/>
          <circle cx="80" cy="65" r="5"/>
        </svg>
        
        {/* Collar */}
        <svg className="absolute bottom-20 left-1/3 w-16 h-16 text-teal-400 opacity-35 animate-bounce" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="currentColor" strokeWidth="8"/>
          <circle cx="50" cy="35" r="4"/>
          <rect x="46" y="30" width="8" height="10" rx="2"/>
        </svg>
        
        {/* Heart Icons */}
        <Heart className="absolute top-40 left-1/3 w-14 h-14 text-rose-300 opacity-30 animate-pulse fill-current" />
        <Heart className="absolute bottom-1/3 right-1/3 w-10 h-10 text-rose-200 opacity-25 animate-pulse fill-current delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-stone-600 text-white px-8 py-4 rounded-full font-bold shadow-xl transform hover:scale-105 transition-all duration-300">
            <Heart className="w-6 h-6 fill-current animate-pulse text-rose-300" />
            <span className="text-lg">Cuidando do seu pet com amor e dedicação</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-stone-800 leading-tight font-rounded">
              Experiência
              <br />
              <span className="text-teal-600">
                Completa
              </span>
              <br />
              <span className="text-stone-600 text-5xl sm:text-6xl lg:text-7xl">
                para seu melhor amigo
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-stone-700 font-semibold max-w-4xl mx-auto leading-relaxed">
              Transformamos cada visita em uma experiência única de carinho, 
              <br className="hidden sm:block" />
              cuidado e alegria para seu companheiro de quatro patas! 🐾
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 py-8">
            <div className="flex items-center space-x-4 bg-teal-500 rounded-2xl px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <Users className="w-10 h-10 text-white" />
              <div className="text-left">
                <div className="text-3xl font-black text-white">2000+</div>
                <div className="text-teal-100 font-semibold">Pets Felizes</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-stone-500 rounded-2xl px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <Star className="w-10 h-10 text-white fill-current" />
              <div className="text-left">
                <div className="text-3xl font-black text-white">4.9/5</div>
                <div className="text-stone-100 font-semibold">Avaliação</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-amber-600 rounded-2xl px-8 py-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <Heart className="w-10 h-10 text-white fill-current animate-pulse" />
              <div className="text-left">
                <div className="text-3xl font-black text-white">10+</div>
                <div className="text-amber-100 font-semibold">Anos de Amor</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleWhatsApp}
                className="group inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-white text-xl font-black px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                  <ellipse cx="35" cy="25" rx="6" ry="9"/>
                  <ellipse cx="65" cy="25" rx="6" ry="9"/>
                  <ellipse cx="25" cy="40" rx="5" ry="8"/>
                  <ellipse cx="75" cy="40" rx="5" ry="8"/>
                  <ellipse cx="50" cy="60" rx="12" ry="16"/>
                </svg>
                <span>Agendar pelo WhatsApp</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="group inline-flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white text-xl font-black px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                  <ellipse cx="35" cy="25" rx="6" ry="9"/>
                  <ellipse cx="65" cy="25" rx="6" ry="9"/>
                  <ellipse cx="25" cy="40" rx="5" ry="8"/>
                  <ellipse cx="75" cy="40" rx="5" ry="8"/>
                  <ellipse cx="50" cy="60" rx="12" ry="16"/>
                </svg>
                <span>Entrar em Contato</span>
                <Sparkles className="w-6 h-6 animate-spin" />
              </button>
            </div>
            
            <div className="bg-stone-600 rounded-2xl px-8 py-4 mx-auto max-w-2xl">
              <p className="text-white text-lg font-bold">
                🚀 Resposta em 5 minutos • 🏆 Profissionais certificados • 💝 Atendimento personalizado
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-3 border-stone-600 rounded-full flex justify-center bg-teal-500 shadow-xl">
          <div className="w-2 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
