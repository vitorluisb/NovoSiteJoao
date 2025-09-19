import { Crown, Users, Sparkles, ArrowRight, Gift, Star } from 'lucide-react';

export default function VipGroupSection() {
  const handleJoinVipGroup = () => {
    window.open('https://chat.whatsapp.com/EXEMPLE123456789', '_blank');
  };

  const vipBenefits = [
    'Acesso prioritário aos serviços',
    'Promoções antecipadas',
    'Dicas de cuidados especiais',
    'Conteúdo educativo exclusivo',
    'Suporte prioritário 24h',
    'Eventos especiais para pets'
  ];

  return (
    <section className="py-20 bg-amber-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-amber-400 rounded-full animate-pulse"></div>
      </div>

      {/* Floating Crown Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Crown className="absolute top-20 left-1/4 w-8 h-8 text-yellow-300/20 animate-bounce" />
        <Crown className="absolute bottom-40 right-1/4 w-6 h-6 text-yellow-300/30 animate-pulse" />
        <Sparkles className="absolute top-40 right-20 w-6 h-6 text-cyan-300/25 animate-spin" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* VIP Badge */}
          <div className="inline-flex items-center space-x-3 bg-orange-400 text-amber-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl mb-6">
            <Crown className="w-6 h-6 fill-current" />
            <span>GRUPO VIP EXCLUSIVO</span>
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Faça Parte do Nosso
            <br />
            <span className="text-orange-300">
              Clube VIP
            </span>
          </h2>
          
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Entre no grupo exclusivo do WhatsApp e tenha acesso a benefícios únicos, 
            promoções especiais e conteúdos exclusivos para quem ama pets de verdade!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-amber-900" />
                </div>
                <h3 className="text-2xl font-bold text-white">Benefícios Exclusivos</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs text-green-900">✓</span>
                    </div>
                    <span className="text-orange-100 text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-500/20 rounded-2xl border border-green-400/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-300" />
                  <span className="text-green-200 font-medium">Mais de 1.500 membros ativos!</span>
                </div>
                <p className="text-green-100 text-sm">
                  Uma comunidade apaixonada por pets compartilhando experiências, dicas e muito amor! 🐾
                </p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="text-center">
            <div className="bg-orange-500 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Crown className="w-10 h-10 text-white fill-current" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Entre Agora no Grupo
                </h3>
                <p className="text-white/90 text-lg mb-6">
                  Acesso imediato a todos os benefícios VIP!
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Star className="w-5 h-5 fill-current" />
                  <span>Acesso imediato a promoções</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Star className="w-5 h-5 fill-current" />
                  <span>Conteúdo educativo diário</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Star className="w-5 h-5 fill-current" />
                  <span>Comunidade acolhedora</span>
                </div>
              </div>

              <button
                onClick={handleJoinVipGroup}
                className="group w-full bg-white text-orange-600 font-bold text-xl py-4 px-8 rounded-xl hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
              >
                <span className="flex items-center justify-center space-x-3">
                  <Users className="w-6 h-6" />
                  <span>Entrar no Grupo VIP</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              
              <p className="text-white/80 text-sm">
                🎉 Apenas para verdadeiros amantes de pets! 
                <br />
                <strong>100% Gratuito</strong> - Saia quando quiser
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">1.500+</div>
                <div className="text-orange-200 text-sm">Membros</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">50+</div>
                <div className="text-orange-200 text-sm">Dicas/mês</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">4.9★</div>
                <div className="text-orange-200 text-sm">Satisfação</div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
