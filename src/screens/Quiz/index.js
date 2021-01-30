import React from 'react';
import Widget from '../../../src/components/Widget';
import QuizLogo from '../../../src/components/QuizLogo';
import QuizBackground from '../../../src/components/QuizBackground';
import QuizContainer from '../../../src/components/QuizContainer';
import Button from '../../../src/components/Button';
import styled from 'styled-components';
import loadingGif from '../../Assets/Loading.gif'
import AlternativeForm from '../../../src/components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';



const Img = styled.img`
  max-width:300px;
  max-height:380px;
  width: auto;
  height: auto;
  object-fit: 'cover';
`
function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultados
      </Widget.Header>

      <Widget.Content> 
         <p>
        Você acertou
       
        {' '}

    {results.filter((x) => x).length}

      {' '}
      perguntas
      </p>
         <ul>
          {results.map((results, index) => (
            <li key={`result___${results}`}>
              {index +1 + 'ª'}
              {' '}
              Pergunta:
              {results == true ? ' Acertou✅' : ' Errou❌'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}


function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Img src={loadingGif} />
      </Widget.Content>
    </Widget>
  );
}


function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/"/> 
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`} 
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          maxWidth: '350px',
          maxHeight: '250px',
          width: '100%',
          height: '100%',
          objectFit: 'fill'
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

        <AlternativeForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);

          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  disabled={isQuestionSubmited}
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          

        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBG }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBG

  function addResult (result) {
    setResults([
      ...results,
      result,


    ])

  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1200);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}


        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}