import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/Lists.styles.scss';
import AddCard from './AddCard';
import CardItems from './CardItems';
import EditForm from './EditForm';

const { useState } = React;

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

  /**
   * @name onDragEnter
   * @description Set element current target and dragged-over class and set effect move
   * it's return nothing else remove dragged over class nad set current target
   * @param {*} evt value
   * @return update card lists
   */
  const onDragEnter = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const element = evt.currentTarget;
    element.classList.add('dragged__over');
    evt.dataTransfer.dropEffect = 'move';
  };

  /**
   * @name onDragLeave
   * @description when drag leave new if new target equal current target
   * it's return nothing else remove dragged over class nad set current target
   * @param {*} evt value
   * @return update card lists
   */
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
    element.classList.remove('dragged__over');
  };

  /**
   * @name onDragOver
   * @description when drag over set drop effect move
   * @param {*} evt value
   * @return update card lists
   */
  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  /**
   * @name onDrop
   * @description On Drop drag and drop item remove class and update card lists
   * @param {*} evt value
   * @return update card lists
   */
  const onDrop = (evt: DragEvent<HTMLDivElement>, value: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged__over');
    const datas = evt.dataTransfer.getData('text/plain');
    const tasks = cardLists;
    const updated = tasks.map((item) => {
      if (item.id === datas) item.status = value;
      return item;
    });
    setCardLists(updated);
  };

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

  /**
   * @name editTitleChange
   * @description set input value in state when input change
   * @param {*} e, id
   * @return
   */
  const editTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  /**
   * @name handleSetEdit
   * @description Open edit form and set input initial value
   * @return none
   */
  const handleSetEdit = (title: string) => {
    setTitleEdit(!titleEdit);
    setTitleValue(title);
  };

  /**
   * @name handleOpenAction
   * @description handleOpen action popup
   * @return none
   */
  const handleOpenAction = () => {
    setOpenActionPopup(!openActionPopup);
  };

  /**
   * @name handleDelete
   * @description Delete List with careds and update both card lists and board lists
   * @param {*} id, status
   * @return
   */
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

        {/* Action Button  */}
        <Button type="button" onClick={handleOpenAction} color="transparent" iconPosition="center">
          <BiDotsHorizontalRounded size={20} />
        </Button>

        {/* Action Popup  */}
        {openActionPopup && (
          <div className="action__popup">
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
