import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import './Loader.styles.scss';

const Loader = () => {
  return (
    <div className="page__loader">
      <BiLoaderCircle size={25} />
    </div>
  );
};

export default Loader;
