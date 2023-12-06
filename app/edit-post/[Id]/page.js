"use client";
import { useEffect, useRef, useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import prisma from "../../../lib/prisma";

const EditPosts = ({params}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const formRef = useRef();

  async function getPost() {
    try {
      const res = await fetch(`/api/posts/${params.Id}`, {
        method: "GET",
      });
      if (res.ok) {
        const postData = await res.json();
        setTitle(postData.title);
        setContent(postData.content);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }

  useEffect(()=>{
    getPost()
  },[])

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/put/${params.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if(res.ok){
        router.refresh();
      }
      
    } catch (error) {
      console.log(error);
    }

    formRef.current.reset();
  };

  const cancelHandler = (e)=> {
    e.preventDefault();
    router.push('/')
  }

  return (
    <div className={classes.container}>
      <Link className={classes.feedLink} href={"/"}>
        View Feed
      </Link>
      <h1>Edit Posts</h1>
      <form ref={formRef}>
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
        <span>
        <button onClick={submitHandler}>Submit</button>
        <button style={{backgroundColor: 'red'}} onClick={cancelHandler}>Cancel</button>
        </span>
      </form>
    </div>
  );
};

export default EditPosts;
