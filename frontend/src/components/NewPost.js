import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function NewPost() {
  const [newPost, setNewPost] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: post,
      });
      if (response.ok) setNewPost("Post created successfully!");
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post created failed!");
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Slug:</label>
          <input 
            type="text" 
            className="form-input"
            {...register("slug", { required: true })} 
          />
          {errors.slug && <div className="form-error">Slug is required</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Title:</label>
          <input 
            type="text" 
            className="form-input"
            {...register("title", { required: true })} 
          />
          {errors.title && <div className="form-error">Title is required</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <input 
            type="text" 
            className="form-input"
            {...register("description", { required: true })} 
          />
          {errors.description && <div className="form-error">Description is required</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Author:</label>
          <input 
            type="text" 
            className="form-input"
            {...register("author", { required: true })} 
          />
          {errors.author && <div className="form-error">Author is required</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Content:</label>
          <textarea 
            className="form-input"
            rows="6"
            {...register("content", { required: true })} 
          />
          {errors.content && <div className="form-error">Content is required</div>}
        </div>

        <button type="submit" className="submit-btn">Add New Post</button>
        {newPost && <p className="success-message">{newPost}</p>}
      </form>
    </div>
  );
}

export default NewPost; 