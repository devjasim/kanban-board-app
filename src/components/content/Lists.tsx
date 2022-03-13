import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import { AiOutlineCopy, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/Lists.styles.scss';
import AddCard from './AddCard';
import CardItems from './CardItems';

interface ListProp {
  data: BoardListProp;
  cardLists: CardListProp[];
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
}

const Lists = (props: ListProp) => {
  const [showAddInput, setShowAddInput] = useState<boolean>(false);
  const { data, cardLists, setCardLists } = props;

  const onDragEnter = (evt: DragEvent<HTMLDivElement>) => {
    console.log('ENTER');
    evt.preventDefault();
    const element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDragLeave = (evt: DragEvent<HTMLDivElement>) => {
    console.log('WORKING LEAVE');
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
    console.log('OVER');
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (evt: DragEvent<HTMLDivElement>, value: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    const datas = evt.dataTransfer.getData('text/plain');
    console.log('DATAS', value);
    const tasks = cardLists;
    const updated = tasks.map((item) => {
      console.log('FUCK', item.status);
      if (item.id === datas) item.status = value;
      return item;
    });
    setCardLists(updated);
    console.log('INSIDE', updated);
  };

  console.log('CARD LISTs', cardLists);
  console.log('DATA', data.status);

  return (
    <div
      onDragEnter={(e) => onDragEnter(e)}
      onDrop={(e) => onDrop(e, data.status)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="board__item"
    >
      <div className="header flex__between">
        <h4>{data.title}</h4>
        <BiDotsHorizontalRounded />
      </div>
      {cardLists
        .filter((item) => item.status === data.title)
        .map((card) => (
          <CardItems setCardLists={setCardLists} key={card.id} data={card} />
        ))}
      <div className="footer">
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
