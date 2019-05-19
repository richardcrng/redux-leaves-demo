import React from 'react';

function Dispatch({ onClick }) {
  return (
    <button onClick={onClick}>
      Dispatch <code>creator(...args)</code> to store
    </button>
  )
}

export default Dispatch;