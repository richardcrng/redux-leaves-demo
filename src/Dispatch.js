import React from 'react';
import { Button } from 'semantic-ui-react';

function Dispatch({ onClick }) {
  return (
    <Button className="my-2" secondary onClick={onClick}>
      <code>store.dispatch.creator(...args)</code>
    </Button>
  )
}

export default Dispatch;