
import styled from '@emotion/styled';
import { deviceColorClasses } from './shared';

interface DeviceProps {
  type: string;
  isEmpty?: boolean;
  isDragging?: boolean;
  isHover?: boolean;
  size?: 'large' | 'small';
}

export const Connection = styled.div`
  transition: 0.15s opacity ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  min-width: 30px;
  font-size: 0.6rem;
  margin-right: 5px;
  border-radius: 5px;
  color: white;
  text-transform: capitalize;
  cursor: pointer;

  width: ${({ size }: DeviceProps) => size === 'large' && '50px'};
  height: ${({ size }: DeviceProps) => size === 'large' && '50px'};
  font-size: ${({ size }: DeviceProps) => size === 'large' && '1rem'};

  background-color: ${({ type, isEmpty }: DeviceProps) => deviceColorClasses.get(isEmpty ? 'empty' : type)};
  opacity: ${({ isDragging }: DeviceProps) => isDragging ? '0.2' : '1'};
  border: ${({ isHover }: DeviceProps) => isHover ? '1pt solid rgba(255, 255, 255, 0.5)' : ''};

  :hover {
    opacity: 0.2 !important;
  }
`;

export const ConnectionBox = styled.div`
  background-color: #212529;
  border-radius: 5px;
  padding: 0.45rem;
  padding-top: calc(0.45rem + 4px);
  display: flex;
  overflow-x: scroll;
  -ms-transform:rotateX(180deg); /* IE 9 */
  transform: rotateX(180deg); /* Safari and Chrome */
  -webkit-transform: rotateX(180deg);

  ::-webkit-scrollbar {
    height: 4px;
    color: #454950;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

export const ConnectionsContainer = styled.div`
  font-size: small;
  color: #B2B2B2;
  overflow: hidden;
  padding: 0 0.5rem;
`;

export const DeviceBox = styled.div`
  display: grid;
  grid-template-columns: minmax(65px, 75px) auto 45px;
  width: 100%;
  background-color: #595D62;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
`;