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
<http://www.gnu.org/licenses/>.  */
import styled from '@emotion/styled';

export const Body = styled('div')`
  position: relative;
  padding: calc((100vh - (100vh - 10rem)) / 2) 0;
  width: auto;
  flex-grow: 1;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const Content = styled('div')`
  display: inline-block;
  margin-left: 10%;
  color: black;
  width: 40%;
  max-width: 40%;
  max-height: 100%;
  max-zoom: 1.5;
`;
export const Title = styled('h1')`
  font-size: 4.375rem;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
`;
export const About = styled('h3')`
  font-size: 1.5em;
  word-spacing: 5px;
  line-height: 35px;
  font-weight: 430;
`;

export const Button = styled('button')`
  font-size: 1.75rem;
  color: black;
  transition: opacity 0.2s ease;
  padding: 0.7rem 2rem;
  opacity: 1;
  border-radius: 10px;
  background-color: #c9b51e;
  box-shadow: 2px 4px 5px rgb(48, 41, 41);
  &:hover {
    opacity: 0.2;
  }
  h3 {
    text-align: center;
    margin: auto;
  }
`;
export const SplashAboutImageContainer = styled('div')`
  height: 100%;
  max-width: 50%;
  padding-right: 10%;
  max-zoom: 1.5;
  svg {
    display: block;
    width: 700px;
    height: 100%; 
    max-width: 100%;
  }
`;
