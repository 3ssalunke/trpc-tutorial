import { trpc } from "../../utils/trpc";

const Posts = () => {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      {data.length > 0 &&
        data.map((post: any) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Posts;
