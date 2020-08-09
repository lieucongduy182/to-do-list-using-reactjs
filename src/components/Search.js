import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
    };
  }
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };

  onResetSearch = () => {
    this.setState({
      keyword: "",
    });
    this.props.onResetSearch(this.setState.keyword);
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState ({
        keyword: e.target.value
      })
      this.props.onSearch(this.state.keyword);
    }
  }

  render() {
    return (
      <div className="col-sm-6 col-md-6">
        <div className="input-group">
          <input
            className="form-control py-2 border-right-0 border"
            type="search"
            placeholder="Search"
            name="keyword"
            value={this.state.keyword}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />

          {this.state.keyword !== "" ? (
            <div className="input-group-btn border border-right-0 border-left-0">
              <span className="btn" onClick={this.onResetSearch}>
                <i className="far fa-times-circle"></i>
              </span>
            </div>
          ) : (
            ""
          )}
          <span className="input-group-btn">
            <button
              className="btn btn-outline-secondary border-left-0 border"
              type="button"
              onClick={this.onSearch}
            >
              <i className="fas fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    );
  }
}
export default Search;
