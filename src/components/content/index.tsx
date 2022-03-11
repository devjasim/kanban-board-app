import Button from 'components/Button';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import './Board.styles.scss';
import Lists from './Lists';

const Content = () => {
  const handleTodoList = () => {
    console.log('OKAY');
  };

  const [showAddListInput, setShowAddListInput] = useState<boolean>(false);

  return (
    <div className="board__container">
      {[...Array(5)].map((item, i) => (
        <Lists key={Math.floor(Math.random() * 100)} />
      ))}

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
          <input type="text" />
          <Button title="Add List" type="submit" onClick={() => console.log('OK')} />
        </div>
      )}
    </div>
  );
};

export default Content;
