import React, {useRef, useState, useEffect} from 'react';
import './Visuals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faUndo, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';

const Visuals = () => {
  const containerHeight = '50vh';
  const containerWidth = '75vw';
  const additionalImageSpace = 21;
  const hundred = 100;
  const demo1 = require('./demo1.png')
  const demo2 = require('./demo2.png')
  const demo3 = require('./demo3.png')
  const demo = {demo1, demo2, demo3}

  const [zoom, setZoom] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const imageRef = useRef();
  const [containerDimensions, setContainerDimensions] = useState({height: containerHeight, width: containerWidth});
  const [contentDimensions, setContentDimensions] = useState({height: '125px', width: '125px'});
  const [image, setImage] = useState(demo);
  const [, setSrc] = useState('');
  const [, setDrags] = useState(0);
  const [handleDetect, setHandleDetect] = useState({x: '', y: ''});
  const [reset, setReset] = useState(false);
  const [grabbed, setGrabbed] = useState(false);

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
    return {noPxH, noPxW}
  }

  // Gets center of image space and centers element to the middle on render
  function getCenter() {
    const pxContainerDimensions = convert2Px(containerDimensions);
    const pxContentDimensions = pxStrip(contentDimensions);
    const centerHeight = (pxContainerDimensions.movableSpacePxH - pxContentDimensions.noPxH) / 2;
    const centerWidth = (pxContainerDimensions.movableSpacePxW - pxContentDimensions.noPxW) / 2;
    return {centerHeight, centerWidth}
  }

  const onRender = getCenter()

  const defaultX = onRender.centerWidth;
  const defaultY = onRender.centerHeight;

  const [pos, setPos] = useState({x: defaultX, y: defaultY});
  const [elementBounds, setElementBounds] = useState({bottom: contentDimensions.height, right: contentDimensions.width});

  useEffect(() => {
    const movableSpace = convert2Px(containerDimensions);
    const elementBot = parseInt(handleDetect.y) + parseInt(elementBounds.bottom) + additionalImageSpace;
    const elementRight = parseInt(handleDetect.x) + parseInt(elementBounds.right) + additionalImageSpace;

    console.log(elementBot, movableSpace.movableSpacePxH, elementBounds.bottom)

    function convert2Vh(movableSpace) {
      const movableSpaceH = movableSpace / window.innerHeight * hundred + 'vh';
      setContainerDimensions({
        height: movableSpaceH, width: containerDimensions.width,
      });
    }

    function convert2Vw(movableSpace) {
      const movableSpaceW = movableSpace / window.innerWidth * hundred + 'vw';
      setContainerDimensions({
        height: containerDimensions.height, width: movableSpaceW,
      });
    }

    if (reset === true) {
      setPos({
        x: defaultX, y: defaultY,
      });
      setHandleDetect({
        x: defaultX, y: defaultY,
      });
      setContainerDimensions({
        height: containerHeight, width: containerWidth,
      });
      setReset(!reset);
    }

    if (elementBot > movableSpace.movableSpacePxH) {
      const addMovableSpace = movableSpace.movableSpacePxH + additionalImageSpace;
      const newMovableSpace = convert2Vh(addMovableSpace);
      return newMovableSpace;
    }

    if (elementRight > movableSpace.movableSpacePxW) {
      const addMovableSpace = movableSpace.movableSpacePxW + additionalImageSpace;
      const newMovableSpace = convert2Vw(addMovableSpace);
      return newMovableSpace;
    }

    if (parseInt(handleDetect.y) === 0) {
      setPos({
        x: pos.x, y: parseInt(handleDetect.y) + additionalImageSpace,
      });
      setHandleDetect({
        x: handleDetect.x, y: parseInt(handleDetect.y) + additionalImageSpace,
      });
      const addMovableSpace = movableSpace.movableSpacePxH + additionalImageSpace;
      const newMovableSpace = convert2Vh(addMovableSpace);
      return newMovableSpace;
    }

    if (parseInt(handleDetect.x) === 0) {
      setPos({
        x: parseInt(handleDetect.x) + additionalImageSpace, y: pos.y,
      });
      setHandleDetect({
        x: parseInt(handleDetect.x) + additionalImageSpace, y: handleDetect.y,
      });
      const addMovableSpace = movableSpace.movableSpacePxW + additionalImageSpace;
      const newMovableSpace = convert2Vw(addMovableSpace);
      return newMovableSpace;
    }
  }, [handleDetect, containerDimensions, elementBounds, contentDimensions, pos, reset, defaultX, defaultY]);

  // Handles dragging
  const handleDrag = (e, ui) => {
    const {x, y} = pos;
    setPos({
        x: x + ui.deltaX,
        y: y + ui.deltaY,
    });

    var dragging = document.getElementsByClassName('handle')[0].style.transform;
    var draggedPos = /([\d]+)+/g;
    var dragX = dragging.match(draggedPos);

    setHandleDetect({
      x: dragX[0],
      y: dragX[1],
    });
  };

  // Handles what to do when starting drag and stopping drag
  const onStart = () => {
    setDrags(drags => drags + 1);
    setGrabbed(true);
  };

  const onStop = () => {
    setDrags(drags => drags - 1);
    setGrabbed(false);
  };

  // When image is added, adjusts the container and drag handler sizes to accomodate for image size
  const imageLoad = () => {
    setContentDimensions({
      height: imageRef.current.offsetHeight + additionalImageSpace,
      width: imageRef.current.offsetWidth + additionalImageSpace,
    });
    setElementBounds({
      top: imageRef.current.offsetHeightt + additionalImageSpace,
      bottom: imageRef.current.offsetWidth + additionalImageSpace,
      left: '',
      right: imageRef.current.offsetWidth + additionalImageSpace,
    });
    setSrc(image);
  };

  function elementBoundsAdjust() {
    setElementBounds({
      bottom: contentDimensions.width + additionalImageSpace,
      right: contentDimensions.width + additionalImageSpace,
    });
  }

  // Zoom in function and adjusts drag handler size (the invisible space you can click and start drag with)
  function plusClick() {
    if (hideImage === true) {
      return null
    } else {
      const zoomAmount = .1;
      setZoom(zoom => zoom + zoomAmount);
      setContentDimensions({
      height: contentDimensions.height + additionalImageSpace,
      width: contentDimensions.width + additionalImageSpace,
      });
      elementBoundsAdjust();
      }
    }

  // Zoom out function and adjusts drag handler size (the invisible space you can click and start drag with)
  function minusClick() {
    if (hideImage === true) {
      return null
    } else {
      const zoomAmount = .1;
      setZoom(zoom => zoom - zoomAmount);
      setContentDimensions({
      height: parseInt(contentDimensions.height) - additionalImageSpace,
      width: parseInt(contentDimensions.width) - additionalImageSpace,
      });
      elementBoundsAdjust();
    }
  }

  function recenterClick() {
    if (hideImage === true){
      return null
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
      <div className="imageSpace" style={{height: containerDimensions.height || '49vh', width: containerDimensions.width || '74vw'}}>
        {/* Handles drag */}
        <Draggable
            handle=".handle"
            position={pos}
            scale={1}
            onStart={onStart}
            onDrag={handleDrag}
            onStop={onStop}
            bounds="parent">
          <div className="handle" style={{
            height: contentDimensions.height,
            width: contentDimensions.width,
            cursor: grabbed ? '-webkit-grabbing': ''}}>
            {/* Functional buttons that changes the element inside the container */}
            <div>
                <button onClick={() => setImage(demo.demo1)}>Demo 1</button> <br></br>
                <button onClick={() => setImage(demo.demo2)}>Demo 2</button> <br></br>
                <button onClick={() => setImage('https://picsum.photos/200')}>Demo 3</button> <br></br>
                <img
                  className="image"
                  style={{
                    zoom,
                    visibility: hideImage ? 'hidden' : 'visible',
                  }}
                  src= {image}
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