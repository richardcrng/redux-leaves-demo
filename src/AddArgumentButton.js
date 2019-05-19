import React from 'react';
import { Button } from 'semantic-ui-react';

function AddArgumentButton({ className, onClick }) {
  return (
    <Button
      {...{ className, onClick }}
      primary
    >
      Add argument
    </Button>
  )
}

export default AddArgumentButton;