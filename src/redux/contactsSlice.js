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
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, isPending)
      .addCase(fetchContacts.fulfilled, isFulfilled)
      .addCase(fetchContacts.rejected, isRejected)
      .addCase(addContact.pending, isPending)
      .addCase(addContact.fulfilled, isFulfilled)
      .addCase(addContact.rejected, isRejected)
      .addCase(deleteContact.pending, isPending)
      .addCase(deleteContact.fulfilled, isFulfilled)
      .addCase(deleteContact.rejected, isRejected);
  },
});
export const contactsReducer = contactsSlice.reducer;
