import React from 'react';

import flags from './flags';

export const FeatureFlagsContext = React.createContext(flags);
export const useFeatureFlags = () => React.useContext(FeatureFlagsContext);