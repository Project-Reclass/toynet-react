import React, { useRef, useState, useEffect, FC } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

import { useVisualizeToynetImage } from 'src/common/api/topology';
import {ReactComponent as ZoomInButton} from 'src/assets/v2-buttons/plus-zoom.svg';
import {ReactComponent as GreenZoomInButton } from 'src/assets/buttons/greenZoomInIcon.svg';
import {ReactComponent as ZoomOutButton} from 'src/assets/v2-buttons/minus-zoom.svg';
import {ReactComponent as GreenZoomOutButton} from 'src/assets/buttons/greenZoomOutIcon.svg';
import {ReactComponent as HideButton} from 'src/assets/v2-buttons/eye-hide.svg';
import {ReactComponent as GreenHideButton} from 'src/assets/v2-buttons/eye-show.svg';
import {ReactComponent as CenterButton} from 'src/assets/v2-buttons/center-image.svg';
import {ReactComponent as GreenCenterButton} from 'src/assets/buttons/greenCenterImageIcon.svg';

import { useEmulator } from '../EmulatorProvider';

import { OuterContainer, DraggableImage, Icons, Image, InnerContainer } from './styled';

const ZOOM_INCREMENT = 0.1;
const INITIAL_ZOOM_LEVEL = 1;
const ZOOM_MIN_LIMIT = 0.2;
const ZOOM_MAX_LIMIT = 2;
const CONTAINER_HEIGHT = '57.15vh';
const CONTAINER_WIDTH = '68.18vw';

function convertToPixelFromView(text: string, measurement: number, toStrip: string) {
  const PERCENT_TO_WHOLE = 100;
  return measurement * parseInt(text.replace(toStrip, '')) / PERCENT_TO_WHOLE;
}

interface BtnProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  hoverComponent: JSX.Element
  component: JSX.Element
}

const HighlightButton: FC<BtnProps> = ({ children, hoverComponent, component, ...rest }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <button {...rest} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ?
      hoverComponent
      :
      component
    }
    </button>
  );
};

const Visuals = () => {
  const { sessionId } = useEmulator();
  const { data, isLoading } = useVisualizeToynetImage(sessionId);

  const [pos, setPos] = useState({x: 0, y: 0});
  const [hideImage, setHideImage] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(recenterImage, 0);
    }
  }, [isLoading]);

  const handleDrag = (_: any, {deltaX, deltaY}: DraggableData) => {
    const {x, y} = pos;
    setPos({
        x: x + deltaX,
        y: y + deltaY,
    });
  };

  const zoomIn = () => {
    if (zoomLevel < ZOOM_MAX_LIMIT && !hideImage)
      setZoomLevel(prevZoomAmount => prevZoomAmount + ZOOM_INCREMENT);
  };

  const zoomOut = () => {
    if (zoomLevel > ZOOM_MIN_LIMIT && !hideImage)
      setZoomLevel(prevZoomAmount => prevZoomAmount - ZOOM_INCREMENT);
  };

  const recenterImage = () => {
    const realContainerHeight = convertToPixelFromView(CONTAINER_HEIGHT, window.innerHeight, 'vh');
    const realContainerWidth = convertToPixelFromView(CONTAINER_WIDTH, window.innerWidth, 'vw');

    setZoomLevel(INITIAL_ZOOM_LEVEL);
    setHideImage(false);
    if (imageRef.current) {
      setPos({
        x: (realContainerWidth - imageRef.current.offsetWidth) / 2,
        y: (realContainerHeight - imageRef.current.offsetHeight) / 2,
      });
    }
  };

  const toggleHideImage = () => {
    setHideImage(prevHideImage => !prevHideImage);
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Icons bottom={'20px'} right={'20px'}>
          {!hideImage &&
          <>
          <HighlightButton
            hoverComponent={<GreenZoomInButton />}
            component={<ZoomInButton />}
            className ='pb-2vh'
            onClick={zoomIn}
            style={{ cursor: hideImage ? 'default' : 'pointer' }} />
          <HighlightButton
            hoverComponent={<GreenZoomOutButton />}
            component={<ZoomOutButton />}
            className='pb-2vh'
            onClick={zoomOut}
            style={{ cursor: hideImage ? 'default' : 'pointer' }} />
          </>}
          <HighlightButton
            hoverComponent={<GreenHideButton />}
            component={<HideButton />}
            className='pb-2vh'
            onClick={toggleHideImage}
            style={{ cursor: hideImage ? 'default' : 'pointer' }} />
          <HighlightButton
            hoverComponent={<GreenCenterButton />}
            component={<CenterButton />}
            className='pb-2vh'
            onClick={recenterImage}
            style={{ cursor: hideImage ? 'default' : 'pointer' }} />
        </Icons>
        <Draggable
          handle=".handle"
          position={pos}
          onStart={() => setIsGrabbing(true)}
          onStop={() => setIsGrabbing(false)}
          onDrag={handleDrag}
        >
          <DraggableImage isGrabbing={isGrabbing} hideImage={hideImage} className='handle'>
            {sessionId > 0 && data && data.length > 0 &&
              <Image
                data-testid={'toynet-session-img'}
                className="image"
                src={data}
                alt=""
                ref={imageRef}
                zoomLevel={zoomLevel}
              />
            }
          </DraggableImage>
        </Draggable>
      </InnerContainer>
    </OuterContainer>
  );
};

export default Visuals;