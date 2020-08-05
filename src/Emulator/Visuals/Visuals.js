import React, {useRef, useState, useEffect} from 'react';
import './Visuals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faExpand, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { parse } from 'path';

const Visuals = () => {
  const containerHeight = '50vh';
  const containerWidth = '75vw';
  const additionalImageSpace = 20;

  const [zoom, setZoom] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [toggleMax, setMax] = useState(false);
  const imageRef = useRef();
  const [containerDimensions, setContainerDimensions] = useState({height: containerHeight, width: containerWidth});
  const [contentDimensions, setContentDimensions] = useState({height: 0, width: 0});
  const [image, setImage] = useState('null');
  const [, setSrc] = useState('');
  const [, setDrags] = useState(0);
  const defaultX = 200;
  const defaultY = 200;
  const [pos, setPos] = useState({x: defaultX, y: defaultY});
  const [handleDetect, setHandleDetect] = useState({x: '', y: ''})
  const [elementBounds, setElementBounds] = useState({top: contentDimensions.height || 125, bottom: contentDimensions.height|| 125, left: '', right: contentDimensions.width || 125})

  const [maxRes, setMaxRes] = useState({
    height: null,
    width: null,
    prevHeight: null,
    prevWidth: null});

  function convert2Px(containerDimensions) {
    const movableSpaceReg = /([\d]+)+/g
    const movableSpaceStringH = containerDimensions.height.toString()
    const movableSpaceStringW = containerDimensions.width.toString()
    const movableSpaceH = movableSpaceStringH.match(movableSpaceReg)[0]
    const movableSpaceW = movableSpaceStringW.match(movableSpaceReg)[0]
    const movableSpacePxH = window.innerHeight * movableSpaceH / 100
    const movableSpacePxW = window.innerWidth * movableSpaceW / 100    
    return {movableSpacePxH, movableSpacePxW}
  }

  function convert2Vh(movableSpace) {
    const hundred = 100
    const movableSpaceH = movableSpace / window.innerHeight * hundred + 'vh'
    setContainerDimensions({
      height: movableSpaceH, width: containerWidth
    }) 
    return movableSpaceH
  }

  useEffect(() => {
    const padding = 20
    const movableSpace = convert2Px(containerDimensions)
    const elementBot = parseInt(handleDetect.y) + parseInt(elementBounds.bottom) + padding
    console.log(elementBounds.bottom)
    
    if (elementBot > movableSpace.movableSpacePxH) {
      const addSpace = 50
      const addMovableSpace = movableSpace.movableSpacePxH + addSpace
      const newMovableSpace = convert2Vh(addMovableSpace)
    }
    console.log(elementBot, movableSpace.movableSpacePxH, containerDimensions.height)
  }, [handleDetect, containerDimensions, elementBounds, contentDimensions])

  // Handles dragging
  const handleDrag = (e, ui) => {
    const {x, y} = pos;
    setPos({
        x: x + ui.deltaX,
        y: y + ui.deltaY,
    });

    var dragging = document.getElementsByClassName('handle')[0].style.transform;
    var draggedPos = /([\d]+)+/g
    var dragX = dragging.match(draggedPos)
    
    setHandleDetect({
      x: dragX[0],
      y: dragX[1]
    })
  };
  
  // Handles what to do when starting drag and stopping drag
  const onStart = () => {
    setDrags(drags => drags + 1);
  };

  const onStop = () => {
    setDrags(drags => drags - 1);
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
      right: imageRef.current.offsetWidth + additionalImageSpace
    })
    setSrc(image);
  };

  // Zoom in function and adjusts drag handler size (the invisible space you can click and start drag with)
  function plusClick() {
    const zoomAmount = .1;
    setZoom(zoom => zoom + zoomAmount);
    setContentDimensions({
      height: contentDimensions.height + additionalImageSpace,
      width: contentDimensions.width + additionalImageSpace,
    });
    setElementBounds({
      top: contentDimensions.height + additionalImageSpace,
      bottom: contentDimensions.width + additionalImageSpace,
      left: '',
      right: contentDimensions.width + additionalImageSpace
    })
  }

  // Zoom out function and adjusts drag handler size (the invisible space you can click and start drag with)
  function minusClick() {
    const zoomAmount = .1;
    setZoom(zoom => zoom - zoomAmount);
    setContentDimensions({
      height: contentDimensions.height - additionalImageSpace,
      width: contentDimensions.width - additionalImageSpace,
    });
    setElementBounds({
      top: contentDimensions.height + additionalImageSpace,
      bottom: contentDimensions.width + additionalImageSpace,
      left: '',
      right: contentDimensions.width + additionalImageSpace
    })
  }

  // Full screen function; changes element resolution to container's max dimensions when when maxRes and toggleMax state changes
  useEffect(() => {
    if (toggleMax === true) {
      setContentDimensions({
        height: maxRes.height,
        width: maxRes.width,
      });
    } else {
      setContentDimensions({
        height: maxRes.height,
        width: maxRes.width,
      });
    }}, [maxRes, toggleMax]);

  // Full screen function; finds cotainer and container space resolution sizes and sets them so that image fills the whole container using true/false states
  function maxClick() {
    setMax(!toggleMax);
    if (toggleMax === false) {
      setMaxRes({
        height: containerDimensions.height || '49vh',
        width: containerDimensions.width || '74vh',
        prevHeight: contentDimensions.height,
        prevWidth: contentDimensions.width,
      });
      setPos({
        x: 0, y: 0,
      });
    } else {
      const centerX = 150;
      const centerY = 150;
      setMaxRes({
        height: maxRes.prevHeight,
        width: maxRes.prevHeight,
        prevHeight: maxRes.height,
        prevWidth: maxRes.width,
      });
      setPos({
        x: centerX, y: centerY,
      });
    }
  }

  function hideClick() {
    return (
        setHideImage(!hideImage)
    );
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
          <div className="handle" style={{height: contentDimensions.height || '125px', width: contentDimensions.width || '125px'}}>
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
                    width: toggleMax ? '100%' : '', 
                    height: toggleMax ? '100%' : ''}}
                  src= {image} 
                  alt=""
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
        <button className='iconButtons' onClick={maxClick}><FontAwesomeIcon className='icon' icon={faExpand} /></button>
        <button className='iconButtons' onClick={hideClick}><FontAwesomeIcon className='icon' icon={faEyeSlash} /></button>
      </div>
    </div>
  </div>
  );
};

export default Visuals;