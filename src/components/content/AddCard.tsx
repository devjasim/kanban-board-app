import Button from 'components/Button';
import { AddCardProps } from 'components/Models';
import React, { useEffect, useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import '../../assets/scss/AddCard.styles.scss';

const AddCard = (props: AddCardProps) => {
  const inputRef = useRef<any>(null);

  const { setShowAddInput, showAddInput } = props;

  const setFoucs = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setFoucs();
  }, []);
  return (
    <div className="add__card">
      <textarea ref={inputRef} rows={5} />
      <div className="actions flex__between">
        <div className="buttons flex">
          <Button title="Add Card" color="primary" />
          <FaTimes onClick={() => setShowAddInput(false)} size={25} color="#848080" />
        </div>
        <BiDotsHorizontalRounded />
      </div>
    </div>
  );
};

export default AddCard;
