import React, { Component } from "react";

class FormTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      status: true,
    };
  }

  // Edit load lifecycle, call once
  componentDidMount() {
    if (this.props.taskEdit) {
      this.setState({
        id: this.props.taskEdit.id,
        name: this.props.taskEdit.name,
        status: this.props.taskEdit.status,
      });
    }
  }
  // component đang mở, xử lý thêm và edit
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEdit !== null) {
      this.setState({
        id: nextProps.taskEdit.id,
        name: nextProps.taskEdit.name,
        status: nextProps.taskEdit.status,
      });
    } else {
      this.setState({
        id: "",
        name: "",
        status: true,
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.onCancel();
    this.onCloseForm();
    return this.props.onSubmit(this.state);
  };

  onCancel = () => {
    this.setState({
      name: "",
      status: true,
    });
  };

  render() {
    let { id } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h4>
            {id !== "" ? "Edit Task" : "Add Task"}
            <span onClick={this.onCloseForm}>
              <i className="fas fa-times-circle"></i>
            </span>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={this.onHandleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="do something ..."
                value={this.state.name}
                onChange={this.onHandleChange}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                className="form-control"
                value={this.state.status}
                onChange={this.onHandleChange}
              >
                <option value={true}>Active</option>
                <option value={false}>Hide</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <i className="fas fa-plus"></i>&nbsp;Save
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCancel}
              >
                <i className="fas fa-times"></i>&nbsp;Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default FormTask;
