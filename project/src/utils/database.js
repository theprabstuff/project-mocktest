import { questions } from '../data/testData';
import { calculateTotalScore } from './scoring';

// Using IndexedDB for browser storage
const DB_NAME = 'mockTestDB';
const DB_VERSION = 1;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create students store
      if (!db.objectStoreNames.contains('students')) {
        const studentStore = db.createObjectStore('students', { keyPath: 'id', autoIncrement: true });
        studentStore.createIndex('email', 'email', { unique: true });
      }

      // Create submissions store
      if (!db.objectStoreNames.contains('submissions')) {
        const submissionStore = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
        submissionStore.createIndex('studentId', 'studentId', { unique: false });
      }
    };
  });
};

export const saveStudentSubmission = async (studentInfo, answers) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(['students', 'submissions'], 'readwrite');
    
    // Save student
    const studentStore = transaction.objectStore('students');
    const studentRequest = studentStore.add({
      name: studentInfo.name,
      email: studentInfo.email,
      createdAt: new Date().toISOString()
    });

    return new Promise((resolve, reject) => {
      studentRequest.onsuccess = async () => {
        const studentId = studentRequest.result;
        
        // Calculate scores
        const { mcqScore, fillBlanksScore, totalScore } = calculateTotalScore(answers, questions);

        // Save submission
        const submissionStore = transaction.objectStore('submissions');
        const submission = {
          studentId,
          mcqAnswers: answers.mcq,
          fillBlankAnswers: answers.fillBlanks,
          shortAnswers: answers.shortAnswer,
          totalScore,
          submittedAt: new Date().toISOString()
        };

        const submissionRequest = submissionStore.add(submission);

        submissionRequest.onsuccess = () => {
          resolve({
            studentId,
            score: totalScore,
            breakdown: {
              mcq: mcqScore,
              fillBlanks: fillBlanksScore
            }
          });
        };

        submissionRequest.onerror = () => reject(submissionRequest.error);
      };

      studentRequest.onerror = () => reject(studentRequest.error);
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
};