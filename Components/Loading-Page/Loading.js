import React from 'react';
import "./Loading.css"

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img className='bounce' src={"/Logo/Logo(1).png"} height={80} width={80}/>
    </div>
  );
};

export default Loading;
