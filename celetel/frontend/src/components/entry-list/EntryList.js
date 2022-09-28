import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearCurrentEntry,
  createEntry,
  getEntries,
  updateEntry,
} from "../../redux/actions/entries";
import Input from "../common/form/Input";
import Paper from "../common/ui/Paper";
import Entry from "./entry/Entry";
const EntryList = () => {
  const { entries, currentEntry, loadMore } = useSelector((state) => state.entries);

  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    phone: "",
    company: "",
  });

  const [entryLoading, setEntryLoading] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntries(page));
  }, [page]);

  const loadMoreEntries = () => {
    setPage((prev) => prev + 1);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      company: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setEntryLoading(true);
      if (currentEntry) {
        const payload = {
          _id: currentEntry._id,
          username: values.username,
          email: values.email,
          phone: values.phone,
          company: values.company,
        };
        await dispatch(updateEntry(payload));
        await dispatch(clearCurrentEntry());
      } else {
        await dispatch(createEntry(values));
      }
      setEntryLoading(false);
      formik.values.username = "";
      formik.values.email = "";
      formik.values.phone = "";
      formik.values.company = "";
      
    },
  });

  return (
    <div className="flex items-start justify-center h-full p-4 mb-4">
      <Paper className="w-full overflow-hidden rounded-xl sm:w-1/2 lg:w-1/3 xl:w-1/3">
        <form
          className="flex flex-col items-end gap-6 p-6 bg-teal-500/30"
          onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Enter Username"
            id="username"
            name="username"
            type="text"
            width="full"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.username}
            formik={formik}
          />
          <Input
            placeholder="Enter Email"
            id="email"
            name="email"
            type="text"
            width="full"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.email}
            formik={formik}
          />
          <Input
            placeholder="Enter Phone"
            id="phone"
            name="phone"
            type="text"
            width="full"
            required
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.phone}
            formik={formik}
          />
          <Input
            placeholder="Enter Company"
            id="company"
            name="company"
            type="text"
            width="full"
            required
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.company}
            formik={formik}
          />
          <button
            type="submit"
            disabled={entryLoading}
            className="flex items-center justify-between gap-1 px-4 py-2 text-sm font-bold uppercase bg-teal-800 rounded-lg text-slate-50 dark:text-slate-200 dark:bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600">
            {!currentEntry ? "add" : "update"}
            {entryLoading && (
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-teal-200 to-teal-800 animate-spin"></div>
            )}
          </button>
        </form>
        <div className="flex flex-col " style={{"display": "flex","justifyContent": "space-around"}} >
          {entries.map((entry) => (
            <Entry key={entry._id} entry={entry} changeValues={setInitialValues}  style={{"display": "flex"}} />
          ))}
          {loadMore && (
            <button
              onClick={loadMoreEntries}
              className="flex items-center justify-center px-4 py-2 text-xs font-bold uppercase bg-teal-800 rounded-lg rounded-t-none text-slate-50 dark:text-slate-200 dark:bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600">
              load more...
            </button>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default EntryList;
