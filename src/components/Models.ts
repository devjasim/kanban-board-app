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

export interface AddButtonProps {
  onClick?: MouseEventHandler;
  title?: string;
  type: 'submit' | 'button' | 'reset';
  iconPosition?: string;
  size?: number;
  color?: string;
  handleAdd?: () => void;
}

export interface CardListProp {
  id: string;
  title: string;
  type: string;
  status: string;
}

export interface BoardListProp {
  id: string;
  title: string;
  type: string;
  status: string;
}
