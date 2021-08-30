/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
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
  height: auto;
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