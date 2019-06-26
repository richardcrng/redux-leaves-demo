import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from "react-redux";

import "./styles.css";
import StoreDispatcher from "./StoreDispatcher";

// Set up Redux Leaves
import reduxLeaves from "redux-leaves";

// You can change the inital state here
const initialState = {
  counter: 1,
  foo: ["foo"],
  nest: { deep: {} }
};

// You can change the reducers dictionary here
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
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <div className="App">
      <h1>Redux-Leaves: demo</h1>
      <p>Try dispatching an action and watch how the store changes!</p>
      <div style={{ padding: "20px" }}>
        {JSON.stringify(state, null, 2)}
      </div>
      <StoreDispatcher
        actions={actions}
        dispatch={dispatch}
        placeholder="leaf.create.creatorKey"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render((
  <Provider store={store}>
    <Demo />
  </Provider>
), rootElement);
