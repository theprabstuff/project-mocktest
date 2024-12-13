export const calculateMCQScore = (answers, questions) => {
  return Object.entries(answers).reduce((score, [id, answer]) => {
    const question = questions.find(q => q.id === parseInt(id));
    return score + (answer === question?.correctAnswer ? 1 : 0);
  }, 0);
};

export const calculateFillBlanksScore = (answers, questions) => {
  return Object.entries(answers).reduce((score, [id, answer]) => {
    const question = questions.find(q => q.id === parseInt(id));
    return score + (answer.toLowerCase() === question?.correctAnswer.toLowerCase() ? 1 : 0);
  }, 0);
};

export const calculateTotalScore = (answers, allQuestions) => {
  const mcqScore = calculateMCQScore(answers.mcq, allQuestions.mcq);
  const fillBlanksScore = calculateFillBlanksScore(answers.fillBlanks, allQuestions.fillBlanks);
  
  // Short answers need manual review, so we don't include them in automatic scoring
  return {
    mcqScore,
    fillBlanksScore,
    totalScore: mcqScore + fillBlanksScore
  };
};