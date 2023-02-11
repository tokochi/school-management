import React from 'react'
import {  animated, useTransition } from "react-spring";

export default function Animation({ children,visible, from, enter, leave }) {
  const transition = useTransition(visible, { from, enter, leave });
  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style} role="status">
              {children}
            </animated.div>
          )
      )}
    </>
  );
}
