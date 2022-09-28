const express = require("express");
const verifyUser = require("../middleware/verify-user");

const Entry = require("../models/Entry");
const route = express.Router();

route.get("/entries", verifyUser, async (req, res) => {
  let { page } = req.query;
  page = parseInt(page);
  try {
    if (!page) {
      page = 1;
    }
    const skip = (page - 1) * 3;
    const entries = await Entry.find({ user: req.user._id })
      .sort({ username: -1 })
      .limit(3)
      .skip(skip)
      .populate("user", "name email");
    // .populate({
    //   path: "user",
    //   select: "name email",
    //   options: { sort: { date: -1 } },
    // });
    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

route.get("/entries", verifyUser, async (req, res) => {
  console.log("normal hit");
  try {
    const entries = await Entry.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    // console.log("entries",entries);
    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

route.post("/entries", verifyUser, async (req, res) => {
  try {
    const { username, email,phone,company } = req.body;
    const newEntry = new Entry({ user: req.user._id, username, email,phone,company });
    await newEntry.save();
    res.status(201).json({
      success: true,
      message: "Entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

route.patch("/entries/:id", verifyUser, async (req, res) => {
  try {
    const updatedData = await Entry.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "entry updated successfuly",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

route.delete("/entries/:id", verifyUser, async (req, res) => {
  try {
    await Entry.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "removed successfuly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = route;
