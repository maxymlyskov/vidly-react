import React from "react";

const Select = ({ options, name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        {options.map((item) => {
          if (item._id === "") return null;
          return (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
