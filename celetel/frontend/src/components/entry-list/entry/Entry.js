import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentEntry,
  deleteEntry,
  setCurrentEntry,
  updateEntry,
} from "../../../redux/actions/entries";
const Entry = ({ entry, changeValues }) => {
  const dispatch = useDispatch();

  const [entryLoading, setEntryLoading] = useState("");

  const handleDelete = async () => {
    setEntryLoading("DELETE");
    await dispatch(clearCurrentEntry());
    await dispatch(deleteEntry(entry._id));
    setEntryLoading("");
  };

  const handleEdit = async () => {
    await changeValues({ username: entry.username, email: entry.email, phone: entry.phone, company: entry.company });
    await dispatch(setCurrentEntry(entry));
  };
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-6 " style={{"display": "flex"}} >
      <div className="flex flex-col start">
        <div className="font-semibold dark:text-gray-300 text-md">
          {entry.username}
        </div>
        <div className="font-semibold dark:text-gray-300 text-md">
          {entry.email}
        </div>

        <div className="font-semibold dark:text-gray-300 text-md">
          {entry.phone}
        </div>
        <div className="font-semibold dark:text-gray-300 text-md">
          {entry.company}
        </div>
      </div>
      <div className="flex flex-col items-end text-sm font-semibold">
        <button
          className="tracking-widest text-red-700 uppercase hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
          onClick={handleDelete}>
          {entryLoading === "DELETE" ? "deleting..." : "delete"}
        </button>
        <button
          className="tracking-widest text-teal-800 uppercase hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
          onClick={handleEdit}>
          edit
        </button>
      </div>
    </div>
  );
};

export default Entry;
