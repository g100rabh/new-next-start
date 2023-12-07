"use client";

import { useEffect, useState } from "react";

const ViewPost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [emptyComment, setEmptyComment] = useState(false);

  async function getPost() {
    try {
      const res = await fetch(`/api/posts/${params.Id}`, {
        method: "GET",
      });
      if (res.ok) {
        const postData = await res.json();
        setPost({ ...postData });
        getComment();
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }

  async function getComment() {
    const postId = params.Id;
    const res = await fetch(`/api/get-comment/${postId}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      setComments([...data]);
    }
  }
  // getComment();
  console.log(comments);

  useEffect(() => {
    getPost();
  }, []);

  const handleCommentSubmit = async () => {
    if (newComment === null) {
      setEmptyComment(true);
      setTimeout(() => {
        setEmptyComment(false);
      }, 5000);
      return;
    }
    try {
      const postId = post.id;
      const res = await fetch("/api/comment-add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          postId,
        }),
      });
      if (res.ok) {
        setNewComment("");
        getComment();
      }
    } catch (error) {
      alert(error);
    }
  };

  console.log(post);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-md shadow-lg">
          {!post ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <p className="text-gray-600">
                Posted by {post.author.name} ({post.author.email})
              </p>
              <div className="mt-4">
                <p className="text-lg">{post.content}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <div
                style={{ maxHeight: '300px' }}
                  className={
                    comments && comments.length >= 5 ? "overflow-y-auto" : ""
                  }
                >
                  {comments &&
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-100 p-4 rounded-md mb-4"
                      >
                        <p className="text-gray-600">
                          <strong>{comment.email}:</strong> {comment.content}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Comment Input Section */}
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  {emptyComment && (
                    <p className="text-red-600">*Write Something</p>
                  )}
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={handleCommentSubmit}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewPost;
