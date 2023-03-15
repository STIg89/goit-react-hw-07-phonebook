import { List, Item, DelButton } from './ContactList.styled';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import {
  getFilterValue,
  getContacts,
  getLoadingStatus,
  getError,
} from 'redux/selectors';
import {
  noMatchesNotify,
  onErrorNotify,
} from 'components/Notification/Notification';
import { Spinner } from 'components/Spinner/spinner';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterValue);
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getLoadingStatus);
  const onError = useSelector(getError);

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

  return (
    <List>
      {isLoading && <Spinner />}
      {filteredContacts().map(({ id, name, phone }) => (
        <Item key={id}>
          {name}: {phone}
          <DelButton type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </DelButton>
        </Item>
      ))}
    </List>
  );
};
