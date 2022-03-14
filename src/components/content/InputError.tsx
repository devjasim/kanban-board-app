import React from 'react';
import '../../assets/scss/InputError.styles.scss';

interface Props {
  title: string;
}
const InputError = ({ title }: Props) => {
  return <p className="input__error">{title}</p>;
};

export default InputError;
