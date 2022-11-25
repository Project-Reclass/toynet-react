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


export const ContainerBody = styled('div')`
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;  
  position: relative;
  padding: calc(100vh - (100vh - 5.8rem)) 0;
  /* height: calc(100vh - 4rem); how to get remaining space of screen */
  width: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  svg{
    display: block;
    width: 700px;
    height: 100%; 
    max-width: 75%;
  }
`;

export const HeaderContent = styled('div')`
  display: inline-block;
  margin-left: 10%;
  color: white;
  width: 40%;
  max-width: 40%;
  max-height: 100%;
`;

export const HeaderContentH1 = styled('h1')`
  font-size: 4.375rem;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
`;

export const HeaderContentH3 = styled('h3')`
  word-spacing: 5px;
  line-height: 70px;
  font-weight: 430px;
  font-size: 1.75rem;
`;

export const HeaderContentButton = styled('button')`
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
`;

export const HeaderContentButtonText = styled('h3')`
  word-spacing: 5px;
  line-height: 30px;
  font-weight: 430px;
  font-size: 1.75rem;
  text-align: center;
  margin: auto;
`;
