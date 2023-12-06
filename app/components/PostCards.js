"use client";
import { useRouter } from "next/navigation";
import classes from "./PostCards.module.css";

const PostCards = (props) => {
  const router = useRouter();

  const deleteHandler = async () => {
    console.log(props.post.id);
    console.log(props.post.author);
    try {
      const res = await fetch(`/api/posts/${props.post.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = () => {
    router.push(`/edit-post/${props.post.id}`);
  };

  return (
<div className="post-column col-xl-4 col-md-6 shadow-lg p-4 rounded-md box-border w-3/4">
  <article className="post tag-blog u-shadow flex flex-row w-full h-full">
    <div className="post-wrapper w-full h-full flex">
      <div className="post-media flex w-1/3 h-full">
        <div className="u-placeholder same-height rectangle w-full h-full">
          <img
            className="post-image u-object-fit object-cover lazyautosizes lazyloaded w-full"
            src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Post Image"
          />
        </div>
      </div>
      <div className="post-right px-3 my-2">
        <header className="post-header">
          <a className="post-tag font-semibold bg-blue-500 text-white py-0.5 px-1 rounded-lg" href="#">
            Blog
          </a>
          <h2 className="post-title text-3xl py-1 font-extrabold">
            <a className="post-title-link" href={`/view-post/${props.post.id}`}>
              {props.post.title}
            </a>
          </h2>
        </header>
        <div className="post-excerpt text-gray-500 py-1 text-md">
          {props.post.content}
        </div>
        <span className="post-card-tags text-xs text-gray-600">22 August 2023</span>
      </div>
    </div>
  </article>
</div>

  );
};

export default PostCards;
