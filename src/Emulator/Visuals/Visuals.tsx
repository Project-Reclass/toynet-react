import React, { useRef, useState, FC } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import zoomInButton from '../../assets/buttons/zoomInIcon.svg';
import greenZoomInButton from '../../assets/buttons/greenZoomInIcon.svg';
import zoomOutButton from '../../assets/buttons/zoomOutIcon.svg';
import greenZoomOutButton from '../../assets/buttons/greenZoomOutIcon.svg';
import showButton from '../../assets/buttons/greenShowIcon.svg';
import greenShowButton from '../../assets/buttons/showIcon.svg';
import hideButton from '../../assets/buttons/hideIcon.svg';
import greenhideButton from '../../assets/buttons/hideIcon.svg';
import centerButton from '../../assets/buttons/centerImageIcon.svg';
import greenCenterButton from '../../assets/buttons/greenCenterImageIcon.svg';

import { visualizeToynetSession } from 'src/common/api/topology/requests';

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
  hoverClass: string;
}

const HighlightButton: FC<BtnProps> = ({ children, hoverClass, ...rest }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button {... rest} className={`${rest.className} ${isHover ? {greenZoomInButton} : {zoomInButton}}`} onMouseOver={() => {setIsHover(true);}} onMouseLeave={() => {setIsHover(false);}}
    {... children}>
    </button>
  );
};

const Visuals = () => {
  const { sessionId } = useEmulator();
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
      marginLeft: '1.5vw',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '10px',
      backgroundColor: '#212529',
      boxShadow: '0 0 0 0.4vw #454950',
    }}>
      <div className="icons">
        {/* {!hideImage &&
        <> */}
        <HighlightButton hoverClass= {zoomInButton} className='iconButtons' onClick={zoomIn} style={{ cursor: hideImage ? 'default' : 'pointer' }}>
        </HighlightButton>
        {/* <button className='iconButtons' onClick={zoomOut} style={{ cursor: hideImage ? 'default' : 'pointer' }}>
          <img src={highlight ? greenZoomOutButton : zoomOutButton} alt='X' />
        </button> */}
        {/* </>} */}
        <button className='iconButtons' onClick={toggleHideImage}>
          <img src={hideImage ? hideButton : showButton} alt='X' />
        </button>
        <button className='iconButtons' onClick={recenterImage}>
        <img src={centerButton} alt='X' />
        </button>
      </div>
      <Draggable
        handle=".handle"
        position={pos}
        onStart={() => setIsGrabbing(true)}
        onStop={() => setIsGrabbing(false)}
        onDrag={handleDrag}
      >
        <div className="handle" style={{ cursor: isGrabbing ? '-webkit-grabbing': '', visibility: hideImage ? 'hidden' : 'initial', backgroundColor: '#212529', borderRadius: '10px' }}>
          {sessionId > 0 &&
            <img
              data-testid={'toynet-session-img'}
              className="image"
              src={visualizeToynetSession(sessionId)}
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