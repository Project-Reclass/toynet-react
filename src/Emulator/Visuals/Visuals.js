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

  const [zoom, setZoom] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const imageRef = useRef();
  const [containerDimensions, setContainerDimensions] = useState({height: containerHeight, width: containerWidth});
  const [contentDimensions, setContentDimensions] = useState({height: '125px', width: '125px'});
  const [image, setImage] = useState('null');
  const [, setSrc] = useState('');
  const [, setDrags] = useState(0);
  const defaultX = 550;
  const defaultY = 180;
  const [pos, setPos] = useState({x: defaultX, y: defaultY});
  const [handleDetect, setHandleDetect] = useState({x: '', y: ''});
  const [elementBounds, setElementBounds] = useState({bottom: contentDimensions.height, right: contentDimensions.width});
  const [reset, setReset] = useState(false);
  const [grabbed, setGrabbed] = useState(false);

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

  useEffect(() => {
    const movableSpace = convert2Px(containerDimensions);
    const elementBot = parseInt(handleDetect.y) + parseInt(elementBounds.bottom) + additionalImageSpace;
    const elementRight = parseInt(handleDetect.x) + parseInt(elementBounds.right) + additionalImageSpace;

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
  }, [handleDetect, containerDimensions, elementBounds, contentDimensions, pos, reset]);

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
    const zoomAmount = .1;
    setZoom(zoom => zoom + zoomAmount);
    setContentDimensions({
      height: contentDimensions.height + additionalImageSpace,
      width: contentDimensions.width + additionalImageSpace,
    });
    elementBoundsAdjust();
  }

  // Zoom out function and adjusts drag handler size (the invisible space you can click and start drag with)
  function minusClick() {
    const zoomAmount = .1;
    setZoom(zoom => zoom - zoomAmount);
    setContentDimensions({
      height: contentDimensions.height - additionalImageSpace,
      width: contentDimensions.width - additionalImageSpace,
    });
    elementBoundsAdjust();
  }

  function recenterClick() {
    setReset(!reset);
  }

  function hideClick() {
    setHideImage(!hideImage);
  }

  return (
  <div>
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
                <button onClick={() => setImage('https://picsum.photos/200')}>Image 200px</button> <br></br>
                <button onClick={() => setImage('https://picsum.photos/300')}>Image 300px</button> <br></br>
                <button onClick={() => setImage('https://picsum.photos/400')}>Image 400px</button> <br></br>
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
      {/* Functional buttons that changes the element inside the container */}
      <div className="icons">
        <button className='iconButtons' onClick={plusClick}><FontAwesomeIcon className='icon' icon={faSearchPlus} /></button>
        <button className='iconButtons' onClick={minusClick}><FontAwesomeIcon className='icon' icon={faSearchMinus} /></button>
        <button className='iconButtons' onClick={recenterClick}><FontAwesomeIcon className='icon' icon={faUndo} /></button>
        <button className='iconButtons' onClick={hideClick}><FontAwesomeIcon className='icon' icon={faEyeSlash} /></button>
      </div>
    </div>
  </div>
  );
};

export default Visuals;