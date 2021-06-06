import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

const Path = styled.path`
    :hover {
        cursor: pointer;
    }
`;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}: any) {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (ref.current) {
        console.log('I added theevent listener@');
        ref.current.addEventListener('contextmenu', (ev) => {
            ev.preventDefault();
            alert('you pressed a button');
        });
    }
  }, []);

  return (
    <>
      <Path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} ref={ref} />
      <text>
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
        </textPath>
      </text>
    </>
  );
}