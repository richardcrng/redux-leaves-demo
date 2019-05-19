import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Select } from "semantic-ui-react";

const divStyle = { padding: "5px" };

function StoreDispatcher({ actions, dispatch, placeholder }) {
  const [input, setInput] = React.useState(placeholder);
  const [arg, setArg] = React.useState("");

  return (
    <>
      <div style={divStyle}>
        <b>creator = </b>
        <label>
          actions.
          <input
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            value={input}
          />
        </label>
      </div>
      <div style={divStyle}>
        <b>arg = </b>
        <input value={arg} onChange={e => setArg(e.target.value)} />
        <Select />
      </div>
      <button onClick={() => dispatch(_.get(actions, input)(arg))}>
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
