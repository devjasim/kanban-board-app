import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react';
import AddButton from './AddButton';
import InputError from './InputError';

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  error: boolean;
  setShowComponent: Dispatch<SetStateAction<boolean>>;
}

const AddList = (props: Props) => {
  const { handleSubmit, handleChange, inputValue, error, setShowComponent } = props;

  const inputFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, []);

  return (
    <div className="add__list__input">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputFocusRef}
          onChange={handleChange}
          value={inputValue}
          type="text"
          placeholder="Enter list title"
        />
        {error && <InputError title="This is field is reuqired!" />}
        <AddButton
          type="submit"
          handleClose={() => setShowComponent(false)}
          size={20}
          iconPosition="right"
          title="Add Card"
          color="primary"
        />
      </form>
    </div>
  );
};

export default AddList;
