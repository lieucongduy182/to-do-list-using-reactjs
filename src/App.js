import React, { Component } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

// Components
import FormTask from "./components/FormTask";
import Control from "./components/Control";
import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false, // display form
      taskEdit: null, // Task to Edit
      filter: {
        // Task to Filter
        filterName: "",
        filterStatus: 1,
      },
      keyword: "", // Search
      sort: {
        by: "", // sortBy name, status
        value: 1, // sortValue asc, desc
      },
    };
  }

  // set State for Component
  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks")); // get value from localStorage
      this.setState({ tasks });
    }
  }

  onDisplayForm = () => {
    if (this.state.isDisplayForm && this.state.taskEdit !== null) {
      this.setState({
        taskEdit: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.isDisplayForm,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEdit: null,
    });
  };

  onSubmit = (data) => {
    let { tasks } = this.state;
    if (data.id !== "") {
      // Edit
      let index = tasks.findIndex((task) => task.id === data.id);
      tasks[index] = data;
      this.setState({ taskEdit: null });
    } else {
      // Add
      data.id = uuidv4();
      tasks.push(data);
    }
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // onDelete = (id) => {
  //   let { tasks } = this.state;
  //   let filterTasks = tasks.filter((task) => task.id !== id);
  //   this.setState({ tasks: filterTasks });
  //   localStorage.setItem("tasks", JSON.stringify(filterTasks));
  //   this.onCloseForm();
  // };

  onDelete = (id) => {
    let { tasks } = this.state;
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onCloseForm();
  };

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({ tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  onShowEdit = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onEdit = (id) => {
    let { tasks } = this.state;
    let index = tasks.findIndex((task) => task.id === id);
    let taskEdit = tasks[index]; // get value Edit
    this.setState({ taskEdit });
    this.onShowEdit();
  };

  // Filter
  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        filterName,
        filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({ keyword });
  };

  onResetSearch = (keyword) => {
    this.setState({ keyword });
  };

  // Sort
  onSort = (sort) => {
    this.setState({ sort });
  };

  render() {
    let { tasks, isDisplayForm, taskEdit, filter, keyword, sort } = this.state;
    // Filter Input field
    if (filter) {
      if (filter.filterName) {
        tasks = tasks.filter((task) => {
          return task.name
            .toLowerCase()
            .includes(filter.filterName.toLowerCase());
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.filterStatus === 1) {
          return task;
        } else {
          return task.status === (filter.filterStatus === 0 ? true : false);
        }
      });
    }

    // Search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().includes(keyword.toLowerCase());
      });
    }

    // Sort
    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) {
          return sort.value;
        } else if (a.name < b.name) {
          return -sort.value;
        } else return 0;
      });
    } else if (sort.by === 'status'){
      tasks.sort((a, b) => {
        if (a.status > b.status) {
          return -sort.value;
        } else if (a.status < b.status) {
          return sort.value;
        } else return 0;
      });
    }

    let elementFormTask = isDisplayForm ? (
      <FormTask
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        taskEdit={taskEdit}
      />
    ) : (
      ""
    );
    return (
      <div className="container-fluid">
        <div className="text-center">
          <h1>To Do List App</h1>
        </div>
        <hr />
        <div className="row">
          {/* Form Task */}
          <div className="col-sm-4 col-md-4">{elementFormTask}</div>
          <div
            className={
              isDisplayForm ? "col-sm-8 col-md-8" : "col-sm-12 col-md-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onDisplayForm}
            >
              <i className="fas fa-plus"></i> Add Task
            </button>
            &nbsp;
            {/* Search / Sort */}
            <Control
              onSearch={this.onSearch}
              onResetSearch={this.onResetSearch}
              onSort={this.onSort}
            />
            {/* List */}
            <List
              tasks={tasks}
              onDelete={this.onDelete}
              onUpdateStatus={this.onUpdateStatus}
              onEdit={this.onEdit}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
