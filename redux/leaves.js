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

export { reducer, actions };
