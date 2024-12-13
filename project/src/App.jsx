import React, { useState } from 'react';
import { questions } from './data/testData';
import ReadingPassage from './components/ReadingPassage';
import StudentForm from './components/StudentForm';
import MCQSection from './components/MCQSection';
import FillBlanksSection from './components/FillBlanksSection';
import ShortAnswerSection from './components/ShortAnswerSection';
import { saveStudentSubmission } from './utils/database';

function App() {
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '' });
  const [answers, setAnswers] = useState({
    mcq: {},
    fillBlanks: {},
    shortAnswer: {}
  });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await saveStudentSubmission(studentInfo, answers);
      setScore(result);
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('Failed to submit test. Please try again.');
      console.error('Submission error:', err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Test Submitted Successfully!</h2>
            <p className="text-lg">Thank you, {studentInfo.name}!</p>
            <p className="text-lg">Your responses have been recorded.</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Score Breakdown:</h3>
              <p className="text-lg">MCQ Score: {score.breakdown.mcq}</p>
              <p className="text-lg">Fill in the Blanks Score: {score.breakdown.fillBlanks}</p>
              <p className="text-lg font-bold mt-2">Total Score: {score.score}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Mock Test</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <StudentForm studentInfo={studentInfo} setStudentInfo={setStudentInfo} />
          <ReadingPassage />
          <MCQSection 
            questions={questions.mcq} 
            answers={answers} 
            setAnswers={setAnswers} 
          />
          <FillBlanksSection 
            questions={questions.fillBlanks} 
            answers={answers} 
            setAnswers={setAnswers} 
          />
          <ShortAnswerSection 
            questions={questions.shortAnswer} 
            answers={answers} 
            setAnswers={setAnswers} 
          />
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;