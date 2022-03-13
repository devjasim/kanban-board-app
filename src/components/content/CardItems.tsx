import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, FormEvent, SetStateAction } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/CardItems.styles.scss';

const { useCallback, useEffect, useRef, useState } = React;

interface CardProps {
  data: BoardListProp;
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
}

const CardItems = (props: CardProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const { data, setCardLists } = props;

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

  const onDragStart = (evt: DragEvent<HTMLDivElement>) => {
    console.log('OKAY');
    const element = evt.currentTarget;
    element.classList.add('dragged');
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = 'move';
  };
  const onDragEnd = (evt: DragEvent<HTMLDivElement>) => {
    console.log('END DRAG');
    evt.currentTarget.classList.remove('dragged');
  };

  return (
    <div
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      id={data.id}
      draggable
      onDoubleClick={() => setEdit(true)}
      className="card__item"
    >
      {!edit ? (
        <p>{data.title}</p>
      ) : (
        <form className="flex__center" onSubmit={handleEdit}>
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
      {!edit && (
        <span className="edit">
          <AiOutlineEdit onClick={() => setEdit(true)} />
        </span>
      )}
    </div>
  );
};

export default CardItems;
