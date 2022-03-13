import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/CardItems.styles.scss';

interface CardProps {
  data: BoardListProp;
}

const CardItems = (props: CardProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const { data } = props;

  const inputRef = useRef<any>(null);
  const [cardObj, setCardObj] = useState<CardListProp>();
  const [inputValue, setInputValue] = useState<string>('');

  const setFoucs = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setFoucs();
    const check = setFoucs();
  }, [setFoucs, inputRef]);

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('EDIT CARD', e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div onDoubleClick={() => setEdit(true)} className="card__item">
      {!edit ? (
        <p>{data.title}</p>
      ) : (
        <form onSubmit={handleEdit}>
          <input ref={inputRef} onChange={handleChange} type="text" value={inputValue} />
          <span className="edit">
            <Button
              iconPosition="center"
              onClick={() => setEdit(false)}
              color="primary"
              title="TITLE"
              type="submit"
            >
              <BsCheckLg />
            </Button>
          </span>
        </form>
      )}
      <span className="edit">{!edit && <AiOutlineEdit onClick={() => setEdit(true)} />}</span>
    </div>
  );
};

export default CardItems;
