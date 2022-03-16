import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/Lists.styles.scss';
import AddCard from './AddCard';
import CardItems from './CardItems';
import EditForm from './EditForm';

const { useEffect, useState, useCallback, useRef } = React;

interface ListProp {
  data: BoardListProp;
  cardLists: CardListProp[];
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
  setBoardLists: Dispatch<SetStateAction<BoardListProp[]>>;
  boardLists: BoardListProp[];
}

const Lists = (props: ListProp) => {
  const { data, cardLists, setCardLists, boardLists, setBoardLists } = props;

  const [showAddInput, setShowAddInput] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [openActionPopup, setOpenActionPopup] = useState<boolean>(false);

  const onDragEnter = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDragLeave = (evt: DragEvent<HTMLDivElement>) => {
    const { currentTarget } = evt;
    const newTarget = evt.relatedTarget;
    if (newTarget) {
      if (newTarget === currentTarget) {
        return;
      }
    }
    evt.preventDefault();
    const element = evt.currentTarget;
    element.classList.remove('dragged-over');
  };

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (evt: DragEvent<HTMLDivElement>, value: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    const datas = evt.dataTransfer.getData('text/plain');
    const tasks = cardLists;
    const updated = tasks.map((item) => {
      if (item.id === datas) item.status = value;
      return item;
    });
    setCardLists(updated);
  };

  console.log('CARD LISTs', cardLists);
  console.log('DATA', data.status);

  /**
   * @name handleTitleEdit
   * @description Edti list title and return new array and update state
   * @param {*} e, id
   * @return update setCardLists and setTitleEdit state
   */
  const handleTitleEdit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    if (titleValue === '' || titleError) {
      return setTitleError(true);
    }
    const editData = boardLists.map((item) => {
      if (item.id === id) item.title = titleValue;
      return item;
    });
    const promiseAll = Promise.all([setBoardLists(editData), setTitleEdit(false)]);
    return promiseAll;
  };

  const editTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleSetEdit = (title: string) => {
    setTitleEdit(!titleEdit);
    setTitleValue(title);
  };

  const handleOpenAction = () => {
    setOpenActionPopup(!openActionPopup);
  };

  const actionPopupRef = useRef<HTMLDivElement>(null);

  const handleDelete = (id: string, status: string) => {
    const filterCard = cardLists.filter((item) => item.status !== status);
    const filterList = boardLists.filter((item) => item.id !== id);
    setBoardLists(filterList);
    setCardLists(filterCard);
  };

  return (
    <div
      onDragEnter={(e) => onDragEnter(e)}
      onDrop={(e) => onDrop(e, data.status)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="board__item"
    >
      <div className="header flex__between">
        <div className="title">
          {!titleEdit ? (
            <h4 onDoubleClick={() => handleSetEdit(data.title)}>{data.title}</h4>
          ) : (
            <EditForm
              name="Title"
              placeholder="Enter title here..."
              handleChange={editTitleChange}
              handleSubmit={handleTitleEdit}
              id={data.id}
              inputValue={titleValue}
            />
          )}
        </div>
        <Button type="button" onClick={handleOpenAction} color="transparent" iconPosition="center">
          <BiDotsHorizontalRounded size={20} />
        </Button>
        {openActionPopup && (
          <div ref={actionPopupRef} className="action__popup">
            <Button
              iconPosition="center"
              title="Edit"
              color="transparent"
              onClick={() => {
                handleSetEdit(data.title);
                setOpenActionPopup(false);
              }}
            >
              <AiOutlineEdit />
            </Button>
            <Button
              iconPosition="center"
              title="Delete"
              color="transparent"
              onClick={() => handleDelete(data.id, data.status)}
            >
              <AiOutlineDelete />
            </Button>
          </div>
        )}
      </div>

      {/* Card Lists Component */}
      {cardLists
        .filter((item) => item.status === data.status)
        .map((card) => (
          <CardItems cardLists={cardLists} setCardLists={setCardLists} key={card.id} data={card} />
        ))}

      {/* Add Card Component */}
      <div className="add__card">
        {showAddInput ? (
          <AddCard
            setCardLists={setCardLists}
            cardData={data}
            showAddInput={showAddInput}
            setShowAddInput={setShowAddInput}
          />
        ) : (
          <div className="add_item flex__between">
            <Button
              color="transparent"
              title="Add a Card"
              type="button"
              iconPosition="left"
              onClick={() => setShowAddInput(true)}
            >
              <AiOutlinePlus size="18" />
            </Button>
            <AiOutlineCopy />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Lists);
