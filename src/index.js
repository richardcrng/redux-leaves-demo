import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from "react-redux";

import "./styles.css";
import ConnectedStoreState from "./ConnectedStoreState";
import ConnectedStoreDispatcher from "./ConnectedStoreDispatcher";

// Setup Redux-Leaves
import reduxLeaves from "redux-leaves";

const initialState = {
  counter: 1,
  foo: ["foo"],
  nest: { deep: {} }
};

const reducersDict = {
  addOne: leafState => leafState + 1,
  addElement: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({
    ...leafState,
    [payload]: wholeState[payload]
  })
};

const [reducer, actions] = reduxLeaves(initialState, reducersDict);

const store = createStore(reducer)

// Demo
function Demo() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux-Leaves: demo</h1>
        Try dispatching an action and watch how the store changes!
        <ConnectedStoreState />
        <ConnectedStoreDispatcher
          actions={actions}
          placeholder="counter.create.addOne"
        />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Demo />, rootElement);
