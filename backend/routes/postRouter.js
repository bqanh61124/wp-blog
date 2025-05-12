const express = require("express");
const Post = require("../db/postModel");
const router = express.Router();

// Create a new post
router.post("/post", async (request, response) => {
  try {
    const post = new Post(request.body);
    await post.save();
    response.status(201).send(post);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// Get all posts
router.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    response.send(posts);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// Get a single post by slug
router.get("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.send(post);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// Update a post
router.patch("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: request.params.slug },
      { ...request.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.send(post);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// Delete a post
router.delete("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOneAndDelete({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.status(204).send();
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

module.exports = router; 