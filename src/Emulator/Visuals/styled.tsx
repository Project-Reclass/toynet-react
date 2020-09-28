import styled from '@emotion/styled';
import { dynamicPosition } from 'src/common/css';


export const Icons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  ${dynamicPosition};
`;

interface DraggableImageProps {
  isGrabbing: boolean;
  hideImage: boolean;
}

export const DraggableImage = styled.div`
  cursor: ${(props: DraggableImageProps) => props.isGrabbing ? '-webkit-grabbing' : '-webkit-grab'};
  cursor: ${(props: DraggableImageProps) => props.isGrabbing ? 'grabbing' : 'grab'};
  visibility: ${(props: DraggableImageProps) => props.hideImage ? 'hidden' : 'initial'};
  background-color: #212529;
  border-radius: 10px;
`;

interface ImageProps {
  zoomLevel: number;
}

export const Image = styled.img`
  position: relative;
  zoom: 1;
  display: inline-block;
  border: solid 0.1rem rgba(0,0,0,0.4);
  border-radius: 5px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  border-radius: 10px;
  background-color: #454950;
  transform: ${({zoomLevel}: ImageProps) => `scale(${zoomLevel})`};
`;

export const OuterContainer = styled.div`
  background-color: #454950;
  padding: 0.4vw;
  margin-top: 2.5vh;
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
`;

export const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  flex: 1 1 auto;
  background-color: #212529;
  max-height: 100%100%;
  z-index: 1;
`;