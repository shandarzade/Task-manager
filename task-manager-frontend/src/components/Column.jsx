import React from 'react';

function Column({ children, stage }) {
  return (
    <div className="flex flex-col w-full rounded-lg m-2 shadow-stone-900 drop-shadow-2xl border">
      <div className="flex flex-nowrap bg-blue-600 w-full h-10">
        <h5 className="text-white font-medium leading-tight m-2">{stage}</h5>
      </div>
      <div className="m-2 min-auto">
        {children}
      </div>
    </div>
  );
}

export default Column;
