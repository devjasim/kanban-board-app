import React from 'react';
import '../assets/scss/Button.styles.scss';
import { ButtonProps } from './Models';

const Button: React.FC<ButtonProps> = (props, ...rest) => {
  const { title, color } = props;
  return (
    <button className={`button__${color}`} type="button">
      {title}
    </button>
  );
};

export default Button;
