import Button from 'components/Button';
import { BoardListProp } from 'components/Models';
import uniqueId from 'components/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import '../../assets/scss/Board.styles.scss';
import AddButton from './AddButton';
import Lists from './Lists';

const Content = () => {
  const inputFocusRef = useRef<HTMLInputElement>(null);

  const [showAddListInput, setShowAddListInput] = useState<boolean>(false);
  const [boardValue, setBoardValue] = useState<string>('');
  const [boardObj, setBoardObj] = useState<BoardListProp>();
  const [boardLists, setBoardLists] = useState<BoardListProp[]>([]);

  // Generate Unique ID
  const generateId = uniqueId();

  /**
   * @name handleFormSubmit
   * @description when form submit add name with addition valuees in setBoardObj
   * @param e
   * @return none;
   */
  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (boardValue !== '') {
      setBoardObj({
        title: boardValue,
        id: generateId,
        type: boardValue,
        status: boardValue,
      });
    }
    setBoardValue('');
  };

  /**
   * @name handleSetBoardList
   * @description setBoardList array array update when boardObje exists and change
   * @return none
   */
  const handleSetBoardList = useCallback(() => {
    if (boardObj) {
      setBoardLists((prev) => [...prev, boardObj]);
    }
    setBoardObj(undefined);
  }, [boardObj]);

  useEffect(() => {
    handleSetBoardList();
  }, [handleSetBoardList]);

  /**
   * @name handleChange
   * @description When Add List Input Change set the value in a state
   * @param e
   * @return none
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBoardValue(value);
  };

  useEffect(() => {
    console.log('OK');
    if (inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, []);

  console.log(inputFocusRef);

  console.log('BOARD', boardValue);
  console.log('BOARD', boardLists);

  return (
    <div className="board__container">
      {boardLists.length > 0 && boardLists.map((item, i) => <Lists key={item.id} data={item} />)}

      {!showAddListInput && (
        <div className="add__list">
          <Button
            title="Add a List"
            color="transparent"
            iconPosition="left"
            onClick={() => setShowAddListInput(true)}
          >
            <BiPlus />
          </Button>
        </div>
      )}

      {showAddListInput && (
        <div className="add__list__input">
          <form onSubmit={handleFormSubmit}>
            <input ref={inputFocusRef} onChange={handleChange} value={boardValue} type="text" />
            <AddButton
              type="submit"
              onClick={() => setShowAddListInput(false)}
              size={20}
              iconPosition="right"
              title="Add Card"
              color="primary"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Content;
