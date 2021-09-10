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
import { Heading, Link, Stack} from '@chakra-ui/core';

const NotFound = () => {
    return <Stack marginTop='10rem' alignItems='center'>
            <Heading color='white' fontSize='3.5rem'>Sorry the page you're lookin for</Heading>
            <Heading color='white' fontSize='3.5rem'>Cannot be found.</Heading>
            <Link href="/" color='white' fontSize='2.5rem' textDecoration='underline'>Return Home</Link>
        </Stack>;
};

export default NotFound;
