import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Creator from "./Creator";
import Argument from "./Argument";


function StoreDispatcher({ actions, dispatch, placeholder }) {
  const [input, setInput] = React.useState(placeholder);

  const [args, setArgs] = React.useState([])

  /*
    e.g. [
      { arg, parser }
    ]
  */

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
      {args.map(({ arg, parser }, index) => (
        <Argument {...{ arg, parser, index, configArg: configArgAt(index) }} />
      ))}
      <button onClick={() => dispatch(_.get(actions, input)(...args))}>
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
