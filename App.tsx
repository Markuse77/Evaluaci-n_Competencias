import React, { useState, useCallback } from 'react';
import { User, EvaluationResult } from './types';
import { BEHAVIORS, EVALUATION_OPTIONS } from './constants';
import { fetchUserById } from './services/userService';
import { saveEvaluation } from './services/evaluationService';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Instructions from './components/Instructions';
import EvaluationForm from './components/EvaluationForm';
import Results from './components/Results';
import Header from './components/Header';

type View = 'login' | 'welcome' | 'instructions' | 'evaluation' | 'results';
export type FormAnswer = { score: number; justification: string };

const App: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult[] | null>(null);
  const [evaluationDate, setEvaluationDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUser = await fetchUserById(id);
      if (fetchedUser) {
        setUser(fetchedUser);
        setView('welcome');
      } else {
        setError('ID de usuario no encontrado. Por favor, intente de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Verifique su red y que la hoja de cálculo esté publicada.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleShowInstructions = useCallback(() => {
    setView('instructions');
  }, []);

  const handleStartEvaluation = useCallback(() => {
    setView('evaluation');
  }, []);

  const handleEvaluationSubmit = useCallback((answers: FormAnswer[]) => {
    if (!user) return;
    const userBehaviors = BEHAVIORS[user.level];
    const results: EvaluationResult[] = userBehaviors.map((behavior, index) => ({
      behavior,
      score: answers[index].score,
      justification: answers[index].justification,
      option: EVALUATION_OPTIONS.find(opt => opt.value === answers[index].score)?.label || ''
    }));
    setEvaluation(results);
    setEvaluationDate(new Date());
    setView('results');

    // Save the evaluation results in the background.
    // We don't await this because we want the user to see their results immediately.
    // The saveEvaluation function handles its own errors internally.
    saveEvaluation(user, results);
    
  }, [user]);

  const handleRestart = useCallback(() => {
    setEvaluation(null);
    setEvaluationDate(null);
    setView('welcome');
  }, []);
  
  const handleLogout = useCallback(() => {
    setUser(null);
    setEvaluation(null);
    setEvaluationDate(null);
    setError(null);
    setView('login');
  }, []);

  const renderContent = () => {
    if (!user) {
      return <Login onLogin={handleLogin} error={error} isLoading={isLoading} />;
    }

    switch (view) {
      case 'welcome':
        return <Welcome user={user} onStart={handleShowInstructions} />;
      case 'instructions':
        return <Instructions onProceed={handleStartEvaluation} />;
      case 'evaluation':
        const behaviors = BEHAVIORS[user.level];
        return <EvaluationForm behaviors={behaviors} onSubmit={handleEvaluationSubmit} />;
      case 'results':
        return evaluation && user && evaluationDate && <Results user={user} evaluation={evaluation} onRestart={handleRestart} evaluationDate={evaluationDate} />;
      default:
        return <Login onLogin={handleLogin} error={error} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col">
      <Header user={user} onLogout={handleLogout}/>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-subtle text-sm">
        <p>&copy; {new Date().getFullYear()} Self-Evaluation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;