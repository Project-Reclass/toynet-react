import styled from '@emotion/styled';

interface Props {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  padding?: string
}

const EmulatorSection = styled.div`
  color: white;
  background-color: #454950;
  height: ${(props: Props) => props.height || '100%'};
  width: ${(props: Props) => props.width || '100%'};
  border-radius: 10px;
  padding: ${(props: Props) => props.padding || '2vh'};
  display: flex;
  flex-direction: column;
  min-width: ${(props: Props) => props.minWidth};
  max-width: ${(props: Props) => props.maxWidth};
`;

export default EmulatorSection;