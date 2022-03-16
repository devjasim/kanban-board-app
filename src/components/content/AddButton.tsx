import Button from 'components/Button';
import { AddButtonProps } from 'components/Models';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../../assets/scss/AddButton.styles.scss';

const AddButton = (props: AddButtonProps) => {
  const { handleClose, title, type, size, color } = props;
  return (
    <div className="buttons flex">
      <Button title={title} type={type} color={color} />
      <FaTimes onClick={handleClose} size={size} color="#848080" />
    </div>
  );
};

export default AddButton;
