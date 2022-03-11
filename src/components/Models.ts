import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export interface ButtonProps {
  title?: string;
  size?: string;
  type?: 'submit' | 'button' | 'reset';
  color?: string;
  onClick?: MouseEventHandler;
  iconPosition?: string;
}

export interface AddCardProps {
  showAddInput: boolean;
  setShowAddInput: Dispatch<SetStateAction<boolean>>;
}
