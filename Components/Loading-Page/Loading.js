import React from 'react';
import "./Loading.css";
import Image from 'next/image';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image className='bounce' src={"/Logo/Logo(1).png"} height={80} width={80}/>
    </div>
  );
};

export default Loading;
