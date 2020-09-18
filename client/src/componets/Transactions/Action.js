import React from 'react';

export default function Action({ id, type, onClick }) {
  const handleItemClick = () => {
    onClick(id, type);
  };

  return (
    <span
      style={{ fontSize: '1.2rem' }}
      onClick={handleItemClick}
      style={{ cursor: 'pointer' }}
      className="material-icons"
    >
      {type}
    </span>
  );
}
