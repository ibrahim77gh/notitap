import React, { Component, KeyboardEvent } from "react";

interface CommandListProps {
  items: Array<{ element?: React.ReactNode; title: string }>;
  command: (item: { element?: React.ReactNode; title: string }) => void;
}

interface CommandListState {
  selectedIndex: number;
}

class CommandList extends Component<CommandListProps, CommandListState> {
  state: CommandListState = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps: CommandListProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  };

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index: number) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <div className="items" onKeyDown={this.onKeyDown} tabIndex={0}>
        {items.map((item, index) => (
          <button
            className={`item ${
              index === this.state.selectedIndex ? "is-selected" : ""
            }`}
            key={index}
            onClick={() => this.selectItem(index)}
          >
            {item.element || item.title}
          </button>
        ))}
      </div>
    );
  }
}

export default CommandList;
