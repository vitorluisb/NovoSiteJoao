import { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/react-app/hooks/useAuth.tsx';
import { Heart, Shield } from 'lucide-react';

export default function AdminLogin() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login({ email, password });
    
    if (!success) {
      setError('Email ou senha inválidos');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-orange-500" />
            <Shield className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Clube dos Bichos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="admin@clubedosbichos.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Login: admin@clubedosbichos.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
}
