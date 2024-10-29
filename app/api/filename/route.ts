import {  NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the type for the CSV data.
interface CsvData {
  createdAt: Date;
  filename: string;
}

// Convert the raw CSV data into structured CsvData objects.
function parseCsvData(csvContent: string): CsvData[] {
  return csvContent
    .trim()
    .split('\n')
    .map((line) => {
      const [createdAt, filename] = line.split(';');
      return {
        createdAt: new Date(createdAt),
        filename: filename.trim(),
      };
    });
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data.csv');
    const csvContent = fs.readFileSync(filePath, 'utf-8'); // Read the CSV file
    const data = parseCsvData(csvContent); // Parse the CSV content

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json(
      { error: 'Failed to read the CSV file.' },
      { status: 500 }
    );
  }
}
