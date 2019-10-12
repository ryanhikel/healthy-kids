import React from "react";
import ReactLoading from "react-loading";

class Loading extends React.Component {
  render() {
    return (
      <div>
          <ReactLoading type={"bars"} color={"black"} />
      </div>
    )
  }
}

export default Loading;