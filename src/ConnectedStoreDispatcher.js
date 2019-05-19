import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react';
import Creator from "./Creator";
import Argument from "./Argument";
import Dispatch from "./Dispatch";

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
    ...prevArgs, { key: ++count }
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
      {args.map(({ arg, parser, key }, index) => (
        <Argument {...{ key, arg, parser, index, configArg: configArgAt(index) }} />
      ))}
      <Button className="my-2" primary onClick={addArg}>Add argument</Button>
      <Dispatch onClick={() => dispatch(_.get(actions, input)(...args))} />
    </>
  );
}

const ConnectedStoreDispatcher = connect(
  null,
  dispatch => ({ dispatch })
)(StoreDispatcher);

export default ConnectedStoreDispatcher;
