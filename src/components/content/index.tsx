import Button from 'components/Button';
import { BoardListProp } from 'components/Models';
import ID from 'components/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import '../../assets/scss/Board.styles.scss';
import AddButton from './AddButton';
import Lists from './Lists';

const Content = () => {
  const handleTodoList = () => {
    console.log('OKAY');
  };

  const [showAddListInput, setShowAddListInput] = useState<boolean>(false);
  const [boardValue, setBoardValue] = useState<string>('');
  const [boardObj, setBoardObj] = useState<BoardListProp>();
  const [boardList, setBoardList] = useState<BoardListProp[]>([]);

  const generateId = ID();

  const handleAddBoard = (e: React.ChangeEvent<HTMLFormElement>) => {
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

  const setBoardLists = useCallback(() => {
    if (boardObj) {
      setBoardList((prev) => [...prev, boardObj]);
    }
    setBoardObj(undefined);
  }, [boardObj]);

  useEffect(() => {
    setBoardLists();
  }, [setBoardLists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBoardValue(value);
  };

  console.log('BOARD', boardValue);
  console.log('BOARD', boardList);

  return (
    <div className="board__container">
      {boardList.length > 0 && boardList.map((item, i) => <Lists key={item.id} data={item} />)}

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
          <form onSubmit={handleAddBoard}>
            <input onChange={handleChange} value={boardValue} type="text" />
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
