import React from 'react';

export default function Button(props) {
  const { name, icon, className, onClick } = props;

  return (
    <button className={className} onClick={onClick}>
      {name} {(icon) ? <img src={icon} alt={name} className='w-5'/> : ''}
    </button>
  );
}
