import styled from '@emotion/styled';

const StyledReflection = styled.h1`
  font-size: 25px;
  color: white;
  font-weight: bold;
  margin: 1.25rem auto;
`;

const StyledBox = styled.div`
  width: auto;
  border: 2px solid white;
  padding: 20px;
  margin: 1.25rem auto;
  font-style: italic;

  h2 {
    text-align: center;
    color: white;
    font-weight: bold;
  }

  p {
    color: white;
    text-align: center;
  }
`;

const StyledTextArea = styled.textarea`
  background-color: #bbd3ea;
  width: 100%;
  height: 150px;
  border: 2px solid white;
  padding: 10px;
  margin: 1.25rem auto;


  ::placeholder {
    color: black;
  }
`;

const StyledSavebutton = styled.button`
  background-color: #6ca2d8;
  border: 2px solid white;
  color: white;
  padding: 10px 32px;
  text-align: center;
  font-size: 16px;
  margin: 1.25rem auto;
  border-radius: 10px;

  float: right;
`;

export {
  StyledReflection,
  StyledBox,
  StyledTextArea,
  StyledSavebutton,
};
