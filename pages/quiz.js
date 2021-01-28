import React from 'react';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';
import Button from '../src/components/Button';

export default function QuizPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h3>
              Pergunta
              1
              de
              {` ${db.questions.length}`}
            </h3>
          </Widget.Header>

          <img
            alt="Descrição"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
            }}
            src="https://placehold.it/400x400"
          />

          <Widget.Content>
            <h2>
              Título
            </h2>
            <p>
              Descrição
            </p>

            <Button>
              Confirmar
            </Button>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
