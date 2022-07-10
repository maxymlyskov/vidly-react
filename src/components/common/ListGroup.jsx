import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { onItemSelect, selectedItem, genres, valueProperty, textProperty } =
      this.props;
    return (
      <ul className="list-group">
        {genres.map((genre) => (
          <li
            key={genre._id}
            onClick={() => onItemSelect(genre)}
            style={{ cursor: "pointer" }}
            className={
              selectedItem._id === genre[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
