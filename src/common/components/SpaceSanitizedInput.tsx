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

import React, { SyntheticEvent } from 'react';

import ToyNetInput from './ToyNetInput';

const SpaceSanitizedInput = React.forwardRef<
  HTMLInputElement,
  Parameters<typeof ToyNetInput>[0]
>((props, ref) => {
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.persist();
    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/ /g, '');
    props.onChange && props.onChange(e as any);
  };

  return (
    <ToyNetInput
      data-testid='space_sanitized-input'
      {...props}
      ref={ref}
      onChange={handleChange}
    />
  );
});

export default SpaceSanitizedInput;