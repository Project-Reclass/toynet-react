import styled from '@emotion/styled';

export const DialogueBoxContainer = styled.div`
  background-color: #454950;
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 2vh;
  overflow: auto;
  min-width: 250px;
`;

export const InnerContainer = styled.div`
  background-color: #212529;
  height: 100%;
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
`;

