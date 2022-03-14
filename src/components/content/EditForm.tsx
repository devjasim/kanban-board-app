import Button from 'components/Button';
import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import '../../assets/scss/EditForm.styles.scss';

interface EditFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, id: string) => void;
  inputValue: string;
  id: string;
  name: string;
  placeholder: string;
}

const EditForm = (props: EditFormProps) => {
  const { handleChange, handleSubmit, inputValue, id, placeholder, name } = props;

  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusRef?.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <form className="flex__between edit__form" onSubmit={(e) => handleSubmit(e, id)}>
      <input
        name={name}
        ref={focusRef}
        placeholder={placeholder}
        onChange={handleChange}
        type="text"
        value={inputValue}
      />

      <Button iconPosition="center" color="primary" title="Submit" type="submit">
        <BsCheckLg />
      </Button>
    </form>
  );
};

export default EditForm;
