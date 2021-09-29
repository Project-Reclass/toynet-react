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

import React from 'react';

import { DrawerView as IDrawerView } from './DrawerProvider';
import CreateRouterView from './CreateRouterView';
import CreateSwitchView from './CreateSwitchView';
import CreateHostView from './CreateHostView';

interface ViewProps {
  nameHint: string;
}

const drawerViews: Map<IDrawerView, (_: ViewProps) => JSX.Element> = new Map([
  ['CREATE_HOST', CreateHostView],
  ['CREATE_SWITCH', CreateSwitchView],
  ['CREATE_ROUTER', CreateRouterView],
  ['INFO', CreateHostView],
]);

interface Props extends ViewProps {
  view: IDrawerView;
}

export default function DrawerView({ view, ...rest }: Props) {
  const Component = drawerViews.get(view) || CreateHostView;

  return (
    <Component {...rest} />
  );
}