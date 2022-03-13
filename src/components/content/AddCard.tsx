import { AddCardProps, CardListProp } from 'components/Models';
import uniqueId from 'components/utils';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/AddCard.styles.scss';
import AddButton from './AddButton';

const AddCard = (props: AddCardProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const generateId = uniqueId();

  const { setShowAddInput, showAddInput, cardData, setCardLists } = props;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [edit, setEdit] = useState<boolean>(false);

  const [cardObj, setCardObj] = useState<CardListProp>();
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const obj = {
      type: cardData.type,
      status: cardData.status,
      title: inputValue,
      id: generateId,
    };

    setCardObj(obj);
  };

  /**
   * @name handleSetBoardList
   * @description setBoardList array array update when boardObje exists and change
   * @return none
   */
  const handleSetBoardList = useCallback(() => {
    if (cardObj) {
      setCardLists((prev) => [...prev, cardObj]);
    }
    setCardObj(undefined);
  }, [cardObj]);

  useEffect(() => {
    handleSetBoardList();
  }, [handleSetBoardList]);

  const handleCreateCard = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className="add__card">
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleCreateCard} value={inputValue} ref={inputRef} rows={5} />
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
