import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Creator from "./Creator";
import Argument from "./Argument";
import DispatchButton from "./DispatchButton";
import AddArgumentButton from "./AddArgumentButton";

let count = 0

function StoreDispatcher({ actions, dispatch, placeholder }) {

  const [input, setInput] = React.useState("");
  const [args, setArgs] = React.useState([])

  /*
    e.g. [
      { arg, parser, method, key }
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

  const deleteArgAt = index => () => {
    setArgs([
      ...args.slice(0, index),
      ...args.slice(index + 1)
    ])
  }

  const creator = _.get(actions, input)

  const getArgs = () => args.filter(arg => arg).map(
    ({ arg, method }) => method(arg)
  )

  return (
    <>
      <Creator {...{ input, placeholder, setInput }} />
      {args.map(({ arg, parser, method, key }, index) => (
        <Argument {...{
          key,
          arg,
          parser,
          method,
          index,
          configArg: configArgAt(index),
          deleteArg: deleteArgAt(index)
        }} />
      ))}
      <AddArgumentButton className="my-2" onClick={addArg} />
      <DispatchButton
        className="my-2"
        onClick={() => dispatch(creator(...getArgs()))}
      />
    </>
  );
}

const ConnectedStoreDispatcher = connect(
  null,
  dispatch => ({ dispatch })
)(StoreDispatcher);

export default ConnectedStoreDispatcher;
