'use client';

import { useEffect, useState } from 'react';
import DropdownComponent from './components/dropdown';

interface CsvData {
  createdAt: Date;
  filename: string;
}



const FirstPage = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [sortedData, setSortedData] = useState<CsvData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortOptions = [
    'Sort by created at ascendent',
    'Sort by filename ascendent',
    'Sort by filename descendent',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filename');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        const parsedData = result.data.map((item: CsvData) => ({
          createdAt: new Date(item.createdAt),
          filename: item.filename,
        }));

        setData(parsedData);
        setSortedData(parsedData); // Set initial sorted data
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (selectedOption: string) => {
    const sorted = [...data];

    if (selectedOption === 'Sort by created at ascendent') {
      sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (selectedOption === 'Sort by filename ascendent') {
      sorted.sort((a, b) => compareFilenames(a.filename, b.filename));
    } else if (selectedOption === 'Sort by filename descendent') {
      sorted.sort((a, b) => compareFilenames(b.filename, a.filename));
    }

    setSortedData(sorted);
  };

  const compareFilenames = (a: string, b: string) => {
    const aParts = a.match(/\d+|\D+/g) || [];
    const bParts = b.match(/\d+|\D+/g) || [];

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || '';
      const bPart = bParts[i] || '';

      const aIsNumber = /^\d+$/.test(aPart);
      const bIsNumber = /^\d+$/.test(bPart);

      if (aIsNumber && bIsNumber) {
        const diff = parseInt(aPart, 10) - parseInt(bPart, 10);
        if (diff !== 0) return diff;
      } else if (aPart !== bPart) {
        return aPart.localeCompare(bPart);
      }
    }
    return 0;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center mt-[5%]">
      <DropdownComponent sortOptions={sortOptions} onSortChange={handleSortChange} />
      <div className="grid grid-cols-2 gap-24 mt-6">
        {sortedData.map((item, index) => (
          <div
            className="p-4 border rounded-md shadow-md bg-black text-white text-center"
            key={index}
          >
            <p className="text-lg font-semibold">
              {item.createdAt.toLocaleDateString()} {item.createdAt.toLocaleTimeString()}
            </p>
            <p className="text-sm text-white mt-2">{item.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstPage;
