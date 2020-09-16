import React from 'react';

export default function Action({ id, type, onClick }) {
  const handleItemClick = () => {
    onClick(id, type);
  };

  return (
    <span
      onClick={handleItemClick}
      style={{ cursor: 'pointer' }}
      className="material-icons"
    >
      {type}
    </span>
  );
}
