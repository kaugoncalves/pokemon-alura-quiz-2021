import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GithubCorner'


export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`





export default function Home() {
  return (

    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>


        <Widget>
        <Widget.Header>
              Pokemon
      </Widget.Header>

          <Widget.Content>
            <h1>Salve salve</h1>

            <p>aaaaaaaaaaaaaaa</p>
          </Widget.Content>
        </Widget>


        <Widget>
        <Widget.Header>
              Pokemon
      </Widget.Header>
      
          <Widget.Content>
            <h1>Salve salve2</h1>

            <p>aaaaaaaaaaaaaaa2</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/kaugoncalves" />

    </QuizBackground>

  );
}
