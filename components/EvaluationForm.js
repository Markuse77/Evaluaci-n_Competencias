import React, { useState, useEffect, useRef } from 'react';
import { EVALUATION_OPTIONS } from '../constants.js';
import { FormAnswer } from '../App.js';
import Card from './Card.js';

interface EvaluationFormProps {
  behaviors: string[];
  onSubmit: (answers: FormAnswer[]) => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ behaviors, onSubmit }) => {
  const [answers, setAnswers] = useState(() =>
    behaviors.map(() => ({ score: null as number | null, justification: '' }))
  );
  const [currentStep, setCurrentStep] = useState(0);

  const handleAnswerChange = (index: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[index].score = score;
    setAnswers(newAnswers);
  };

  const handleJustificationChange = (index: number, justification: string) => {
    const newAnswers = [...answers];
    newAnswers[index].justification = justification;
    setAnswers(newAnswers);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    // Advance on Enter key press (but not Shift+Enter for new lines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const isCurrentStepComplete = answers[index].score !== null && answers[index].justification.trim() !== '';
      const isNotLastStep = index < behaviors.length - 1;

      if (isCurrentStepComplete && isNotLastStep) {
        // Only advance if we are on the current max step to avoid jumping from old steps
        if (index === currentStep) {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };
  
  // Effect to scroll and focus the new active step
  useEffect(() => {
    const element = document.getElementById(`behavior-item-${currentStep}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Focus the textarea of the current step after the scroll animation
    const timer = setTimeout(() => {
        const textarea = document.getElementById(`justification-${currentStep}`) as HTMLTextAreaElement;
        if(textarea) textarea.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentStep]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAllComplete) {
      const finalAnswers = answers.map(a => ({ score: a.score!, justification: a.justification }));
      onSubmit(finalAnswers);
    }
  };

  const isAllComplete = answers.every(a => a.score !== null && a.justification.trim() !== '');
  const completedCount = answers.filter(a => a.score !== null && a.justification.trim() !== '').length;
  const progress = (completedCount / behaviors.length) * 100;

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-2">Formulario de Autoevaluación</h1>
        <p className="text-gray-text mb-6">Evalúe cada comportamiento, justifique su respuesta y presione 'Enter' en el cuadro de texto para continuar.</p>
        
        <div className="w-full bg-gray-border rounded-full h-2.5 mb-8">
          <div className="bg-brand-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {behaviors.map((behavior, index) => (
              <div
                id={`behavior-item-${index}`}
                key={index}
                className={`p-4 bg-brand-light rounded-lg border border-gray-border shadow-sm transition-opacity duration-500 ${index > currentStep ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                aria-hidden={index > currentStep}
              >
                <p className="font-semibold text-brand-dark mb-3">{index + 1}. {behavior}</p>
                <fieldset className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-start gap-4" disabled={index > currentStep}>
                  <legend className="sr-only">Opciones para: {behavior}</legend>
                  {EVALUATION_OPTIONS.map(option => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`behavior-${index}-option-${option.value}`}
                        name={`behavior-${index}`}
                        value={option.value}
                        checked={answers[index].score === option.value}
                        onChange={() => handleAnswerChange(index, option.value)}
                        className="h-4 w-4 text-brand-primary border-gray-border focus:ring-brand-primary"
                        required={index <= currentStep}
                      />
                      <label htmlFor={`behavior-${index}-option-${option.value}`} className="ml-2 block text-sm text-gray-text">
                        {`${option.value} - ${option.label}`}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <div className="mt-4">
                  <label htmlFor={`justification-${index}`} className="block text-sm font-medium text-gray-text mb-1">
                    Describe el evento laboral que sustenta tu valoración
                  </label>
                  <textarea
                    id={`justification-${index}`}
                    name={`justification-${index}`}
                    rows={3}
                    value={answers[index].justification}
                    onChange={(e) => handleJustificationChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full px-3 py-2 text-base border border-gray-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
                    placeholder="Sea específico... (Presione Enter para avanzar)"
                    disabled={index > currentStep}
                    required={index <= currentStep}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
             {currentStep === behaviors.length - 1 && (
              <button
                type="submit"
                disabled={!isAllComplete}
                className="w-full max-w-xs bg-brand-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-transform transform hover:scale-105 disabled:bg-gray-disabled disabled:cursor-not-allowed disabled:text-gray-subtle"
              >
                Enviar Evaluación
              </button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default EvaluationForm;