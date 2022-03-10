import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export interface ButtonProps {
  title?: string;
  size?: string;
  type?: string;
  color?: string;
  onClick?: MouseEventHandler;
  iconPosition?: string;
}

export interface AddCardProps {
  showAddInput: boolean;
  setShowAddInput: Dispatch<SetStateAction<boolean>>;
}
