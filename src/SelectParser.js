import React from "react";

import { Dropdown } from "semantic-ui-react"

function SelectParser({ parser, parsers, setParser }) {
  return (
    <Dropdown
      placeholder="Select parser"
      selection
      options={parsers.map(({ key, text, value }) => ({ key, text, value }))}
      value={parser}
      onChange={(event, data) => setParser(data.value)}
    />
  )
}

export default SelectParser;