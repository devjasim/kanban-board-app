import Button from 'components/Button';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/CardItems.scss';

const CardItems = () => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div onDoubleClick={() => setEdit(true)} className="card__item">
      {!edit ? <p>CardItems</p> : <input type="text" value="Card Item" />}
      <span className="edit">
        {edit ? (
          <Button
            iconPosition="center"
            onClick={() => setEdit(false)}
            color="primary"
            title="TITLE"
          >
            <BsCheckLg />
          </Button>
        ) : (
          <AiOutlineEdit />
        )}
      </span>
    </div>
  );
};

export default CardItems;
