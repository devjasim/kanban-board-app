import React from 'react';
import AddInput from './AddCard';
import CardItems from './CardItems';
import './Lists.styles.scss';

const Lists = () => {
  return (
    <div className="board__item">
      <div className="header">
        <h4>Title</h4>
        <div className="action">
          <span>icon</span>
        </div>
      </div>
      {[...Array(2)].map(() => (
        <CardItems />
      ))}
      <div className="footer">
        <AddInput />
        <div className="add_item">
          <span>Add Card Item</span>
          <span>copy</span>
        </div>
      </div>
    </div>
  );
};

export default Lists;
