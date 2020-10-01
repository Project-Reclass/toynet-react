import styled from '@emotion/styled';

export const NetworkDevices = styled.div`
  display: flex;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

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
`;

export const Configure = styled.div`
  padding: 20px;
  padding-top: 0px;
  border-radius: 0 10px 10px 10px;
  border-top: 0;
  position: relative;
  background-color: #454950;
  
  ::-webkit-scrollbar {
    width: 5px;
    color: #454950;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;