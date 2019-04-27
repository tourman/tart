import React, { useState, useEffect } from 'react';
import '../../../css/style.css';

const silentFocus = action => {
  const { scrollX, scrollY } = window;
  action();
  window.scrollTo(scrollX, scrollY);
};

const AppWrapper = props => {
  const [ throttleDelay, setThrottleDelay ] = useState(0);
  useEffect(() => {
    const cssRule = [].find.call(document.styleSheets[0].cssRules, cssRule => cssRule.selectorText.includes('.figure_throttle'));
    const transitionDuration = parseInt(cssRule.style.transitionDuration);
    setThrottleDelay(transitionDuration);
  });
  const children = React.Children.map(
    props.children,
    child => React.cloneElement(child, {
      silentFocus,
      throttleDelay,
    })
  );
  return (
    <div>
      {children}
    </div>
  );
};

export default AppWrapper;
