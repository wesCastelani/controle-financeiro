import React from 'react';

export default function Period(props) {
  const { value, onChange } = props;

  const changePeriod = (e) => {
    let period = e.target.value;
    onChange(period);
  };

  return (
    <div className="center">
      <input
        type="month"
        value={value}
        onChange={changePeriod}
        max="2021-12"
        min="2019-01"
      ></input>
    </div>
  );
}
