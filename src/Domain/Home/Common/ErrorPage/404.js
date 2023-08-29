import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center text-center w-screen h-screen'>
      <div>
        <h2 className='text-8xl font-bold text-color-main'>404</h2>
        <p className='text-4xl mt-2'>Not Found</p>
        <NavLink to='/' className='text-lg text-color-point1 underline mt-20'>Back to Home Page</NavLink>
      </div>
    </div>
  );
}
