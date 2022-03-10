import Button from 'components/Button';
import React from 'react';
import '../../assets/scss/AddCard.styles.scss';

const AddCard = () => {
  return (
    <div className="add__card">
      <textarea rows={5} />
      <Button title="Add Card" color="primary" />
    </div>
  );
};

export default AddCard;
