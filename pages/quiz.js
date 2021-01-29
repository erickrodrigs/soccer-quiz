import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AlternativesForm from '../src/components/AlternativesForm';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          { results.reduce((acc, result) => (result ? acc + 1 : acc), 0) }
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => {
            const resultId = `result__${index}`;

            return (
              <li key={resultId}>
                {`#${index + 1} resultado: `}
                {result ? 'Acertou!' : 'Errou!'}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, addResult, onSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmitted(true);

            setTimeout(() => {
              setIsQuestionSubmitted(false);

              document
                .getElementById(`alternative__${selectedAlternative}`)
                .checked = false;

              addResult(isCorrect);
              setSelectedAlternative(undefined);
              onSubmit();
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>

          { isQuestionSubmitted && isCorrect && <p>Você acertou!</p> }
          { isQuestionSubmitted && !isCorrect && <p>Você errou!</p> }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    answer: PropTypes.number.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  totalQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  addResult: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

QuestionWidget.defaultProps = {
  question: {},
};

const screenStates = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.LOADED);
    }, 1 * 1000);
  }, []);

  function addResult(isCorrect) {
    setResults([...results, isCorrect]);
  }

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADED && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            addResult={addResult}
            onSubmit={handleSubmit}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
          && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
