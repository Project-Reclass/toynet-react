import React, { useRef, useState, FC } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import {ReactComponent as ZoomInButton} from '../../assets/buttons/zoomInIcon.svg';
import {ReactComponent as GreenZoomInButton } from '../../assets/buttons/greenZoomInIcon.svg';
import {ReactComponent as ZoomOutButton} from '../../assets/buttons/zoomOutIcon.svg';
import {ReactComponent as GreenZoomOutButton} from '../../assets/buttons/greenZoomOutIcon.svg';
import {ReactComponent as HideButton} from '../../assets/buttons/hideIcon.svg';
import {ReactComponent as GreenHideButton} from '../../assets/buttons/greenHideIcon.svg';
import {ReactComponent as CenterButton} from '../../assets/buttons/centerImageIcon.svg';
import {ReactComponent as GreenCenterButton} from '../../assets/buttons/greenCenterImageIcon.svg';

import { useVisualizeToynetImage } from 'src/common/api/topology';

import { useEmulator } from '../EmulatorProvider';

import './Visuals.css';

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
    <button {... rest} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
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
  const { data } = useVisualizeToynetImage(sessionId);
  const [pos, setPos] = useState({x: 0, y: 0});
  const [hideImage, setHideImage] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);

  const imageRef = useRef<HTMLImageElement>(null);

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
    <div style={{
      height: CONTAINER_HEIGHT,
      width: CONTAINER_WIDTH,
      marginTop: '2.5vh',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '10px',
      flex: '1 1 auto',
      backgroundColor: '#212529',
      boxShadow: '0 0 0 0.4vw #454950',
      zIndex: 1,
    }}>
      <div className="icons">
        {!hideImage &&
        <>
        <HighlightButton
          hoverComponent={<GreenZoomInButton />}
          component={<ZoomInButton />} className ='iconButtons'
          onClick={zoomIn}
          style={{ cursor: hideImage ? 'default' : 'pointer' }} />
        <HighlightButton
          hoverComponent={<GreenZoomOutButton />}
          component={<ZoomOutButton />}
          className='iconButtons' onClick={zoomOut}
          style={{ cursor: hideImage ? 'default' : 'pointer' }} />
        </>}
        <HighlightButton
          hoverComponent={<GreenHideButton />}
          component={<HideButton />} className='iconButtons'
          onClick={toggleHideImage}
          style={{ cursor: hideImage ? 'default' : 'pointer' }} />
        <HighlightButton
          hoverComponent={<GreenCenterButton />}
          component={<CenterButton />}
          className='iconButtons' onClick={recenterImage}
          style={{ cursor: hideImage ? 'default' : 'pointer' }} />
      </div>
      <Draggable
        handle=".handle"
        position={pos}
        onStart={() => setIsGrabbing(true)}
        onStop={() => setIsGrabbing(false)}
        onDrag={handleDrag}
      >
        <div className="handle"
          style={{ cursor: isGrabbing ? '-webkit-grabbing': '',
          visibility: hideImage ? 'hidden' : 'initial',
          backgroundColor: '#212529',
          borderRadius: '10px' }}>
          {sessionId > 0 && data && data.length > 0 &&
            <img
              data-testid={'toynet-session-img'}
              className="image"
              src={data}
              alt=""
              ref={imageRef}
              style={{
                transform: `scale(${zoomLevel})`,
              }}
            />
          }
        </div>
      </Draggable>
    </div>
  );
};

export default Visuals;