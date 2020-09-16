import React from 'react';

export default function Inputs(props) {
  const { filter, onChangeFilter, onClick } = props;

  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleClick} className="waves-effects waves-light btn">
        Novo Lançamento
      </button>
      <div className="input-field">
        <input
          placeholder="Filtro"
          type="text"
          onChange={handleInputChange}
          value={filter}
        ></input>
      </div>
    </div>
  );
}
