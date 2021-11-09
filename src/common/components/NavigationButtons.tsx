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
import { Button, ButtonProps } from '@chakra-ui/button';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from '@chakra-ui/icons';
import { Stack } from '@chakra-ui/layout';
import { useCurriculumNavigator } from '../api/curriculum/dashboard';
import { SubModuleType } from '../types/curriculum';

export interface NavigationButtonsProps extends ButtonProps {
  moduleId: number;
  submoduleId: number;
  submoduleType: SubModuleType;

  prevText?: string;
  nextText?: string;
  completeText?: string;
  btnRightProps?: ButtonProps;
  btnLeftProps?: ButtonProps;

  children?: React.ReactChild,
}

export default function NavigationButtons({
  moduleId,
  submoduleId,
  children,
  submoduleType,
  btnRightProps,
  btnLeftProps,
  prevText = 'Previous Submodule',
  nextText = 'Next Submodule',
  completeText = 'Complete Submodule',
  ...btnProps
}: NavigationButtonsProps) {
  const {
    isLoading,
    isNext,
    isPrev,
    next,
    prev,
  } = useCurriculumNavigator(1, moduleId, submoduleId, submoduleType);

  return (
    <Stack
      width='100%'
      direction='row'
      justifyContent='space-between'
    >
      <Button
        aria-label='previous'
        variant='outline'
        colorScheme='whiteAlpha'
        isDisabled={!isPrev || isLoading}
        onClick={prev}
        leftIcon={<ArrowLeftIcon />}
        size='md'
        {...btnProps}
        {...btnLeftProps}
      >
        {prevText}
      </Button>
      {children}
      <Button
        isDisabled={isLoading}
        aria-label='next'
        colorScheme='whiteAlpha'
        variant='outline'
        onClick={next}
        size='md'
        rightIcon={(isNext || isLoading) ?
          <ArrowRightIcon /> :
          <CalendarIcon />
        }
        {...btnProps}
        {...btnRightProps}
      >
        {(isNext || isLoading) ? nextText : completeText}
      </Button>
    </Stack>
  );
}