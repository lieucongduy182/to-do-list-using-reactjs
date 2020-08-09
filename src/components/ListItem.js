import React, { Component } from "react";

class ListItem extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.taskItem.id); // get id taskItem
  };

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.taskItem.id);
  };

  onEdit = () => {
    this.props.onEdit(this.props.taskItem.id);
  };

  render() {
    let { taskItem, index } = this.props;

    return (
      <tr>
        <td className="text-center">{index + 1}</td>
        <td>{taskItem.name}</td>
        <td className="text-center">
          <div
            className={
              taskItem.status ? "label label-success" : "label label-danger"
            }
            onClick={this.onUpdateStatus}
          >
            {taskItem.status ? "Active" : "Hide"}
          </div>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onEdit}
          >
            <i className="far fa-edit"></i> Edit
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <i className="fas fa-trash-alt"></i> Remove
          </button>
        </td>
      </tr>
    );
  }
}
export default ListItem;
