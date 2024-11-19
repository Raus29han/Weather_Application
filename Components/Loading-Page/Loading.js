import Image from 'next/image';
import React from 'react';
import "./Loading.css"

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<<<<<<< HEAD
      <Image className='bounce' src={"/Public/Logo/Logo(1).png"} height={80} width={80}/>
=======
      <Image className='bounce' src={"Public/Logo/Logo(1).png"} height={80} width={80}/>
>>>>>>> 6af769d20c974186156bde023f1757f190345a9e
    </div>
  );
};

export default Loading;
