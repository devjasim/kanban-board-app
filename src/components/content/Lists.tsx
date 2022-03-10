import Button from 'components/Button';
import React, { useState } from 'react';
import { AiOutlineCopy, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import '../../assets/scss/Lists.styles.scss';
import AddInput from './AddCard';
import CardItems from './CardItems';

const Lists = () => {
  const [showAddInput, setShowAddInput] = useState<boolean>(false);
  return (
    <div className="board__item">
      <div className="header flex__between">
        <h4>Title</h4>
        <BiDotsHorizontalRounded />
      </div>
      {[...Array(2)].map(() => (
        <CardItems />
      ))}
      <div className="footer">
        {showAddInput ? (
          <AddInput showAddInput={showAddInput} setShowAddInput={setShowAddInput} />
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

export default Lists;
