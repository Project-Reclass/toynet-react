import styled from '@emotion/styled';

export const Login = styled('a')`
  border: 2px solid black;
  transition: all 0.15s ease-in-out;
  border-radius: 3.5px;
  padding: 3px 15px;
  transition: 300ms;
  &:hover {
    background-color: #18879b;
    border: 2px solid #18879b;
  }
`;

export const SignUp = styled('a')`
  margin-left: -5px;
  padding: 5px 17px;
  border-radius: 3.5px;
  background-color: #d6c20e;
  &:hover {
    opacity: 0.2;
  }
`;

export const NavLink = styled('a')`
  color: #131111;
  text-decoration: none;
  font-weight: bold;
  bottom: -1.5px;
  border-style: solid;
  
  transition: opacity 300ms;
  &:hover {
    opacity: 1;
    border-width: 0 0 4px;
    border-color: #0C6474;
  }
`;
export const Logo = styled('img')`
  float: left;
  padding: 20px 0;
  width: 65%;
  height: 'auto';
`;

export const Container = styled('header')`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

export const Header = styled('header')`
  background: white;
`;

export const Nav = styled('nav')`
  padding-top: 1rem;
  display: flex;
  color: #131111;
  font-weight: bold;
`;
export const NavLinksContainer = styled('ul')`
  margin: 0;
  margin: auto;
  padding: 0;
  list-style: none;
`;
export const NavItem = styled('li')`
  display: inline-block;
  margin-left: 2.1875rem;
  position: relative;
`;