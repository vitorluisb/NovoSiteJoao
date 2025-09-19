import { useState, useEffect } from 'react';
import { useAuth } from '@/react-app/hooks/useAuth.tsx';
import { Navigate } from 'react-router';
import { 
  Heart, 
  Package, 
  Wrench, 
  MessageSquare, 
  LogOut,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { LoveMessage, Product, Service, CreateProduct, CreateService } from '@/shared/types';

type TabType = 'messages' | 'products' | 'services';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [messages, setMessages] = useState<LoveMessage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form states
  const [productForm, setProductForm] = useState<CreateProduct>({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: ''
  });
  
  const [serviceForm, setServiceForm] = useState<CreateService>({
    name: '',
    description: '',
    price: '',
    duration: '',
    image_url: '',
    category: ''
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Image upload states
  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>('');
  const [uploadingProductImage, setUploadingProductImage] = useState(false);
  
  const [selectedServiceImage, setSelectedServiceImage] = useState<File | null>(null);
  const [serviceImagePreview, setServiceImagePreview] = useState<string>('');
  const [uploadingServiceImage, setUploadingServiceImage] = useState(false);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('Loading admin data...');
      
      const [messagesRes, productsRes, servicesRes] = await Promise.all([
        fetch('/api/admin/love-messages', { credentials: 'include' }),
        fetch('/api/admin/products', { credentials: 'include' }),
        fetch('/api/admin/services', { credentials: 'include' })
      ]);

      console.log('Messages response status:', messagesRes.status);
      
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        console.log('Messages loaded:', messagesData);
        console.log('Messages array:', messagesData.messages);
        console.log('Messages count:', messagesData.messages?.length || 0);
        setMessages(messagesData.messages || []);
      } else {
        const errorText = await messagesRes.text();
        console.error('Failed to load messages:', messagesRes.status, messagesRes.statusText, errorText);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData.services || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveMessage = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/love-messages/${id}/approve`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, is_approved: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error approving message:', error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta mensagem?')) return;

    try {
      const response = await fetch(`/api/admin/love-messages/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Image upload functions for products
  const handleProductImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedProductImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProductImage = async (): Promise<string | null> => {
    if (!selectedProductImage) return null;
    
    setUploadingProductImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedProductImage);
      
      const response = await fetch('/api/admin/products/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao fazer upload da imagem');
      }
      
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading product image:', error);
      alert('Erro ao fazer upload da imagem do produto.');
      return null;
    } finally {
      setUploadingProductImage(false);
    }
  };

  // Image upload functions for services
  const handleServiceImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedServiceImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setServiceImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadServiceImage = async (): Promise<string | null> => {
    if (!selectedServiceImage) return null;
    
    setUploadingServiceImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedServiceImage);
      
      const response = await fetch('/api/admin/services/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao fazer upload da imagem');
      }
      
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading service image:', error);
      alert('Erro ao fazer upload da imagem do serviço.');
      return null;
    } finally {
      setUploadingServiceImage(false);
    }
  };

  // Product management functions
  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description || '',
        price: product.price || '',
        image_url: product.image_url || '',
        category: product.category || ''
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: ''
      });
    }
    // Clear image upload states
    setSelectedProductImage(null);
    setProductImagePreview('');
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: ''
    });
    setSelectedProductImage(null);
    setProductImagePreview('');
  };

  const saveProduct = async () => {
    if (!productForm.name.trim()) return;

    setSubmitLoading(true);
    try {
      // Upload image if selected
      let imageUrl = productForm.image_url;
      if (selectedProductImage) {
        const uploadedUrl = await uploadProductImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if image upload failed
        }
      }

      const productData = {
        ...productForm,
        image_url: imageUrl
      };

      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        await loadData(); // Reload data
        closeProductModal();
      } else {
        alert('Erro ao salvar produto');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto');
    } finally {
      setSubmitLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Service management functions
  const openServiceModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceForm({
        name: service.name,
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        image_url: service.image_url || '',
        category: service.category || ''
      });
    } else {
      setEditingService(null);
      setServiceForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        image_url: '',
        category: ''
      });
    }
    // Clear image upload states
    setSelectedServiceImage(null);
    setServiceImagePreview('');
    setShowServiceModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setEditingService(null);
    setServiceForm({
      name: '',
      description: '',
      price: '',
      duration: '',
      image_url: '',
      category: ''
    });
    setSelectedServiceImage(null);
    setServiceImagePreview('');
  };

  const saveService = async () => {
    if (!serviceForm.name.trim()) return;

    setSubmitLoading(true);
    try {
      // Upload image if selected
      let imageUrl = serviceForm.image_url;
      if (selectedServiceImage) {
        const uploadedUrl = await uploadServiceImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if image upload failed
        }
      }

      const serviceData = {
        ...serviceForm,
        image_url: imageUrl
      };

      const url = editingService 
        ? `/api/admin/services/${editingService.id}`
        : '/api/admin/services';
      
      const method = editingService ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(serviceData)
      });

      if (response.ok) {
        await loadData(); // Reload data
        closeServiceModal();
      } else {
        alert('Erro ao salvar serviço');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Erro ao salvar serviço');
    } finally {
      setSubmitLoading(false);
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setServices(services.filter(service => service.id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const tabs = [
    { id: 'messages' as TabType, label: 'Mensagens', icon: MessageSquare, count: messages.length },
    { id: 'products' as TabType, label: 'Produtos', icon: Package, count: products.length },
    { id: 'services' as TabType, label: 'Serviços', icon: Wrench, count: services.length },
  ];

  const productCategories = ['food', 'toys', 'accessories', 'hygiene', 'health'];
  const serviceCategories = ['grooming', 'veterinary', 'plans'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-500">Clube dos Bichos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Mensagens</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-teal-500" />
              <div>
                <p className="text-sm text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <Wrench className="w-10 h-10 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Serviços</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <p className="mt-2 text-gray-600">Carregando...</p>
              </div>
            ) : (
              <>
                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Mensagens do Correio Love</h3>
                      <button
                        onClick={loadData}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Recarregar
                      </button>
                    </div>
                    
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Nenhuma mensagem encontrada.</p>
                        <p className="text-sm text-gray-400">
                          Total de mensagens carregadas: {messages.length}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">{message.author_name}</h4>
                                {message.pet_name && (
                                  <p className="text-sm text-gray-600">
                                    Pet: {message.pet_name} ({message.pet_type})
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {message.is_approved ? (
                                  <span className="flex items-center gap-1 text-green-600 text-sm">
                                    <CheckCircle className="w-4 h-4" />
                                    Aprovada
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => approveMessage(message.id)}
                                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Aprovar
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => deleteMessage(message.id)}
                                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Excluir
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-gray-700">{message.message}</p>
                            
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(message.created_at).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Produtos</h3>
                      <button 
                        onClick={() => openProductModal()}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar Produto
                      </button>
                    </div>
                    
                    {products.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhum produto encontrado.</p>
                    ) : (
                      <div className="grid gap-4">
                        {products.map((product) => (
                          <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                {product.description && (
                                  <p className="text-gray-600 mt-1">{product.description}</p>
                                )}
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                  {product.price && <span>Preço: {product.price}</span>}
                                  {product.category && <span>Categoria: {product.category}</span>}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                <button 
                                  onClick={() => openProductModal(product)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => deleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Serviços</h3>
                      <button 
                        onClick={() => openServiceModal()}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar Serviço
                      </button>
                    </div>
                    
                    {services.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhum serviço encontrado.</p>
                    ) : (
                      <div className="grid gap-4">
                        {services.map((service) => (
                          <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                {service.description && (
                                  <p className="text-gray-600 mt-1">{service.description}</p>
                                )}
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                  {service.price && <span>Preço: {service.price}</span>}
                                  {service.duration && <span>Duração: {service.duration}</span>}
                                  {service.category && <span>Categoria: {service.category}</span>}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                <button 
                                  onClick={() => openServiceModal(service)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => deleteService(service.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
              </h3>
              <button onClick={closeProductModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Nome do produto"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                  placeholder="Descrição do produto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: R$ 29,90"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Produto</label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  
                  {productImagePreview && (
                    <div className="relative">
                      <img
                        src={productImagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-md border-2 border-orange-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductImage(null);
                          setProductImagePreview('');
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-500">ou</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                    <input
                      type="url"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://..."
                      disabled={!!selectedProductImage}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Selecionar categoria</option>
                  {productCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeProductModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveProduct}
                  disabled={!productForm.name.trim() || submitLoading || uploadingProductImage}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {uploadingProductImage ? 'Enviando foto...' : submitLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingService ? 'Editar Serviço' : 'Adicionar Serviço'}
              </h3>
              <button onClick={closeServiceModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Nome do serviço"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                  placeholder="Descrição do serviço"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                <input
                  type="text"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: A partir de R$ 35"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                <input
                  type="text"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: 45-60 min"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Serviço</label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleServiceImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  
                  {serviceImagePreview && (
                    <div className="relative">
                      <img
                        src={serviceImagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-md border-2 border-orange-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServiceImage(null);
                          setServiceImagePreview('');
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-500">ou</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                    <input
                      type="url"
                      value={serviceForm.image_url}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://..."
                      disabled={!!selectedServiceImage}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Selecionar categoria</option>
                  {serviceCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeServiceModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveService}
                  disabled={!serviceForm.name.trim() || submitLoading || uploadingServiceImage}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {uploadingServiceImage ? 'Enviando foto...' : submitLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
