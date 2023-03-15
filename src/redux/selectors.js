export const getContacts = state => state.contacts.items;

export const getError = state => state.contacts.error;

export const getLoadingStatus = state => state.contacts.isLoading;

export const getFilterValue = state => state.filter;
