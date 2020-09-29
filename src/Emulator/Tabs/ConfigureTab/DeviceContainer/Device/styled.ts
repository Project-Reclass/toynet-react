import styled from '@emotion/styled';
import { deviceColorClasses } from './shared';

interface DeviceProps {
  isDragging: boolean;
  type: string;
}

const Device = styled.div`
  transition: 0.15s opacity ease-in-out;
  cursor: pointer;
  text-transform: capitalize;
  display: flex;
  font-size: large;
  height: 50px;
  width: 60px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;

  background-color: ${({ type }: DeviceProps) => deviceColorClasses.get(type)};
  opacity: ${({ isDragging }: DeviceProps) => isDragging ? '0.2' : '1'};

  :hover {
    opacity: 0.2 !important;
  }
`;

export default Device;

