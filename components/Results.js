import React, { useState, useRef } from 'react';
import { User, EvaluationResult } from '../types.js';
import Card from './Card.js';
import Loader from './Loader.js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResultsProps {
  user: User;
  evaluation: EvaluationResult[];
  onRestart: () => void;
  evaluationDate: Date;
}

const Results: React.FC<ResultsProps> = ({ user, evaluation, onRestart, evaluationDate }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const chartData = evaluation.map((result, index) => ({
      name: `C${index + 1}`,
      Puntuación: result.score,
      Comportamiento: result.behavior,
  }));

  const formattedDate = evaluationDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadPdf = async () => {
    const element = printAreaRef.current;
    if (!element || isDownloading) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { 
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#FAFAFA' // Match body bg color for consistency
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      let imgHeight = pdfWidth / ratio;
      
      // Avoid image being larger than the page
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
      }

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`autoevaluacion-resultados-${user.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className="w-full space-y-6">
      <div ref={printAreaRef}>
        <Card>
            <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-4">Resultados de la Autoevaluación</h1>
                
                <div className="mb-8 p-4 border border-gray-border rounded-lg bg-brand-light">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">Información del Reporte</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-brand-dark">
                        <div><strong>Nombre:</strong> {user.name}</div>
                        <div><strong>DNI:</strong> {user.id}</div>
                        <div><strong>Entidad:</strong> {user.companyName}</div>
                        <div><strong>Cargo:</strong> {user.charge}</div>
                        <div className="sm:col-span-2"><strong>Fecha de Evaluación:</strong> {formattedDate}</div>
                    </div>
                </div>

                <p className="text-gray-text mb-6">A continuación se muestra un resumen de sus respuestas.</p>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">Gráfico de Resultados</h2>
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={90} domain={[0, 3]} tickCount={4}/>
                                <Tooltip contentStyle={{backgroundColor: '#fff', border: '1px solid #ccc'}} formatter={(value, name, props) => [`${value} - ${props.payload.Comportamiento}`, 'Puntuación']} />
                                <Legend />
                                <Radar name="Puntuación" dataKey="Puntuación" stroke="#90142E" fill="#90142E" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold text-brand-primary mb-4">Leyenda de Comportamientos</h2>
                  <div className="overflow-x-auto rounded-lg border border-gray-border shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-brand-light text-xs text-brand-dark uppercase tracking-wider">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-semibold" style={{ width: '10%' }}>
                            Código
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold">
                            Comportamiento
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.map((item) => (
                          <tr key={item.name} className="bg-white border-b border-gray-border last:border-b-0 hover:bg-gray-50">
                            <td className="px-4 py-3 font-bold text-brand-dark align-top">
                              {item.name}
                            </td>
                            <td className="px-4 py-3 text-gray-text">
                              {item.Comportamiento}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 text-center flex justify-center items-center gap-4 flex-wrap">
            <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-transform transform hover:scale-105 disabled:bg-gray-disabled disabled:cursor-not-allowed"
            >
                {isDownloading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader />
                        <span>Descargando PDF...</span>
                    </span>
                ) : 'Descargar PDF'}
            </button>
            <button
                onClick={onRestart}
                className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
            >
                Realizar otra evaluación
            </button>
        </div>
      </Card>
    </div>
  );
};

export default Results;