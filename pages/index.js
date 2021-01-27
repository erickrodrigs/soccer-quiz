import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.contrastText};
  font-weight: 700;
`;

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Soccer quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                type="text"
                placeholder="Diz seu nome aí"
                onChange={(event) => setName(event.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
                {' '}
                { name }
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quiz da galera</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
            }}
            >
              <Input
                type="text"
                placeholder="Coloque o user do github"
              />
              <Button type="submit">
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/erickrodrigs" />
    </QuizBackground>
  );
}
