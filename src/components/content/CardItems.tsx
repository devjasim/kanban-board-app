import Button from 'components/Button';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/CardItems.styles.scss';

const CardItems = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const setFoucs = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setFoucs();
    const check = setFoucs();
  }, [setFoucs, inputRef]);

  return (
    <div onDoubleClick={() => setEdit(true)} className="card__item">
      {!edit ? <p>CardItems</p> : <input ref={inputRef} type="text" value="Card Item" />}
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
          <AiOutlineEdit onClick={() => setEdit(true)} />
        )}
      </span>
    </div>
  );
};

export default CardItems;
