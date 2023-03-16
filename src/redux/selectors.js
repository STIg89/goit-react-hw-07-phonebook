export const selectContacts = state => state.contacts.items;

export const selectErrorStatus = state => state.contacts.error;

export const selectLoadingStatus = state => state.contacts.isLoading;

export const selectFilterValue = state => state.filter;
