import * as React from 'react';

export const useDisableScroll = (shouldDisable: boolean) => {
  React.useEffect(() => {
    document.body.style.overflow = shouldDisable ? 'hidden' : 'auto';
  }, [shouldDisable]);
};
