import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import QuizScreen from '../../src/screens/Quiz';

export default function AnotherQuiz({ externalDatabase }) {
  return (
    <ThemeProvider theme={externalDatabase.theme}>
      <QuizScreen
        questions={externalDatabase.questions}
        background={externalDatabase.bg}
      />
    </ThemeProvider>
  );
}

AnotherQuiz.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  externalDatabase: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const url = `https://${projectName}.${githubUser}.vercel.app/api/db`;

  const externalDatabase = await fetch(url)
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }

      throw new Error('Request failed');
    })
    .then((response) => response);

  return {
    props: {
      externalDatabase,
    },
  };
}
