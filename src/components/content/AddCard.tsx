import { AddCardProps } from 'components/Models';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/AddCard.styles.scss';
import AddButton from './AddButton';

const AddCard = (props: AddCardProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { setShowAddInput, showAddInput } = props;
  const [cardValue, setCardValue] = useState<string>('');

  const setFoucs = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setFoucs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCardValue(value);
  };

  return (
    <div className="add__card">
      <form>
        <textarea onChange={handleChange} value={cardValue} ref={inputRef} rows={5} />
        <div className="actions flex__between">
          <AddButton
            type="submit"
            onClick={() => setShowAddInput(false)}
            size={20}
            iconPosition="right"
            title="Add Card"
            color="primary"
          />
          <BiDotsHorizontalRounded />
        </div>
      </form>
    </div>
  );
};

export default AddCard;
