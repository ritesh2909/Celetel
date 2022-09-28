import {
  CREATE_ENTRY,
  GET_ENTRIES,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../actions/entries";

const initialState = {
  entries: [],
  currentEntry: null,
  loading: false,
  loadMore: true,
};

const entriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ENTRIES:
      if (payload.length === 0) {
        return {
          ...state,
          loadMore: false,
        };
      }
      return {
        ...state,
        entries: [...state.entries, ...payload],
      };

    case CREATE_ENTRY:
      return {
        ...state,
        entries: [...state.entries, payload],
      };

    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== payload),
      };

    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === payload._id ? payload : entry
        ),
      };

    case SET_CURRENT:
      return {
        ...state,
        currentEntry: payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        currentEntry: null,
      };
    default:
      return state;
  }
};

export default entriesReducer;
