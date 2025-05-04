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

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
      itemId: 1,
      inputValue: "",
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  changeStatus(id) {
    const { todoId, onItemsChange } = this.props;
    const updatedItems = this.state.items.map((item) =>
      item.itemId === id ? { ...item, status: !item.status } : item
    );

    this.setState({ items: updatedItems }, () => {
      onItemsChange(todoId, this.state.items);
    });
  }

  handleAddItem(value) {
    const { todoId, onItemsChange } = this.props;
    const newItem = {
      item: value,
      itemId: this.state.itemId,
      status: false,
    };

    const updatedItems = [...this.state.items, newItem];

    this.setState(
      (prev) => ({
        items: updatedItems,
        itemId: prev.itemId + 1,
        inputValue: "",
      }),
      () => {
        onItemsChange(todoId, this.state.items);
      }
    );
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { title } = this.props;

    return (
      <div className="todo-column">
        <h3>{title}</h3>
        <input
          type="text"
          placeholder="Enter task"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" && this.state.inputValue.trim()) {
              this.handleAddItem(this.state.inputValue.trim());
            }
          }}
        />
        <Tasks items={this.state.items} changeStatus={this.changeStatus} />
      </div>
    );
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      nextTodoId: 1,
      todoLists: [],
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleCreateTodo(event) {
    if (event.key === "Enter" && this.state.title.trim() !== "") {
      const newTodo = {
        todoId: this.state.nextTodoId,
        title: this.state.title.trim(),
        items: [],
      };

      this.setState((prev) => ({
        todoLists: [...prev.todoLists, newTodo],
        title: "",
        nextTodoId: prev.nextTodoId + 1,
      }));
    }
  }

  handleItemsChange(todoId, updatedItems) {
    const updatedTodoLists = this.state.todoLists.map((list) =>
      list.todoId === todoId ? { ...list, items: updatedItems } : list
    );
    this.setState({ todoLists: updatedTodoLists });
  }

  render() {
    return (
      <div className="todos-board">
        <input
          type="text"
          placeholder="Enter todo title and press Enter"
          value={this.state.title}
          onChange={this.handleTitleChange}
          onKeyDown={this.handleCreateTodo}
        />

        <div className="todo-columns">
          {this.state.todoLists.map((todo) => (
            <Todo
              key={todo.todoId}
              todoId={todo.todoId}
              title={todo.title}
              items={todo.items}
              onItemsChange={this.handleItemsChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Todos;
