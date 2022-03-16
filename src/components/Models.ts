import { ChangeEvent, Dispatch, FormEvent, MouseEventHandler, SetStateAction } from 'react';

export interface ButtonProps {
  title?: string;
  size?: string;
  type?: 'submit' | 'button' | 'reset';
  color?: string;
  onClick?: MouseEventHandler;
  iconPosition?: string;
  fullWidth?: boolean;
}

export interface AddButtonProps {
  handleClose?: MouseEventHandler;
  title?: string;
  type: 'submit' | 'button' | 'reset';
  iconPosition?: string;
  size?: number;
  color?: string;
  handleAdd?: MouseEventHandler;
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

export interface AddCardProps {
  showAddInput: boolean;
  setShowAddInput: Dispatch<SetStateAction<boolean>>;
  cardData: BoardListProp;
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
}

export interface ListProp {
  data: BoardListProp;
  cardLists: CardListProp[];
  setCardLists: Dispatch<SetStateAction<CardListProp[]>>;
  setBoardLists: Dispatch<SetStateAction<BoardListProp[]>>;
  boardLists: BoardListProp[];
}

export interface EditFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, id: string) => void;
  inputValue: string;
  id: string;
  name: string;
  placeholder: string;
}
