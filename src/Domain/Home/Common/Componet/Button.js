import React from 'react';

export default function Button(props) {
  const { className, text, icon, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {text} {(icon) ? <img src={icon} alt={text}/> : ''}
    </button>
  );
}
