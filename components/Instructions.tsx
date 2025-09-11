
import React from 'react';
import Card from './Card.tsx';

interface InstructionsProps {
  onProceed: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onProceed }) => {
  return (
    <Card>
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-4">Instrucciones para la Autoevaluación</h1>
        
        <div className="space-y-4 text-gray-text">
          <p>A través del presente formulario realizarás la <strong>AUTOEVALUACIÓN DE TUS COMPETENCIAS</strong> como servidor civil.</p>
          <p>Considera que el periodo de observación de los comportamientos esperados es <strong>agosto a octubre de 2025</strong>.</p>
          <p>A continuación, te presentaremos los 9 comportamientos esperados para el segmento del puesto que ocupas (10 en el caso de directivo). Compara cada uno con tu comportamiento laboral habitual, y elije una de las 4 alternativas:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>No demuestra el comportamiento</li>
            <li>Demuestra el comportamiento eventualmente (pocas veces).</li>
            <li>Demuestra el comportamiento con frecuencia (la mayoría de las veces).</li>
            <li>Demuestra el comportamiento permanentemente (siempre).</li>
          </ul>
          <p>Cabe precisar que, si en en algún comportamiento deseado la elección es "No demuestra el comportamiento", se adicionará el nivel inmediato previo de este, para ser valorado bajo las mismos 4 alternativas.</p>
          <p>Finalmente, describe brevemente el evento o hecho más relevante que te ha permitido realizar esta valoración, señalando la situación (contexto), el comportamiento demostrado, así como el resultado y/o efecto que ese comportamiento ocasionó.</p>

          <div className="mt-6 p-4 bg-brand-light border border-gray-border rounded-lg">
            <h2 className="font-semibold text-brand-dark mb-2">Por ejemplo:</h2>
            <p className="italic">Supongamos que para el comportamiento esperado " Escucha activamente las necesidades del usuario, mostrando empatía al atender sus requerimientos, cumpliendo con sus expectativas, dentro de su competencia"  se elige la alternativa "Demuestra el comportamiento con frecuencia (la mayoría de las veces)".</p>
            <p className="mt-2">El evento laboral que sustenta la alternativa elegida sería el siguiente:</p>
            <blockquote className="mt-2 pl-4 border-l-4 border-gray-border text-gray-subtle italic">
              "En el mes de mayo, me encargaron realizar seguimiento y monitoreo a las áreas de mi entidad para la ejecución de su POI. Los servidores de las áreas no conocían como entregar la información solicitada por lo que programé reuniones de trabajo para capacitarlos. Sin embargo, no realicé todas las programadas. El resultado fue que no todas las áreas entregaron toda la información requerida y el impacto, que no se pudo cumplir adecuadamente con la información al CEPLAN".
            </blockquote>
          </div>

          <p className="mt-4">Como puedes notar, el evento laboral que sustenta la valoración realizada (alternativa elegida) sigue la siguiente estructura de redacción:</p>
          <ol className="list-decimal list-inside pl-4 space-y-1 font-medium">
              <li>Situación laboral relacionada con el comportamiento esperado.</li>
              <li>Comportamiento del servidor frente a esa situación laboral.</li>
              <li>Resultado de ese comportamiento (efecto inmediato).</li>
              <li>Impacto (efecto posterior al resultado, si lo hubiera).</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onProceed}
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
          >
            Entendido, Comenzar Evaluación
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Instructions;
