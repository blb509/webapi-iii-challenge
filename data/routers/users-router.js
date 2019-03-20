const express = require("express");

const Users = require("../helpers/userDb");

const router = express.Router();

router.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Please provide name for username."
    });
  }
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

router.get("/users", (req, res) => {
  Users.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "Users information could not be retrieved."
      });
    });
});

router.get("/posts/user/:id", (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "User information could not be retrieved." });
    });
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json({ response, message: "Deleted!" });
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Please provide name for username."
    });
  }
  Users.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The user could not be retrieved." });
    });
  Users.update(id, { name })
    .then(response => {
      if (response != 1) {
        return res
          .status(500)
          .json({ error: "The user information could not be modified." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
  Users.getById(id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

module.exports = router;
