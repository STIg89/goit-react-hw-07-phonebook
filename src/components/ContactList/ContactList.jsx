import { List, Item, DelButton } from './ContactList.styled';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import {
  selectFilterValue,
  selectContacts,
  selectLoadingStatus,
  selectErrorStatus,
} from 'redux/selectors';
import {
  noMatchesNotify,
  onErrorNotify,
  noContactsNotify,
} from 'utils/Notification/Notification';
import { Spinner } from 'utils/Spinner/spinner';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterValue);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoadingStatus);
  const onError = useSelector(selectErrorStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    if (filtered.length === 0 && filter) {
      noMatchesNotify();
    }
    if (onError) {
      onErrorNotify();
    }
    return filtered;
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
    if (contacts.length === 1) {
      noContactsNotify();
    }
  };

  return (
    <List>
      {isLoading && <Spinner />}
      {filteredContacts().map(({ id, name, phone }) => (
        <Item key={id}>
          {name}: {phone}
          <DelButton
            type="button"
            disabled={isLoading}
            onClick={() => removeContact(id)}
          >
            Delete
          </DelButton>
        </Item>
      ))}
    </List>
  );
};
