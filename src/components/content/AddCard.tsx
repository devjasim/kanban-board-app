import { AddCardProps, CardListProp } from 'components/Models';
import uniqueId from 'components/utils';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import '../../assets/scss/AddCard.styles.scss';
import AddButton from './AddButton';

const AddCard = (props: AddCardProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const generateId = uniqueId();

  const { setShowAddInput, cardData, setCardLists } = props;
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
  const handleSubmit = async () => {
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
   * @name onKeyDown
   * @description onKeyDown textarea misbehaves not submit form when
   * press enter so we track keydown and check if it's enter then submit form.
   * @return none
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
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
          onKeyDown={(e) => onKeyDown(e)}
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
        </div>
      </form>
    </div>
  );
};

export default AddCard;
