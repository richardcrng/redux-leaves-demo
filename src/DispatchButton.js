import React from 'react';
import { Button } from 'semantic-ui-react';

function DispatchButton({ className, onClick }) {
  return (
    <Button
      {...{ className, onClick }}
      secondary
    >
      <code>store.dispatch(creator(...args))</code>
    </Button>
  )
}

export default DispatchButton;