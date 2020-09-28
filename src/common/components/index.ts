import styled from '@emotion/styled';

interface FlexProps {
  direction?: '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset' | 'column' | 'column-reverse' | 'row' | 'row-reverse' | undefined
}

export const Flex = styled.div`
  display: flex;
  margin: auto;
  flex-direction: ${({direction}: FlexProps) => direction};
`;