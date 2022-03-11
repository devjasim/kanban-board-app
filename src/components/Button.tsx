import React from 'react';
import '../assets/scss/Button.styles.scss';
import { ButtonProps } from './Models';

const Button: React.FC<ButtonProps> = (props) => {
  const { title, color, children, iconPosition, onClick, type } = props;
  return (
    <button
      onClick={onClick}
      className={`button__${color} ${
        iconPosition === 'left'
          ? 'icon__left'
          : iconPosition === 'right'
          ? 'icon__right'
          : iconPosition === 'center'
          ? 'icon__center'
          : 'null'
      }`}
      // eslint-disable-next-line react/button-has-type
      type={type !== undefined ? type : 'button'}
    >
      {!children && title}

      {children && iconPosition === 'left' && (
        <>
          {children}
          {title}
        </>
      )}

      {children && iconPosition === 'right' && (
        <>
          {title}
          {children}
        </>
      )}

      {children && iconPosition === 'center' && children}
    </button>
  );
};

export default Button;
