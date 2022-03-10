import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import '../../assets/scss/CardItems.scss';

const CardItems = () => {
  return (
    <div className="card__item">
      <p>CardItems</p>
      <span className="edit">
        <AiOutlineEdit />
      </span>
    </div>
  );
};

export default CardItems;
