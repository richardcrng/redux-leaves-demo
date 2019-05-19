import _ from 'lodash';
import React from 'react';
import { Input } from 'semantic-ui-react';
import SelectParser from './SelectParser';
import { MdDelete } from 'react-icons/md';

function Argument({ index, configArg, deleteArg }) {
  const [arg, setArg] = React.useState("");
  const [parser, setParser] = React.useState("String");

  const method = _.find(
    parsers,
    ({ value }) => parser === value
  ).method

  React.useEffect(() => {
    configArg({ arg, parser, method })
  })

  return (
    <div style={{ margin: "10px" }}>
      <MdDelete onClick={deleteArg} size={30} color="red" />
      <b><code>args[{index}]</code> = </b>
      <SelectParser {...{ parser, parsers, setParser }} />
      <span style={{ fontSize: "200%" }}>(</span>
      <Input
        onChange={e => setArg(e.target.value)}
        placeholder="Input string to be parsed"
        value={arg}
      />
      <span style={{ fontSize: "200%" }}>)</span>
    </div>
  )
}

const parsers = [
  {
    key: "JSON.parse",
    text: "JSON.parse",
    value: "JSON.parse",
    method: JSON.parse
  },
  {
    key: "parseFloat",
    text: "parseFloat",
    value: "parseFloat",
    method: parseFloat
  },
  {
    key: "parseInt",
    text: "parseInt",
    value: "parseInt",
    method: parseInt
  },
  {
    key: "String",
    text: "String",
    value: "String",
    method: String
  },
]

export default Argument;