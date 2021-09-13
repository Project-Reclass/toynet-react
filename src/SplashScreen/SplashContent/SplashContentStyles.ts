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

export const Body = styled('div')`
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
export const ImageContainer = styled('div')`
  width: 100%;
  margin: auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;
export const Content = styled('div')`
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
`;