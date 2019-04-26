import React from 'react';

const silentFocus = action => {
  const { scrollX, scrollY } = window;
  action();
  window.scrollTo(scrollX, scrollY);
};

const throttleDelay = 200;

const AppWrapper = props => {
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
