import _ from 'lodash';
import React from 'react';
import { Input } from 'semantic-ui-react';
import SelectParser from './SelectParser';

function Argument({ index }) {
  const [arg, setArg] = React.useState("");
  const [parser, setParser] = React.useState("String")

  const parsers = [
    {
      key: "string",
      text: "String",
      value: "String",
      method: String
    },
    {
      key: "object",
      text: "JSON.parse",
      value: "JSON.parse",
      method: JSON.parse
    },
    {
      key: "integer",
      text: "parseInt",
      value: "parseInt",
      method: parseInt
    },
    {
      key: "float",
      text: "parseFloat",
      value: "parseFloat",
      method: parseFloat
    },
  ]

  const parserMethod = _.find(
    parsers,
    ({ value }) => parser === value
  ).method

  return (
    <div style={{ margin: "10px" }}>
      <b>arg = </b>
      <SelectParser {...{ parser, parsers, setParser }} />
      <span style={{ fontSize: "200%" }}>(</span>
      <Input value={arg} onChange={e => setArg(e.target.value)} />
      <span style={{ fontSize: "200%" }}>)</span>
    </div>
  )
}

export default Argument;