import React, { useState } from 'react';
import Card from './Card.js';
import Loader from './Loader.js';

interface LoginProps {
  onLogin: (id: string) => void;
  error: string | null;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, error, isLoading }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim() && !isLoading) {
      onLogin(id.trim());
    }
  };

  return (
    <Card>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">Bienvenido</h1>
        <p className="text-gray-text mb-6">Por favor, ingrese su número de ID para comenzar su autoevaluación.</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Número de ID"
            className="w-full max-w-xs px-4 py-3 mb-4 text-lg border-2 border-gray-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
            aria-label="Número de ID"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full max-w-xs bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105 disabled:bg-gray-disabled disabled:cursor-not-allowed"
            disabled={isLoading || !id.trim()}
          >
            {isLoading ? <Loader /> : 'Ingresar'}
          </button>
          {error && <p className="mt-4 text-brand-accent font-semibold">{error}</p>}
        </form>
      </div>
    </Card>
  );
};

export default Login;