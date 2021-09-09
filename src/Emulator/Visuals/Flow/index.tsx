import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';

import Flow, { Props } from './Flow';


export const WrappedFlow = (props: Props) => (
  <ReactFlowProvider>
    <Flow {...props} />
  </ReactFlowProvider>
);

export default WrappedFlow;