import React from 'react';
import CheckListItem from './CheckListItem';

export default function CheckListWrap(props) {
  const { data, onClick } = props;

  return (
    <>
      <div className='list_style05'>
        <ul>
          {(data?.length > 0)
            ? data?.map((e) => {
              return <CheckListItem 
                key={e.id} 
                className={`${(e.count === 0) ? 'disabled' : ''} ${(e.active) ? 'on' : ''}`}
                onClick={() => onClick(e.id)}
                status={e.status}
                type={e.type}
                period={e.period}
                title={e.title}
                count={e.count}
              />;
            })
            : ''
          }
        </ul>
      </div>
    </>
  );
}