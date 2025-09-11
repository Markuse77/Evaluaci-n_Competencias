
import { ChargeLevel } from './types.ts';

export const BEHAVIORS: { [key in ChargeLevel]: string[] } = {
  [ChargeLevel.DIRECTIVO]: [
    "Identifica los medios y estrategias que debe utilizar para superar a sus metas y objetivos.",
    "Se anticipa a los plazos establecidos y calcula riesgos previniendo situaciones inesperadas.",
    "Plantea mejoras en los procesos y propone cambios a fin de superar los resultados previstos en términos de cantidad y calidad.",
    "Genera alternativas de solución ante la falta o posible carencia de recursos, teniendo en cuenta un uso eficiente de los mismos.",
    "Identifica con anticipación las necesidades del usuario, planificando los servicios y/o procesos de su competencia.",
    "Propone alternativas de solución facilitando respuestas integrales y sustentadas, a fin de asegurar servicios óptimos en forma oportuna y cordial.",
    "Utiliza diversos medios para conocer las necesidades y expectativas del usuario con el fin de mejorar el nivel del servicio.",
    "Integra esfuerzos entre los miembros del equipo y la cooperación con otras áreas o entidades para el logro de los objetivos.",
    "Promueve el intercambio de información solicitando ideas y opiniones, mostrándose dispuesto a enseñar y a aprender de los demás miembros del equipo.",
    "Incentiva la cohesión del equipo a través de una comunicación abierta, transparente y respetuosa entre sus compañeros, promoviendo el máximo grado de consenso."
  ],
  [ChargeLevel.MANDO_MEDIO]: [
    "Realiza las actividades asignadas siguiendo las instrucciones recibidas, contribuyendo así al logro de los objetivos.",
    "Ejecuta los trabajos asignados en los plazos límite y de acuerdo con las indicaciones y/o estándares recibidos.",
    "Cumple con sus tareas haciendo uso adecuado de los recursos asignados.",
    "Atiende los requerimientos del usuario, brindando respuestas oportunas dentro del ámbito de sus funciones.",
    "Dar respuesta con la información que conoce o maneja y cumpliendo con las instrucciones, procesos o estándares definidos dentro del servicio.",
    "Escucha y responde con cordialidad los requerimientos del usuario.",
    "Ejecuta las decisiones tomadas en el equipo, realizando la parte del trabajo que le corresponde y contribuyendo al logro de los objetivos.",
    "Facilita información mínima para el cumplimiento de los objetivos.",
    "Mantiene un ambiente de cordialidad en el trabajo."
  ],
  [ChargeLevel.EJECUTOR]: [
    "Organiza sus actividades priorizándolas de acuerdo a las metas y objetivos previstos, estableciendo con claridad los plazos de cumplimiento.",
    "Establece controles previos con el fin de cumplir con el nivel de calidad esperado, evitando errores en la realización de sus labores.",
    "Identifica los recursos necesarios para el logro de metas y objetivos, haciendo esfuerzo por optimizar su uso.",
    "Escucha activamente las necesidades del usuario, mostrando empatía al atender sus requerimientos, cumpliendo con sus expectativas, dentro de su competencia.",
    "Consulta y utiliza la información que tiene disponible a fin de completar y finalizar el servicio al usuario.",
    "Atiende con paciencia y tolerancia al usuario, mostrando consideración e interés frente a sus necesidades, aún en situaciones complejas.",
    "Conoce el objetivo común del equipo y coordina con sus compañeros las tareas y actividades a ejecutar, pensando en su consecución.",
    "Comparte información y aporta ideas y soluciones al equipo para el logro de los objetivos en común.",
    "Mantiene vínculos cordiales con los demás miembros del equipo, que favorecen al cumplimiento de objetivos en común."
  ],
  [ChargeLevel.OPERADOR_ASISTENCIA]: [
    "Realiza las actividades asignadas siguiendo las instrucciones recibidas, contribuyendo así al logro de los objetivos.",
    "Ejecuta los trabajos asignados en los plazos límite y de acuerdo con las indicaciones y/o estándares recibidos.",
    "Cumple con sus tareas haciendo uso adecuado de los recursos asignados.",
    "Atiende los requerimientos del usuario, brindando respuestas oportunas dentro del ámbito de sus funciones.",
    "Dar respuesta con la información que conoce o maneja y cumpliendo con las instrucciones, procesos o estándares definidos dentro del servicio.",
    "Escucha y responde con cordialidad los requerimientos del usuario.",
    "Ejecuta las decisiones tomadas en el equipo, realizando la parte del trabajo que le corresponde y contribuyendo al logro de los objetivos.",
    "Facilita información mínima para el cumplimiento de los objetivos.",
    "Mantiene un ambiente de cordialidad en el trabajo."
  ]
};

export const EVALUATION_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "No demuestra la conducta" },
  { value: 1, label: "Eventualmente" },
  { value: 2, label: "Con frecuencia" },
  { value: 3, label: "Permanentemente" }
];