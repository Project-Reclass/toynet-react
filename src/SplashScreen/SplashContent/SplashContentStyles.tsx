import styled from '@emotion/styled';

export const SplashContentBody = styled('div')`
  position: relative;
  padding-top: 10vh;
  width: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: calc(950px + 10vh);
  svg {
    display:block;
    width: 80%; 
    height: 70%;
    max-width: 100%;
    padding-left: 10%;
  }
`;
export const SplashContentImageContainer = styled('div')`
  width: 100%;
  margin: auto;
  /* border: 1px solid blue; */
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  /* left: 0; */
  /* margin-bottom: 10vh; */
`;
export const SplashContentContent = styled('div')`
  display: block;
  height: 100%;
  position: relative;
  text-align: right;
  color: white;
  height: auto;
  width: 60%;
  margin: 10vh 0 0 auto;
  margin-right: 10%;
  max-width: 40%;
  max-height: 100%;
  z-index: 1;
  align-self: flex-end;
  h1 {
  font-size: 4.375rem;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  right: 0;
  top: 0;
  } 
  h3 {
  line-height: 35px;
  font-size: 1.5em;
  font-weight: 430;
}
`;
export const Wrapper = styled('div')`
  height: 100%;
  /* width: 100vw; */
  /* margin-bottom: 20vh; */
  /* padding-bottom: 20vh; */
`;