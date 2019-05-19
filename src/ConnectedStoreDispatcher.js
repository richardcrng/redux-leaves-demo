import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Creator from "./Creator";
import Argument from "./Argument";
import DispatchButton from "./DispatchButton";
import AddArgumentButton from "./AddArgumentButton";

let count = 0

const ERROR_CREATOR_NOT_A_FUNCTION = "It looks like your defined 'creator' is not a function."

function StoreDispatcher({ actions, dispatch, placeholder }) {

  const [input, setInput] = React.useState("");
  const [args, setArgs] = React.useState([])
  const [error, setError] = React.useState("")

  /*
    Format is [
      { arg, parser, method, key }
    ]
  */

  const addArg = () => {
    setError("")
    setArgs(prevArgs => [
      ...prevArgs, { key: count++ }
    ])
  }

  const configArgAt = index => argConfig => {
    setError("")
    const newArgs = [...args]
    newArgs[index] = typeof newArgs[index] === "object"
      ? { ...newArgs[index], ...argConfig }
      : argConfig
    setArgs(newArgs)
  }

  const deleteArgAt = index => () => {
    setError("")
    setArgs([
      ...args.slice(0, index),
      ...args.slice(index + 1)
    ])
  }

  const getArgs = () => args.filter(arg => arg).map(
    ({ arg, method }) => method(arg)
  )

  const handleDispatch = () => {
    setError("")
    const creator = _.get(actions, input)
    if (typeof creator === "function") {
      dispatch(creator(...getArgs()))
    } else {
      setError(ERROR_CREATOR_NOT_A_FUNCTION)
    }
  }

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
        onClick={handleDispatch}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

const ConnectedStoreDispatcher = connect(
  null,
  dispatch => ({ dispatch })
)(StoreDispatcher);

export default ConnectedStoreDispatcher;
