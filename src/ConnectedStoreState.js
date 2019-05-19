import React from "react";
import { connect } from "react-redux";

function StoreState({ state }) {
  return (
    <div style={{ padding: "20px" }}>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}

const ConnectedStoreState = connect(state => ({ state }))(StoreState);

export default ConnectedStoreState;
