import React from 'react';

const MCQSection = ({ questions, answers, setAnswers }) => {
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      mcq: { ...prev.mcq, [questionId]: answer }
    }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Multiple Choice Questions</h3>
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="mb-2 font-medium">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`mcq-${q.id}`}
                  value={option}
                  checked={answers.mcq[q.id] === option}
                  onChange={() => handleAnswerChange(q.id, option)}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MCQSection;