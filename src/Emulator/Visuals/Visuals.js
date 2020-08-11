import React, {useRef, useState, useEffect} from 'react';
import './Visuals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faUndo, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';


/**
 *
 *
 *
 * We have image 300px x 300px
 * container -> 75vw x 50vh
 *
 * We change css zoom property || maybe transform??
 *
 * Center -> transform(-50%, -50%);
 *
 */

const containerHeight = '50vh';
const containerWidth = '75vw';
const hundred = 100;

const image = require('./demo1.png');

// Conversion functions for pixel to viewport and vice versa
function convert2Px(containerDimensions) {
  const movableSpaceReg = /([\d]+)+/g;
  const movableSpaceStringH = containerDimensions.height.toString();
  const movableSpaceStringW = containerDimensions.width.toString();
  const movableSpaceH = movableSpaceStringH.match(movableSpaceReg)[0];
  const movableSpaceW = movableSpaceStringW.match(movableSpaceReg)[0];
  const movableSpacePxH = window.innerHeight * movableSpaceH / hundred;
  const movableSpacePxW = window.innerWidth * movableSpaceW / hundred;
  return {movableSpacePxH, movableSpacePxW};
}

function pxStrip(pxElement) {
  const noPx = /([\d]+)+/g;
  const pxStringH = pxElement.height.toString();
  const pxStringW = pxElement.width.toString();
  const noPxH = parseInt(pxStringH.match(noPx)[0]);
  const noPxW = parseInt(pxStringW.match(noPx)[0]);
  return {noPxH, noPxW};
}

// Gets center of image space and centers element to the middle on render
function getCenter(containerDimensions, contentDimensions) {
  const pxContainerDimensions = convert2Px(containerDimensions);
  const pxContentDimensions = pxStrip(contentDimensions);
  const centerHeight = (pxContainerDimensions.movableSpacePxH - pxContentDimensions.noPxH) / 2;
  const centerWidth = (pxContainerDimensions.movableSpacePxW - pxContentDimensions.noPxW) / 2;
  return {centerHeight, centerWidth};
}

const Visuals = () => {
  const imageRef = useRef();

  const [zoom, setZoom] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({height: containerHeight, width: containerWidth});
  const [contentDimensions, setContentDimensions] = useState({height: '0px', width: '0px'});
  const [handleDetect, setHandleDetect] = useState({x: '', y: ''});
  const [reset, setReset] = useState(false);
  const [grabbed, setGrabbed] = useState(false);

  const [elementBounds, setElementBounds] = useState({bottom: contentDimensions.height, right: contentDimensions.width});

  const [pos, setPos] = useState({x: 0, y: 0});

  useEffect(() => {
    const { centerWidth, centerHeight } = getCenter(containerDimensions, contentDimensions);
    setPos({
      x: centerWidth,
      y: centerHeight,
    });
  }, [containerDimensions, contentDimensions]);

  useEffect(() => {
    const movableSpace = convert2Px(containerDimensions);
    const elementBot = parseInt(handleDetect.y) + parseInt(elementBounds.bottom);

    // const elementRight = parseInt(handleDetect.x) + parseInt(elementBounds.right);

    // console.log(elementBot, movableSpace.movableSpacePxH, elementBounds.bottom);

    // function convert2Vh(movableSpace) {
    //   const movableSpaceH = movableSpace / window.innerHeight * hundred + 'vh';
    //   setContainerDimensions({
    //     height: movableSpaceH, width: containerDimensions.width,
    //   });
    // }

    // function convert2Vw(movableSpace) {
    //   const movableSpaceW = movableSpace / window.innerWidth * hundred + 'vw';
    //   setContainerDimensions({
    //     height: containerDimensions.height, width: movableSpaceW,
    //   });
    // }

    if (reset === true) {
      const { centerHeight, centerWidth } = getCenter(containerDimensions, contentDimensions);
      setPos({
        x: centerWidth, y: centerHeight,
      });
      setHandleDetect({
        x: centerWidth, y: centerHeight,
      });
      setContainerDimensions({
        height: containerHeight, width: containerWidth,
      });
      setReset(!reset);
    }

    // if (elementBot > movableSpace.movableSpacePxH) {
    //   const addMovableSpace = movableSpace.movableSpacePxH;
    //   convert2Vh(addMovableSpace);
    // }

    // if (elementRight > movableSpace.movableSpacePxW) {
    //   const addMovableSpace = movableSpace.movableSpacePxW;
    //   convert2Vw(addMovableSpace);
    // }

    // if (parseInt(handleDetect.y) === 0) {
    //   setPos({
    //     x: pos.x, y: parseInt(handleDetect.y),
    //   });
    //   setHandleDetect({
    //     x: handleDetect.x, y: parseInt(handleDetect.y),
    //   });
    //   const addMovableSpace = movableSpace.movableSpacePxH;
    //   convert2Vh(addMovableSpace);
    // }

    // if (parseInt(handleDetect.x) === 0) {
    //   setPos({
    //     x: parseInt(handleDetect.x), y: pos.y,
    //   });
    //   setHandleDetect({
    //     x: parseInt(handleDetect.x), y: handleDetect.y,
    //   });
    //   const addMovableSpace = movableSpace.movableSpacePxW;
    //   convert2Vw(addMovableSpace);
    // }
  }, [handleDetect, containerDimensions, elementBounds, contentDimensions, pos, reset]);

  // Handles dragging
  const handleDrag = (e, {deltaX, deltaY}) => {
    const {x, y} = pos;
    setPos({
        x: x + deltaX,
        y: y + deltaY,
    });

    // var dragging = document.getElementsByClassName('handle')[0].style.transform;
    // var draggedPos = /([\d]+)+/g;
    // var dragX = dragging.match(draggedPos);

    // setHandleDetect({
    //   x: dragX[0],
    //   y: dragX[1],
    // });
  };

  // Handles what to do when starting drag and stopping drag
  const onStart = () => {
    setGrabbed(true);
  };

  const onStop = () => {
    setGrabbed(false);
  };

  // When image is added, adjusts the container and drag handler sizes to accomodate for image size
  const imageLoad = () => {
    // setContentDimensions({
    //   height: imageRef.current.offsetHeight,
    //   width: imageRef.current.offsetWidth,
    // });
    setElementBounds({
      bottom: imageRef.current.offsetWidth,
      right: imageRef.current.offsetWidth,
    });
  };

  function elementBoundsAdjust() {
    setElementBounds({
      bottom: contentDimensions.width,
      right: contentDimensions.width,
    });
  }

  // Zoom in function and adjusts drag handler size (the invisible space you can click and start drag with)
  function plusClick() {
    if (hideImage === true) {
      return null;
    } else {
      const zoomAmount = .1;
      setZoom(zoom => zoom + zoomAmount);
      // setContentDimensions({
      //   height: contentDimensions.height,
      //   width: contentDimensions.width,
      // });
      elementBoundsAdjust();
      }
    }

  // Zoom out function and adjusts drag handler size (the invisible space you can click and start drag with)
  function minusClick() {
    if (hideImage === true) {
      return null;
    } else {
      const zoomAmount = .1;
      setZoom(zoom => zoom - zoomAmount);
      // setContentDimensions({
      //   height: parseInt(contentDimensions.height),
      //   width: parseInt(contentDimensions.width),
      // });
      elementBoundsAdjust();
    }
  }

  function recenterClick() {
    if (hideImage === true){
      return null;
    } else {
      setReset(!reset);
    }
  }

  function hideClick() {
    setHideImage(!hideImage);
  }

  return (
  <div style={{position: 'relative'}}>
    {/* Functional buttons that changes the element inside the container */}
    <div className="icons">
        <button className='iconButtons' onClick={plusClick} style={{cursor: hideImage ? 'default' : 'pointer'}}><FontAwesomeIcon className='icon' icon={faSearchPlus} /></button>
        <button className='iconButtons' onClick={minusClick} style={{cursor: hideImage ? 'default' : 'pointer'}}><FontAwesomeIcon className='icon' icon={faSearchMinus} /></button>
        <button className='iconButtons' onClick={recenterClick} style={{cursor: hideImage ? 'default' : 'pointer'}}><FontAwesomeIcon className='icon' icon={faUndo} /></button>
        <button className='iconButtons' onClick={hideClick}><FontAwesomeIcon className='icon' icon={faEyeSlash} /></button>
    </div>
    {/* Sets container size, space you can drag in container, and the element inside the container's size */}
    <div className="imageContainer" style={{height: containerHeight, width: containerWidth, overflow: 'auto', padding: '0px'}}>
      {/* <div className="imageSpace" style={{height: containerDimensions.height || '49vh', width: containerDimensions.width || '74vw'}}> */}
      <div className="imageSpace" style={{height: '100%', width: '100%'}}>
        {/* Handles drag */}
        <Draggable
          handle=".handle"
          position={pos}
          scale={1}
          onStart={onStart}
          onDrag={handleDrag}
          onStop={onStop}
          bounds="parent"
        >
          <div className="handle" style={{
            cursor: grabbed ? '-webkit-grabbing': ''}}>
            {/* Functional buttons that changes the element inside the container */}
            <div>
                <img
                  className="image"
                  style={{
                    transform: `scale(${zoom})`,
                    visibility: hideImage ? 'hidden' : 'visible',
                  }}
                  src={image}
                  alt="Network Topology Visualization"
                  ref={imageRef}
                  onLoad={imageLoad}/>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  </div>
  );
};

export default Visuals;