import React from 'react';
import { useSelector } from 'react-redux';
import { getLoading } from 'Domain/Home/Common/Status/CommonSlice';

export default function LoadingGlobal() {
  const loading = useSelector(getLoading);
  
  return (
    <div className={['loading_wrap', (loading) ? 'show' : ''].join(' ')}>
      <i></i>
    </div>
  );
}
