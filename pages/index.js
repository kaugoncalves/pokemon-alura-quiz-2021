import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';


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
            <p> Teste aqui seus conhecimentos no mundo pokémon! </p>
            <form onSubmit={function (infosEvento) {
              infosEvento.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log("Fez um submit");
            }}> 


            <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Digite seu nome"
                value={name}
              />
              
            <Button type="submit" disabled={name.length === 0}>
              {`jogar ${name}`}
            </Button>
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
