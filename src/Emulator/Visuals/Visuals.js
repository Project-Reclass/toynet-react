import React, {useRef, useState, useEffect} from 'react';
import './Visuals.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus, faExpand, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import Draggable from 'react-draggable'; 

const Visuals = () => {
  const [zoom, setZoom] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [toggleMax, setMax] = useState(false)
  const imageRef = useRef()
  const [containerHeight,] = useState("50vh")
  const [containerWidth,] = useState("75vw")
  const [containerDimensions, setContainerDimensions] = useState({height: 0, width: 0})
  const [contentDimensions, setContentDimensions] = useState({height: 0, width: 0})
  const [image, setImage] = useState("null")
  const [, setSrc] = useState("")
  const [, setDrags] = useState(0)
  const [pos, setPos] = useState({x: 322, y: 322})
  const [maxRes, setMaxRes] = useState({
    height: null,
    width: null,
    prevHeight: null,
    prevWidth: null})
  
  // Handles dragging
  const handleDrag = (e, ui) => {
    const {x, y} = pos;
      setPos({
          x: x + ui.deltaX,
          y: y + ui.deltaY,
      })
  }

  // Handles what to do when starting drag and stopping drag
  const onStart = () => {
    setDrags( drags => drags + 1)
  };
  
  const onStop = () => {
    setDrags( drags => drags - 1)
  };

  // When image is added, adjusts the container and drag handler sizes to accomodate for image size
  const imageLoad = () => {
    setContainerDimensions({
      height: imageRef.current.offsetHeight + containerHeight,
      width: imageRef.current.offsetWidth + containerWidth
    })
    console.log(containerHeight)
    console.log(containerDimensions)
    setContentDimensions({
      height: imageRef.current.offsetHeight + 50,
      width: imageRef.current.offsetWidth + 50
    })
    setSrc(image)
    return {containerDimensions, contentDimensions}
    }

  // Zoom in function and adjusts drag handler size (the invisible space you can click and start drag with)
  function plusClick() {
      setZoom(zoom => zoom + .1)
      setContentDimensions({
          height: contentDimensions.height + 20,
          width: contentDimensions.width + 20
        })
  }
  // Zoom out function and adjusts drag handler size (the invisible space you can click and start drag with)
  function minusClick() {
      setZoom(zoom => zoom - .1)
      setContentDimensions({
          height: contentDimensions.height - 20,
          width: contentDimensions.width - 20
        })
  }

  // Full screen function; changes element resolution to container's max dimensions when when maxRes and toggleMax state changes
  useEffect(() => {
    if (toggleMax === true) {
      setContentDimensions({
        height: maxRes.height,
        width: maxRes.width
      })
    } else {
      setContentDimensions({
        height: maxRes.height,
        width: maxRes.width
      })
    }
    }, [maxRes, toggleMax])

  // Full screen function; finds cotainer and container space resolution sizes and sets them so that image fills the whole container using true/false states
  function maxClick() {
    setMax(!toggleMax)
    if (toggleMax === false) {
      setMaxRes({
        height: containerDimensions.height,
        width: containerDimensions.width,
        prevHeight: contentDimensions.height,
        prevWidth: contentDimensions.width
      })
      setPos({
        x: 0, y:0
      })
    } else {
      setMaxRes({
        height: maxRes.prevHeight,
        width: maxRes.prevHeight,
        prevHeight: maxRes.height,
        prevWidth: maxRes.width
      })
      setPos({
        x: 475, y:475
      })
    }
  }

  function hideClick() {
      return (
          setHideImage(!hideImage)
      )
  }
  
  return (
  <div>
    {/* Sets container size, space you can drag in container, and the element inside the container's size */}
    <div className="imageContainer" style={{height: containerHeight, width: containerWidth, overflow: "auto", padding: '0px'}}>
      <div className="imageSpace" style={{height: containerDimensions.height || "49vh", width: containerDimensions.width || "74vw"}}>
        {/* Handles drag */}
        <Draggable
            handle=".handle"
            position={pos}
            scale={1}
            onStart={onStart}
            onDrag={handleDrag}
            onStop={onStop}
            bounds="parent">
          <div className="handle" style={{height: contentDimensions.height || "125px", width: contentDimensions.width || "125px"}}>
            {/* Functional buttons that changes the element inside the container */}
            <div>
                <button onClick={() => setImage("https://picsum.photos/200")}>Image 200px</button> <br></br>
                <button onClick={() => setImage("https://picsum.photos/300")}>Image 300px</button> <br></br>
                <button onClick={() => setImage("https://picsum.photos/400")}>Image 400px</button> <br></br>
                <img className="image" style={{ zoom, visibility: hideImage ? "hidden" : "visible", width: toggleMax ? "100%" : "", height: toggleMax ? "100%" : ""}} 
                src= {image} alt="" ref={imageRef} onLoad={imageLoad}/> 
            </div>
          </div>
        </Draggable>
      </div>
    </div>
    {/* Functional buttons that changes the element inside the container */}
    <div className="icons">
        <button className="iconButtons" onClick={plusClick}><FontAwesomeIcon className="icon" icon={faSearchPlus} /></button>
        <button className="iconButtons" onClick={minusClick}><FontAwesomeIcon className="icon" icon={faSearchMinus} /></button>
        <button className="iconButtons" onClick={maxClick}><FontAwesomeIcon className="icon" icon={faExpand} /></button>
        <button className="iconButtons" onClick={hideClick}><FontAwesomeIcon className="icon" icon={faEyeSlash} /></button>
    </div>
  </div>
  )
}

export default Visuals;