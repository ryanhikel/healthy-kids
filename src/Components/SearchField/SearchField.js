import React from "react";

class SearchField extends React.Component {
  render() {
    return (
      <input className='input' placeholder="Search" type="text" name={name} />
    )
  }
}

export default SearchField;