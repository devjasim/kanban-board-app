import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import uniqueId from 'components/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import '../../assets/scss/Board.styles.scss';
import AddList from './AddList';
import Lists from './Lists';

const Content = () => {
  const [showAddListInput, setShowAddListInput] = useState<boolean>(false);
  const [boardValue, setBoardValue] = useState<string>('');
  const [boardObj, setBoardObj] = useState<BoardListProp>();
  const [boardLists, setBoardLists] = useState<BoardListProp[]>([]);
  const [cardLists, setCardLists] = useState<CardListProp[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Generate Unique ID
  const generateId = uniqueId();

  /**
   * @name handleFormSubmit
   * @description when form submit add name with addition valuees in setBoardObj
   * @param e
   * @return none;
   */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (boardValue === '' || error) {
      return setError(true);
    }
    const promiseAll = Promise.all([
      setBoardObj({
        title: boardValue,
        id: generateId,
        type: boardValue,
        status: boardValue,
      }),
      setBoardValue(''),
    ]);
    return promiseAll;
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
    if (value === '') {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="board__container">
      {/* Board Lists Component  */}
      {boardLists.length > 0 &&
        boardLists.map((item) => (
          <Lists
            boardLists={boardLists}
            setBoardLists={setBoardLists}
            cardLists={cardLists}
            setCardLists={setCardLists}
            key={item.id}
            data={item}
          />
        ))}

      {/* Add a List Component  */}
      {!showAddListInput && (
        <div className="add__list">
          <Button
            title="Add a List"
            color="transparent"
            iconPosition="left"
            onClick={() => setShowAddListInput(true)}
          >
            <BiPlus size="20" />
          </Button>
        </div>
      )}

      {/* Add List Input Component  */}
      {showAddListInput && (
        <AddList
          handleChange={handleChange}
          handleSubmit={handleFormSubmit}
          inputValue={boardValue}
          error={error}
          setShowComponent={setShowAddListInput}
        />
      )}
    </div>
  );
};

export default Content;
