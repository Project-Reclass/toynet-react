import styled from '@emotion/styled';

export const DialogueBoxContainer = styled.div`
  background-color: #454950;
  color: white;
  height: 37vh;
  width: 15vw;
  border-radius: 10px;
  padding-left: 2vh;
  overflow: auto;
  max-width: 335px;
  min-width: 250px;
`;

export const InnerContainer = styled.div`
  background-color: #212529;
  margin-top: 1.5vh;
  margin-right: 1rem;
  margin-left: 0rem;
  height: 77%;
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
`;

export const StyledClearbutton = styled.button`
  background-color: #454950;
  margin-top: 0.75rem;
  margin-right: 1rem;
  border: 2px solid white;
  color: white;
  padding: 2px 32px;
  text-align: center;
  font-size: 17px;
  float: right;
`;
