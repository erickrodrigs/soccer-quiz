import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';
import Button from '../src/components/Button';

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

function QuestionWidget({ question, totalQuestions, questionIndex }) {
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

        <form>
          {question.alternatives.map((alternative, index) => (
            <Widget.Topic
              as="label"
              htmlFor={`alternative__${index}`}
            >
              <input
                id={`alternative__${index}`}
                name={questionId}
                type="radio"
              />
              {alternative}
            </Widget.Topic>
          ))}

          <Button type="submit">
            Confirmar
          </Button>
        </form>
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
  const questionIndex = 0;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.LOADED);
    }, 1 * 1000);
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADED && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
      </QuizContainer>
    </QuizBackground>
  );
}
