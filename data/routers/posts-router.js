const express = require("express");

const Posts = require("../helpers/postDb");

const router = express.Router();

router.post("/posts", (req, res) => {
  const { text, user_id } = req.body;
  if (!text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the post."
    });
  }
  if (!user_id) {
    return res.status(400).json({
      errorMessage: "Please provide user id of the post."
    });
  }
  Posts.insert(req.body)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/posts", (req, res) => {
  Posts.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  Posts.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ response, message: "Deleted!" });
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the post."
    });
  }
  Posts.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The post could not be retrieved." });
    });
  Posts.update(id, { text })
    .then(response => {
      if (response != 1) {
        return res
          .status(500)
          .json({ error: "The post information could not be modified." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
  Posts.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

module.exports = router;
