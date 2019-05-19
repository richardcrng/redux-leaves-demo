import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react"
import SelectParser from "./SelectParser";

const divStyle = { padding: "5px", margin: "5px" };

function StoreDispatcher({ actions, dispatch, placeholder }) {
  const [input, setInput] = React.useState(placeholder);
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
    <>
      <div style={divStyle}>
        <b>creator = actions.</b>
        <Input
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          value={input}
        />
      </div>
      <div style={divStyle}>
        <b>arg = </b>
        <SelectParser
          parsers={parsers}
          parser={parser}
          setParser={setParser}
        />
        <span style={{ fontSize: "200%" }}>(</span>
        <Input value={arg} onChange={e => setArg(e.target.value)} />
        <span style={{ fontSize: "200%" }}>)</span>
      </div>
      <button onClick={() => dispatch(_.get(actions, input)(parserMethod(arg)))}>
        Dispatch <code>creator(arg)</code> to store
      </button>
    </>
  );
}

const ConnectedStoreDispatcher = connect(
  null,
  dispatch => ({ dispatch })
)(StoreDispatcher);

export default ConnectedStoreDispatcher;
