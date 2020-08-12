import React, { useRef, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faUndo, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Visuals.css';

const image = require('./demo1.png');

const ZOOM_INCREMENT = 0.1;
const INITIAL_ZOOM_LEVEL = 1;
const ZOOM_MIN_LIMIT = 0.2;
const ZOOM_MAX_LIMIT = 2;
const CONTAINER_HEIGHT = '50vh';
const CONTAINER_WIDTH = '75vw';

function convertToPixelFromView(text: string, measurement: number, toStrip: string) {
  const PERCENT_TO_WHOLE = 100;
  return measurement * parseInt(text.replace(toStrip, '')) / PERCENT_TO_WHOLE;
}

const Visuals = () => {
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
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div className="icons">
        <button className='iconButtons' onClick={toggleHideImage}>
          <FontAwesomeIcon className='icon' icon={faEyeSlash} />
        </button>
        <button className='iconButtons' onClick={recenterImage}>
          <FontAwesomeIcon className='icon' icon={faUndo} />
        </button>
        {!hideImage &&
        <>
        <button className='iconButtons' onClick={zoomIn} style={{ cursor: hideImage ? 'default' : 'pointer' }}>
          <FontAwesomeIcon className='icon' icon={faSearchPlus} />
        </button>
        <button className='iconButtons' onClick={zoomOut} style={{ cursor: hideImage ? 'default' : 'pointer' }}>
          <FontAwesomeIcon className='icon' icon={faSearchMinus} />
        </button>
        </>}
      </div>
      <Draggable
        handle=".handle"
        position={pos}
        onStart={() => setIsGrabbing(true)}
        onStop={() => setIsGrabbing(false)}
        onDrag={handleDrag}
      >
        <div className="handle" style={{ cursor: isGrabbing ? '-webkit-grabbing': '', visibility: hideImage ? 'hidden' : 'initial' }}>
          <img
            className="image"
            src={image}
            alt=""
            ref={imageRef}
            style={{
              transform: `scale(${zoomLevel})`,
            }}
          />
        </div>
      </Draggable>
    </div>
  );
};

export default Visuals;