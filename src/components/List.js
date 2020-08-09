import React, { Component } from "react";

import ListItem from "./ListItem";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterName: "",
      filterStatus: 1
    };
  }

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? +value : +this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };

  render() {
    let { tasks } = this.props;
    let elements = tasks.map((taskItem, index) => {
      return (
        <ListItem
          key={taskItem.id}
          index={index}
          taskItem={taskItem}
          onDelete={this.props.onDelete}
          onUpdateStatus={this.props.onUpdateStatus}
          onEdit={this.props.onEdit}
        />
      );
    });
    return (
      <div className="row mt-15">
        <div className="col-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">Index</th>
                <th className="text-center">Name To Do</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="filterStatus"
                    onChange={this.onChange}
                  >
                    <option value={1}>All</option>
                    <option value={0}>Active</option>
                    <option value={-1}>Hide</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {/* List item */}
              {elements}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default List;
