import { css } from '@emotion/core';

interface DynamicPosProps {
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  top?: number | string;
}

export const dynamicPosition = (props: DynamicPosProps) =>
  css`
    left: ${props.left || 'auto'};
    right: ${props.right || 'auto'};
    bottom: ${props.bottom || 'auto'};
    top: ${props.top || 'auto'};
  `;