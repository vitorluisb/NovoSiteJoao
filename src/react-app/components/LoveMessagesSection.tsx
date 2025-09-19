import { useState } from 'react';
import { Heart, MessageCircle, Send, User, Calendar } from 'lucide-react';
import { useLoveMessages } from '@/react-app/hooks/useApi';
import { CreateLoveMessage } from '@/shared/types';

export default function LoveMessagesSection() {
  const { messages, loading, createMessage } = useLoveMessages();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const [formData, setFormData] = useState<CreateLoveMessage>({
    author_name: '',
    message: '',
    pet_name: '',
    pet_type: '',
    image_url: '',
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) return null;
    
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const response = await fetch('/api/love-messages/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao fazer upload da imagem');
      }
      
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      setSubmitMessage('Erro ao fazer upload da imagem.');
      setTimeout(() => setSubmitMessage(''), 5000);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author_name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    try {
      // Upload image if selected
      let imageUrl = formData.image_url;
      if (selectedImage) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if image upload failed
        }
      }

      const messageData = {
        ...formData,
        image_url: imageUrl
      };

      await createMessage(messageData);
      
      // Reset form
      setFormData({ author_name: '', message: '', pet_name: '', pet_type: '', image_url: '' });
      setSelectedImage(null);
      setImagePreview('');
      setShowForm(false);
      setSubmitMessage('Mensagem enviada com sucesso! Será analisada antes de aparecer no mural.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>Correios Love</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Mural do
            <br />
            <span className="text-cyan-500">
              Amor pelos Pets
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Aqui nossos clientes compartilham o amor pelos seus pets e as experiências incríveis no Clube dos Bichos.
          </p>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>Compartilhar Minha História</span>
            </button>
          )}
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center">
            {submitMessage}
          </div>
        )}

        {/* Message Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compartilhe Seu Amor</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Como você se chama?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do seu pet
                  </label>
                  <input
                    type="text"
                    value={formData.pet_name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, pet_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Nome do seu amiguinho"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo do pet
                </label>
                <select
                  value={formData.pet_type || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, pet_type: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua mensagem *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Conte como foi sua experiência no Clube dos Bichos..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto do seu pet (opcional)
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-orange-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-500">ou</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de uma foto online
                    </label>
                    <input
                      type="url"
                      value={formData.image_url || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://exemplo.com/foto-do-pet.jpg"
                      disabled={!!selectedImage}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingImage}
                  className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {uploadingImage ? 'Enviando foto...' : isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando mensagens...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Seja o primeiro a compartilhar sua história de amor!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{message.author_name}</h4>
                    {message.pet_name && (
                      <p className="text-sm text-gray-600">
                        Pet: {message.pet_name} {message.pet_type && `(${message.pet_type})`}
                      </p>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{message.created_at && formatDate(message.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{message.message}</p>
                
                {message.image_url && (
                  <div className="mt-4">
                    <img
                      src={message.image_url}
                      alt={`Foto do ${message.pet_name || 'pet'}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">❤️ Clube dos Bichos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
