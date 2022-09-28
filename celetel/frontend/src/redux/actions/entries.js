import axios from "axios";
export const GET_ENTRIES = "GET_ENTRIES";
export const CREATE_ENTRY = "CREATE_ENTRY";
export const DELETE_ENTRY = "DELETE_ENTRY";
export const UPDATE_ENTRY = "UPDATE_ENTRY";
export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";

export const getEntries = (page) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`/api/entries?page=${page}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(res);
      const entries = res.data.data;
      dispatch({
        type: GET_ENTRIES,
        payload: entries,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createEntry = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/entries", data, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(res);
      const entry = res.data.data;
      dispatch({
        type: CREATE_ENTRY,
        payload: entry,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteEntry = (data) => {
  return async (dispatch) => {
    console.log("Deleting entry");
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/entries/${data}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: DELETE_ENTRY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEntry = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `/api/entries/${data._id}`,
        { username: data.username, email: data.email, phone: data.phone, company: data.company },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const updatedEntry = res.data.data;
      dispatch({
        type: UPDATE_ENTRY,
        payload: updatedEntry,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCurrentEntry = (data) => {
  return {
    type: SET_CURRENT,
    payload: data,
  };
};

export const clearCurrentEntry = () => {
  return {
    type: CLEAR_CURRENT,
  };
};
