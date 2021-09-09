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

export const SplashHeaderContainer = styled.div`
  background: linear-gradient(180deg, rgba(0,119,138,1) 0%, rgb(51 55 59) 95%);
`;

export const SpashHeaderGridContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

export const SplashHeaderContent = styled.div`
  display: inline-block;
  margin-left: 10%;
  color: white;
  width: 40%;
  max-width: 40%;
  max-height: 100%;
`;

export const SplashHeaderContentH1 = styled.h1`
  font-size: 4.375rem;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
`;

export const SplashHeaderImageContainer = styled.div`
  height: 100%;
  max-width: 50%;
  padding-right: 10%;
`;

export const SplashHeaderBody = styled.div`
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
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
`;

export const SplashHeaderBodySVG = styled.div`
  display: block;
  width: 700px;
  height: 100%;
  max-width: 100%;
`;
