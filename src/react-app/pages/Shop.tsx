import { useState } from 'react';
import { ShoppingBag, Filter, Search, Star, ArrowRight, ShoppingCart } from 'lucide-react';
import { useProducts } from '@/react-app/hooks/useApi';
import { useCart } from '@/react-app/hooks/useCart';

export default function Shop() {
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos os Produtos' },
    { id: 'food', name: 'Alimentação' },
    { id: 'toys', name: 'Brinquedos' },
    { id: 'accessories', name: 'Acessórios' },
    { id: 'hygiene', name: 'Higiene' },
    { id: 'health', name: 'Saúde' },
  ];

  // Mock products if database is empty
  const mockProducts = [
    {
      id: 1,
      name: 'Ração Premium Royal Canin',
      description: 'Alimento completo e balanceado para cães adultos de raças pequenas.',
      price: 'R$ 89,90',
      image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop',
      category: 'food',
    },
    {
      id: 2,
      name: 'Brinquedo Kong Classic',
      description: 'Brinquedo resistente para entretenimento e exercício mental.',
      price: 'R$ 45,90',
      image_url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=300&h=300&fit=crop',
      category: 'toys',
    },
    {
      id: 3,
      name: 'Coleira Antipulgas Seresto',
      description: 'Proteção contra pulgas e carrapatos por até 8 meses.',
      price: 'R$ 159,90',
      image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
      category: 'health',
    },
    {
      id: 4,
      name: 'Shampoo Neutro Pet Clean',
      description: 'Shampoo hipoalergênico para peles sensíveis.',
      price: 'R$ 24,90',
      image_url: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?w=300&h=300&fit=crop',
      category: 'hygiene',
    },
    {
      id: 5,
      name: 'Cama Ortopédica Memory Foam',
      description: 'Cama confortável com espuma viscoelástica para cães idosos.',
      price: 'R$ 199,90',
      image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop',
      category: 'accessories',
    },
    {
      id: 6,
      name: 'Petisco Natural Ossinho',
      description: 'Osso natural para limpeza dos dentes e entretenimento.',
      price: 'R$ 12,90',
      image_url: 'https://images.unsplash.com/photo-1605244863941-3a6c50f0b2a8?w=300&h=300&fit=crop',
      category: 'food',
    },
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWhatsApp = (productName: string) => {
    window.open(`https://wa.me/5583999511219?text=Olá! Gostaria de saber mais sobre o produto: ${productName}`, '_blank');
  };

  const handleAddToCart = (product: any) => {
    // Converter preço de string para número
    const priceNumber = parseFloat(product.price.replace('R$', '').replace(',', '.').trim());
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: priceNumber,
      image_url: product.image_url || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop'
    };
    
    addItem(cartItem);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
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
              <ShoppingBag className="w-5 h-5" />
              <span>Pet Shop</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Produtos Premium para
              <br />
              <span className="text-cyan-500">
                Seu Melhor Amigo
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecionamos cuidadosamente os melhores produtos para a saúde, diversão e bem-estar do seu pet.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2 w-full lg:w-auto">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500">Tente buscar por outro termo ou categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        {product.price || 'Consulte preço'}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Carrinho</span>
                      </button>
                      
                      <button
                        onClick={() => handleWhatsApp(product.name)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <span>WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Não Encontrou o que Procura?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Nossa equipe pode ajudar você a encontrar exatamente o que seu pet precisa. Entre em contato!
          </p>
          <button
            onClick={() => window.open('https://wa.me/5583999511219?text=Olá! Estou procurando um produto específico para meu pet.', '_blank')}
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 shadow-lg text-lg"
          >
            Falar com Especialista
          </button>
        </div>
      </section>
    </div>
  );
}
