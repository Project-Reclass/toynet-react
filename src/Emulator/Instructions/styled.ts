import styled from '@emotion/styled';

import { ReactComponent as Exit } from 'src/assets/buttons/backIcon.svg';


export const InstructionsContainer = styled.div`
  color: white;
  background-color: #454950;
  height: 100%;
  width: 15vw;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  word-wrap: break-word;
  padding-left: 2vh;
  padding-bottom: 3vh;
  overflow: auto;
  max-width: 335px;
  min-width: 250px;

  ::-webkit-scrollbar {
    width: 10px;
    color: #454950;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    border-radius: 10px;
    color: #454950;
  } 
`;

export const Container = styled.div`
    padding-top: 2vh;
    padding-right: 2vh;
`;

export const TaskList = styled.div`
  counter-reset: item;
  list-style-type: none;
  padding-left: 0vh;
`;

export const TaskItem = styled.li`
  display: flex;

  ::before { 
    display: inline-block;
    content: " "counter(item)". ";
    counter-increment: item;
    flex: 0 0 2em;
    width: 2em;
  }
`;

export const LinkText = styled.a`
  display: flex;
  color: white;
  filter: grayscale(100%) opacity(0.7);
  transition: color 200ms;

  :hover {
    filter: grayscale(0%) opacity(1);
    text-decoration: none;
    color: white;
  }
`;

export const BackButton = styled(Exit)`
  display: block;
  margin: auto 0.5rem auto 0;
`;

export const BackArea = styled.div`
  padding-bottom: 10%;
  color: darkgray;
`;