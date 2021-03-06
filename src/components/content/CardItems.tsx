import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { VscLock, VscUnlock } from 'react-icons/vsc';
import '../../assets/scss/CardItems.styles.scss';
import EditForm from './EditForm';
import InputError from './InputError';

const { useEffect, useRef, useState } = React;

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
  const [cardLock, setCardLock] = useState<boolean>(false);

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

  /**
   * @name handleChange
   * @description set input value on change
   * @param e
   * @reutrn none
   */
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

  /**
   * @name handleDeleteCard
   * @description get id as param and filter card lists using the id and set new list
   * @param id
   * @return none;
   */
  const handleDeleteCard = (id: string) => {
    if (id) {
      const filtered = cardLists.filter((item) => item.id !== id);
      setCardLists(filtered);
    }
  };

  return (
    <>
      <div
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id={data.id}
        draggable={!cardLock}
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

        {/* Conditionally rendered depends on edit mood  */}
        {!edit && (
          <div className="card__actions">
            <Button
              type="button"
              onClick={() => setCardLock(!cardLock)}
              iconPosition="center"
              color="transparent"
            >
              {cardLock ? <VscLock size={15} /> : <VscUnlock size={15} />}
            </Button>
            <Button
              type="button"
              onClick={() => toggleEdit(data.title)}
              iconPosition="center"
              color="transparent"
            >
              <AiOutlineEdit size={15} />
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteCard(data.id)}
              iconPosition="center"
              color="transparent"
            >
              <BsTrash size={15} />
            </Button>
          </div>
        )}
      </div>
      {error && <InputError title="This field is required!" />}
    </>
  );
};

export default CardItems;
