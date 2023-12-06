"use client";
import { useRef, useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const formRef = useRef();
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("api/add-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if(res.ok){
      
        router.refresh();
        router.push('/')
      }
      
    } catch (error) {
      console.log(error);
    }

    formRef.current.reset();
  };

  return (
    
    <div className={classes.container}>
      <Link className={classes.feedLink} href={"/"}>
        View Feed
      </Link>
      <h1>Add Posts</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className={classes.innerCon}>
          <label htmlFor="title">Title:</label>
          <input
            className={classes.inputCon}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            className={classes.textareaCon}
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPosts;
