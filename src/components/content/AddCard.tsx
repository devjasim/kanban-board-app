import { AddCardProps } from 'components/Models';
import React, { useEffect, useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/AddCard.styles.scss';
import AddButton from './AddButton';

const AddCard = (props: AddCardProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
        <AddButton
          type="button"
          onClick={() => setShowAddInput(false)}
          size={20}
          iconPosition="right"
          title="Add Card"
          color="primary"
        />
        <BiDotsHorizontalRounded />
      </div>
    </div>
  );
};

export default AddCard;
