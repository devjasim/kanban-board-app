import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/CardItems.styles.scss';

const { useCallback, useEffect, useRef, useState } = React;

interface CardProps {
  data: BoardListProp;
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
  cardLists: CardListProp[];
}

const CardItems = (props: CardProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const { data, setCardLists, cardLists } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * @name handleEdit
   * @description Edti card name and return new array and update state
   * @param {*} e, id
   * @return none
   */
  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    console.log('EDIT DATA', e);
    const editData = cardLists.map((cardItem) => {
      if (cardItem.id === id) cardItem.title = inputValue;
      return cardItem;
    });
    setCardLists(editData);
    setEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  /**
   * @name onDragStart
   * @description Add Class Data Transfer and set Transfer data
   * @param e
   * @reutrn none
   */
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    console.log('OKAY');
    const element = e.currentTarget;
    element.classList.add('dragged');
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * @name onDragEnd
   * @des Remove Class form element
   * @param e
   * @return none
   */
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    console.log('END DRAG');
    e.currentTarget.classList.remove('dragged');
  };

  /**
   * @name toggleEdit
   * @description setEdit state make true for visible edit form and set input value
   * @param value
   * @return none;
   */
  const toggleEdit = (value: string) => {
    setEdit(true);
    setInputValue(value);
  };

  console.log('CARD', cardLists);

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
        <form className="flex__between" onSubmit={(e) => handleEdit(e, data.id)}>
          <input
            ref={inputRef}
            onChange={handleChange}
            type="text"
            name="cardname"
            value={inputValue}
          />
          <Button iconPosition="center" color="primary" title="Submit" type="submit">
            <BsCheckLg />
          </Button>
        </form>
      )}
      {!edit && (
        <span className="edit">
          <AiOutlineEdit onClick={() => toggleEdit(data.title)} />
        </span>
      )}
    </div>
  );
};

export default CardItems;
