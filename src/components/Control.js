import React, { Component } from "react";

import Search from "./Search";
import Sort from "./Sort";
class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        {/* Search */}
        <Search
          onSearch={this.props.onSearch}
          onResetSearch={this.props.onResetSearch}
        />
        {/* Sort */}
        <Sort onSort = {this.props.onSort}/>
      </div>
    );
  }
}
export default Control;
