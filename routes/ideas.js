const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "2022-01-02",
  },
  {
    id: 2,
    text: "Milk cartons that a different color the older that your milk is getting",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2022-01-02",
  },
  {
    id: 3,
    text: "ATM location app which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "BruceBanner",
    date: "2022-01-02",
  },
];

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

// Get single idea
router.get("/:id", async (req, res) => {
  try {
    const SelectedIdea = await Idea.findById(req.params.id);
    res.json({ success: true, data: SelectedIdea });
  } catch (error) {
    res.status(404).json({ success: false, error: "Resource not found" });
  }
});

// Add an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const newIdea = await idea.save();
    res.send({ success: true, data: newIdea });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update an idea
router.put("/:id", async (req, res) => {
  try {
    const updateIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updateIdea });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete an idea
router.delete("/:id", async (req, res) => {
  try {
    const deleteIdea = await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
