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
  const [cardObj, setCardObj] = useState<CardListProp>();
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * @name handleSubmit
   * @description set cardObj state and setShow input false
   * @return callprimise all
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('E', e);
    if (inputValue === '' || error) {
      setError(true);
      return setShowAddInput(false);
    }

    const obj = {
      type: cardData.type,
      status: cardData.status,
      title: inputValue,
      id: generateId,
    };

    const promiseAll = Promise.all([await setCardObj(obj), await setShowAddInput(false)]);

    return promiseAll;
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
  }, [cardObj, setCardLists]);

  useEffect(() => {
    handleSetBoardList();
  }, [handleSetBoardList]);

  /**
   * @name handleCreateCard
   * @description handleCreateCard set input value to state
   * @return none
   */
  const handleCreateCard = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className="add__card">
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleCreateCard}
          value={inputValue}
          name="Card Text"
          ref={inputRef}
          rows={4}
          placeholder="Enter a title for this card"
        />

        <div className="actions flex__between">
          <AddButton
            type="submit"
            size={20}
            handleClose={() => setShowAddInput(false)}
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
