import styled from '@emotion/styled';
import { Icon } from '@chakra-ui/core';

export const DropdownContainer = styled.div`
  font-size: 1.5rem;
  box-shadow:  0pt 0px 3px rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.05);

  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  margin: 0.229rem;

  > span {
    margin: auto 0.5rem;
    text-align: center;
    user-select: none;
  }
`;

interface RotatableArrowProps {
  rotated: boolean;
}

export const RotatableArrow = styled.span`
  display: block;
  cursor: pointer;

  transition: 0.3s ease;
  transform-origin: 50% 65% 0;

  transform: ${({ rotated }: RotatableArrowProps) => rotated && 'rotate(180deg)'};
`;

export const RotatableIcon = styled(Icon)`
  margin: auto;
  transition: 0.3s ease;
  cursor: pointer;

  transform: ${({ rotated }: RotatableArrowProps) => rotated && 'rotate(180deg)'};
`;
