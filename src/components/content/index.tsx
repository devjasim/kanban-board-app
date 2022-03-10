import React from 'react';
import './Board.styles.scss';
import Lists from './Lists';

const Content = () => {
  const handleTodoList = () => {
    console.log('OKAY');
  };

  return (
    <div className="board__container">
      {[...Array(5)].map((item, i) => (
        <Lists key={Math.floor(Math.random() * 100)} />
      ))}
    </div>
  );
};

export default Content;
