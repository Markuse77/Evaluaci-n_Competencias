
import React from 'react';
import { User } from '../types.ts';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-brand-primary shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                 <h1 className="text-xl font-bold text-white">Plataforma de Autoevaluación</h1>
                 {user && user.companyName && <p className="text-xs text-gray-border">{user.companyName}</p>}
            </div>
          </div>
          {user && (
            <div className="flex items-center">
                <span className="text-white hidden sm:block">
                    Bienvenido, <span className="font-semibold">{user.name}</span>
                </span>
                <button 
                    onClick={onLogout}
                    className="ml-4 bg-white text-brand-primary font-semibold py-2 px-4 rounded-md hover:bg-brand-light transition duration-200 text-sm"
                >
                    Salir
                </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;