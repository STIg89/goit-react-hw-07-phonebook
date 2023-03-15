import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contacts = {
  isLoading: false,
  error: null,
  items: [],
};

const isPending = state => {
  state.isLoading = true;
};

const isFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  switch (action.type) {
    case 'contacts/fetchAll/fulfilled':
      state.items = action.payload;
      break;
    case 'contacts/addContact/fulfilled':
      state.items.push(action.payload);
      break;
    case 'contacts/deleteContact/fulfilled':
      const index = state.items.findIndex(({ id }) => id === action.payload.id);
      state.items.splice(index, 1);
      break;
    default:
      return;
  }
};

const isRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contacts,
  extraReducers: {
    [fetchContacts.pending]: isPending,
    [fetchContacts.fulfilled]: isFulfilled,
    [fetchContacts.rejected]: isRejected,
    [addContact.pending]: isPending,
    [addContact.fulfilled]: isFulfilled,
    [addContact.rejected]: isRejected,
    [deleteContact.pending]: isPending,
    [deleteContact.fulfilled]: isFulfilled,
    [deleteContact.rejected]: isRejected,
  },
});
export const contactsReducer = contactsSlice.reducer;
