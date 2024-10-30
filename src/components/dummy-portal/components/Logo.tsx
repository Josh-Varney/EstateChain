import React from 'react';
import logo from '../../assets/logo3.png';

const Logo: React.FC = () => { 
  return (
    <div>
      <img src={logo} alt="Description of image" className='h-24 w-72' />
    </div>
  );
};

export default Logo;
