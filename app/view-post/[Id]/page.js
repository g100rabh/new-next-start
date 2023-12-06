"use client";

import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

const ViewPost = ({params}) => {
  const [post, setPost] = useState(null);
  const [session, setSession] = useState(null);

 
  async function getPost() {
    try {
      const res = await fetch(`/api/posts/${params.Id}`, {
        method: "GET",
      });
      if (res.ok) {
        const postData = await res.json();
        setPost({...postData});
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
console.log(post);
  

  return (
   
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-md shadow-lg">
      {!post ? <p>Loading...</p> : ( <div>
    
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600">
        Posted by {post.author.name} ({post.author.email})
      </p>
      <div className="mt-4">
        <p className="text-lg">{post.content}</p>
      </div>

      <div className="mt-8">
        {/* <h2 className="text-xl font-bold mb-4">Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-gray-600">
              <strong>{comment.userName}:</strong> {comment.comment}
            </p>
          </div>
        ))} */}

        {/* Comment Input Section */}
        <div className="mt-4">
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Add a comment..."
            // value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            // onClick={handleCommentSubmit}
          >
            Add Comment
          </button>
        </div>
      </div>
      </div>)}
    </div>

  );
};

export default ViewPost;
