import Button from 'components/Button';
import { BoardListProp, CardListProp } from 'components/Models';
import React, { useState } from 'react';
import { AiOutlineCopy, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/Lists.styles.scss';
import AddCard from './AddCard';
import CardItems from './CardItems';

interface ListProp {
  data: BoardListProp;
}

const Lists = (props: ListProp) => {
  const [showAddInput, setShowAddInput] = useState<boolean>(false);
  const { data } = props;

  const [cardLists, setCardLists] = useState<CardListProp[]>([]);

  console.log(cardLists);

  return (
    <div className="board__item">
      <div className="header flex__between">
        <h4>{data.title}</h4>
        <BiDotsHorizontalRounded />
      </div>
      {cardLists
        .filter((item) => item.type === data.title)
        .map((card) => (
          <CardItems key={card.id} data={card} />
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
