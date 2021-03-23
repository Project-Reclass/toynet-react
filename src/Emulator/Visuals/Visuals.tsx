import React from 'react';

import { OuterContainer, InnerContainer } from './styled';
import Flow from './Flow';

const Visuals = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Flow />
      </InnerContainer>
    </OuterContainer>
  );
};

export default Visuals;