import React from 'react';
import { Input } from 'semantic-ui-react';

function Creator({ input, placeholder, setInput }) {
  return (
    <div style={{ padding: "10px" }}>
      <b><code>creator</code> = actions.</b>
      <Input
        onChange={e => setInput(e.target.value)}
        placeholder={placeholder}
        value={input}
      />
    </div>
  )
}

export default Creator;