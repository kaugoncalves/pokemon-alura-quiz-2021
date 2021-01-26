/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget/Index.js';
import QuizLogo from '../src/components/QuizLogo/Index.js';
import QuizBackground from '../src/components/QuizBackground/Index.js';
import Footer from '../src/components/Footer/Index.js';
import GitHubCorner from '../src/components/GithubCorner/Index.js';
import { useRouter } from 'next/router';

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

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');


  return (

    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura quiz - Pokemon</title>
      </Head>
      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            Pokemon
          </Widget.Header>

          <Widget.Content>
            <p> Teste aqui seues conhecimentos em jogos de pokemon! </p>
            <form onSubmit={function (infosEvento) {
              infosEvento.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log("Fez um submit");
            }}> 


            <input onChange={function (infosEvento) {
              setName(infosEvento.target.value);
              console.log(infosEvento.target.value);

            }} 
            
            placeholder="Fale seu nome" />
            <button type="submit" disabled={name.length === 0}>
              jogar {name}
            </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            Quizes da galera
          </Widget.Header>

          <Widget.Content>
            <h1>Oia la hein</h1>

            <p>aqui</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/kaugoncalves" />

    </QuizBackground>

  );
}
