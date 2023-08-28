import React from 'react';

export default function Button(props) {
  const { 
    type = 'button', 
    name, icon, className, onClick, idx
  } = props;

  return (
    <button type={type} className={className} onClick={onClick} data-idx={idx}>
      {name} {(icon) ? <img src={icon} alt={name} className='w-5'/> : ''}
    </button>
  );
}
