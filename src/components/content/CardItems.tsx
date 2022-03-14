import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import '../../assets/scss/CardItems.styles.scss';
import EditForm from './EditForm';
import InputError from './InputError';

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
  const [error, setError] = useState<boolean>(false);

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
    e.preventDefault();

    if (inputValue === '' || error) {
      return setError(true);
    }

    const editData = cardLists.map((cardItem) => {
      if (cardItem.id === id) cardItem.title = inputValue;
      return cardItem;
    });

    const promiseAll = Promise.all([setCardLists(editData), setEdit(false)]);
    return promiseAll;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value === '') {
      setError(true);
    } else {
      setError(false);
    }
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
    <>
      <div
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id={data.id}
        draggable
        className="card__item"
      >
        {!edit ? (
          <p>{data.title}</p>
        ) : (
          <EditForm
            handleChange={handleChange}
            handleSubmit={handleEdit}
            id={data.id}
            inputValue={inputValue}
            placeholder="Enter card name..."
            name="card_name"
          />
        )}
        {!edit && (
          <Button
            type="button"
            onClick={() => toggleEdit(data.title)}
            iconPosition="center"
            color="transparent"
          >
            <AiOutlineEdit size={15} />
          </Button>
        )}
      </div>
      {error && <InputError title="This field is required!" />}
    </>
  );
};

export default CardItems;
