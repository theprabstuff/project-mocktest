import React from 'react';
import { readingPassage } from '../data/passage';

const ReadingPassage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Reading Passage</h2>
      <div className="prose max-w-none">
        {readingPassage.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReadingPassage;