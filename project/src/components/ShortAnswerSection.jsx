import React from 'react';

const ShortAnswerSection = ({ questions, answers, setAnswers }) => {
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      shortAnswer: { ...prev.shortAnswer, [questionId]: answer }
    }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Short Answer Questions</h3>
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="mb-2 font-medium">{q.question}</p>
          <textarea
            value={answers.shortAnswer[q.id] || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="4"
            placeholder="Type your answer here"
          />
        </div>
      ))}
    </div>
  );
};

export default ShortAnswerSection;