import React from 'react';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function MyQuizPage() {
  return (
    <QuizScreen questions={db.questions} background={db.bg} />
  );
}
