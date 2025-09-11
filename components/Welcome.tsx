
import React from 'react';
import { User } from '../types.ts';
import Card from './Card.tsx';

interface WelcomeProps {
  user: User;
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ user, onStart }) => {
  return (
    <Card>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">¡Hola, {user.name}!</h1>
        <p className="text-gray-text mb-4">Bienvenido a la plataforma de autoevaluación.</p>
        <div className="bg-white p-4 rounded-lg text-left mb-6 max-w-md mx-auto border border-gray-border">
            <p className="text-lg"><span className="font-semibold">Entidad:</span> {user.companyName}</p>
            <p className="text-lg"><span className="font-semibold">Cargo:</span> {user.charge}</p>
            <p className="text-lg"><span className="font-semibold">Segmento:</span> {user.level}</p>
        </div>
        <p className="text-gray-text mb-8">
            Está a punto de comenzar su evaluación de comportamientos. Por favor, tómese su tiempo y responda con honestidad.
        </p>
        <button
          onClick={onStart}
          className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
        >
          Comenzar Evaluación
        </button>
      </div>
    </Card>
  );
};

export default Welcome;