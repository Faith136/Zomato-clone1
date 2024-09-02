import React from "react";
import { useNavigate } from "react-router-dom";

const navHook = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return <Component navigate={navigate} {...props} />;
    };
};

export default navHook;

/**import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { selectedOption } = this.state;

    // Navigate based on selected option
    if (selectedOption === 'option1') {
      this.props.history.push('/component1');
    } else if (selectedOption === 'option2') {
      this.props.history.push('/component2');
    } else {
      // Handle other cases or show error message
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select an option:
            <select value={this.state.selectedOption} onChange={this.handleChange}>
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
 */