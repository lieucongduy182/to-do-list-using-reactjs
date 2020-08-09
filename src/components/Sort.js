import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: {
        by: "", // name, value
        value: 1, // asc, desc
      },
    };
  }

  onClickSort = async (sortBy, sortValue) => {
    await this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
    this.props.onSort(this.state.sort);
  };

  render() {
    let { sort } = this.state;
    return (
      <div className="col-sm-6 col-md-6">
        <div className="dropdown">
          <button
            className="btn btn-primary"
            type="button"
            id="triggerId"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort <i className="fas fa-caret-square-down"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <button
              className={`dropdown-item ${
                sort.by === "name" && sort.value === 1 ? "sort-selected" : ""
              }`}
              onClick={() => this.onClickSort("name", 1)}
            >
              <i className="fas fa-sort-alpha-down"></i> Name: A-Z
            </button>
            <button
              className={`dropdown-item ${
                sort.by === "name" && sort.value === -1 ? "sort-selected" : ""
              }`}
              onClick={() => this.onClickSort("name", -1)}
            >
              <i className="fas fa-sort-alpha-up"></i> Name: Z-A
            </button>
            <div className="divider"></div>
            <button
              className={`dropdown-item ${
                sort.by === "status" && sort.value === 1 ? "sort-selected" : ""
              }`}
              onClick={() => this.onClickSort("status", 1)}
            >
              Status: Active
            </button>
            <button
              className={`dropdown-item ${
                sort.by === "status" && sort.value === -1 ? "sort-selected" : ""
              }`}
              onClick={() => this.onClickSort("status", -1)}
            >
              Status: Hide
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Sort;
