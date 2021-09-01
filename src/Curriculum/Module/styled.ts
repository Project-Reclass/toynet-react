import styled from '@emotion/styled';
import { Icon } from '@chakra-ui/core';

interface RotatableArrowProps {
  rotated: boolean;
}

export const RotatableIcon = styled(Icon)`
  transition: 0.3s ease;
  cursor: pointer;

  transform: ${({ rotated }: RotatableArrowProps) => rotated && 'rotate(90deg)'};
`;
