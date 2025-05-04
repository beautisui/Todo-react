import "./App.css";
import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, itemId, status, changeStatus } = this.props;

    const checkbox = (
      <input
        type="checkbox"
        checked={status}
        onChange={() => changeStatus(itemId)}
      />
    );

    return (
      <div>
        {checkbox} {item}
      </div>
    );
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, changeStatus } = this.props;
    const tasks = items.map((item) => {
      return (
        <Task
          key={item.itemId}
          {...item}
          changeStatus={changeStatus}
          className="task"
        ></Task>
      );
    });

    return <div className="tasks">{tasks}</div>;
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { value: "" };
  }

  handleSubmit() {
    if (this.state.value === "") return;

    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  }

  handleChange(event) {
    this.setState((prev) => {
      return { ...prev, value: event.target.value };
    });
  }

  render() {
    return (
      <div>
        {" "}
        <input
          type="text"
          placeholder="Enter Task"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handleSubmit();
            }
          }}
        />
      </div>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ item: "Shopping", itemId: 1, status: false }],
      itemId: 2,
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  changeStatus(id) {
    this.setState((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.itemId === id ? { ...item, status: !item.status } : item
      );
      return { items: updatedItems, itemId: prev.itemId };
    });
  }

  handleAddItem(value) {
    this.setState((prev) => {
      const newItem = {
        item: value,
        itemId: prev.itemId,
        status: false,
      };
      return {
        items: [...prev.items, newItem],
        itemId: prev.itemId + 1,
      };
    });
  }

  render() {
    return (
      <div>
        <Input onSubmit={this.handleAddItem} />
        <Tasks items={this.state.items} changeStatus={this.changeStatus} />
      </div>
    );
  }
}

export default Todo;
