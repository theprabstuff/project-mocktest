import React from 'react';

const FillBlanksSection = ({ questions, answers, setAnswers }) => {
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      fillBlanks: { ...prev.fillBlanks, [questionId]: answer }
    }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Fill in the Blanks</h3>
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="mb-2 font-medium">{q.question}</p>
          <input
            type="text"
            value={answers.fillBlanks[q.id] || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Type your answer here"
          />
        </div>
      ))}
    </div>
  );
};

export default FillBlanksSection;