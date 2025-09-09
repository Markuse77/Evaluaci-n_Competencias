import { User, ChargeLevel } from '../types';

// New URL for the published Google Sheet, exported as CSV
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRAp02geyYNznRwUhpttM7usC2XWAbhgJarNY5OOi9gj6JnDV9HZrxEwtt7GEbAfonOL9eiFJh0owxD/pub?gid=0&single=true&output=csv';

// Map sheet values to ChargeLevel enum
const levelMap: { [key: string]: ChargeLevel } = {
  'DIRECTIVO': ChargeLevel.DIRECTIVO,
  'MANDO MEDIO': ChargeLevel.MANDO_MEDIO,
  'EJECUTOR': ChargeLevel.EJECUTOR,
  'OPERADOR Y DE ASISTENCIA': ChargeLevel.OPERADOR_ASISTENCIA,
};

/**
 * A simple CSV parser. This is not fully RFC 4180 compliant but will
 * handle basic cases, including quoted fields containing commas.
 * @param {string} csvText The raw CSV text.
 * @returns {string[][]} A 2D array of strings representing the data.
 */
const parseCSV = (csvText: string): string[][] => {
    const lines = csvText.split(/\r?\n/);
    const result: string[][] = [];

    for (const line of lines) {
        if (!line.trim()) continue; // Skip empty lines
        
        const row: string[] = [];
        let currentField = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                // If we see a quote, check if it's an escaped quote ("")
                if (inQuotes && line[i + 1] === '"') {
                    currentField += '"';
                    i++; // Skip the next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentField);
                currentField = '';
            } else {
                currentField += char;
            }
        }
        row.push(currentField); // Add the last field
        result.push(row);
    }
    return result;
}

export const fetchUserById = async (id: string): Promise<User | undefined> => {
  console.log(`Searching for user with ID: ${id} using CSV export.`);
  try {
    // Add a cache-busting parameter to prevent "Failed to fetch" errors from aggressive caching/proxies.
    const url = `${GOOGLE_SHEET_CSV_URL}&timestamp=${new Date().getTime()}`;
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const csvText = await response.text();
    const data = parseCSV(csvText);

    if (data.length < 2) {
      throw new Error("CSV data is empty or has no header row.");
    }

    const header = data[0];
    const idColIndex = header.indexOf('N° de doc.');
    const nameColIndex = header.indexOf('Apellidos y Nombres');
    const chargeColIndex = header.indexOf('Puesto');
    const levelColIndex = header.indexOf('Segmento');
    const companyColIndex = header.indexOf('Nombre_Entidad');
    
    if ([idColIndex, nameColIndex, chargeColIndex, levelColIndex, companyColIndex].includes(-1)) {
        console.error("Missing columns. Required: 'N° de doc.', 'Apellidos y Nombres', 'Puesto', 'Segmento', 'Nombre_Entidad'. Found:", header);
        throw new Error("One or more required columns are missing in the Google Sheet.");
    }

    // Start from 1 to skip header row
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const docId = row[idColIndex];
        
        if (docId && docId.trim() === id) {
            const levelString = row[levelColIndex]?.toUpperCase().trim();
            const level = levelMap[levelString] || ChargeLevel.OPERADOR_ASISTENCIA;

            const user: User = {
                id: docId.trim(),
                name: row[nameColIndex]?.trim() ?? '',
                charge: row[chargeColIndex]?.trim() ?? '',
                level: level,
                companyName: row[companyColIndex]?.trim() ?? '',
            };
            return user;
        }
    }

    return undefined; // User not found
  } catch (error) {
    console.error("Error fetching or parsing Google Sheet data:", error);
    throw error;
  }
};