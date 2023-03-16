import { useState } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectLoadingStatus } from 'redux/selectors';
import { addContact } from 'redux/operations';
import {
  Notification,
  onSameNumberNotify,
} from 'utils/Notification/Notification';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoadingStatus);

  const onInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notification(name);
      return;
    } else if (contacts.find(contact => contact.phone === number)) {
      onSameNumberNotify(number);
      return;
    } else {
      dispatch(addContact({ name, phone: number }));
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputChange}
          value={name}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInputChange}
          value={number}
        />
      </Label>
      <Button type="submit" disabled={isLoading}>
        Add Contact
      </Button>
    </Form>
  );
};
