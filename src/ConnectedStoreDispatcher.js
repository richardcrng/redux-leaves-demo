import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Creator from "./Creator";
import Argument from "./Argument";
import DispatchButton from "./DispatchButton";
import AddArgumentButton from "./AddArgumentButton";

let count = 0

function StoreDispatcher({ actions, dispatch, placeholder }) {

  const [input, setInput] = React.useState(placeholder);

  const [args, setArgs] = React.useState([])

  /*
    e.g. [
      { arg, parser, key }
    ]
  */

  const addArg = () => setArgs(prevArgs => [
    ...prevArgs, { key: count++ }
  ])

  const configArgAt = index => argConfig => {
    const newArgs = [...args]
    newArgs[index] = typeof newArgs[index] === "object"
      ? { ...newArgs[index], ...argConfig }
      : argConfig
    setArgs(newArgs)
  }

  return (
    <>
      <Creator {...{ input, placeholder, setInput }} />
      {args.map(({ arg, parser, method, key }, index) => (
        <Argument {...{ key, arg, parser, method, index, configArg: configArgAt(index) }} />
      ))}
      <AddArgumentButton className="my-2" onClick={addArg} />
      <DispatchButton
        className="my-2"
        onClick={() => dispatch(_.get(actions, input)(...args))}
      />
    </>
  );
}

const ConnectedStoreDispatcher = connect(
  null,
  dispatch => ({ dispatch })
)(StoreDispatcher);

export default ConnectedStoreDispatcher;
