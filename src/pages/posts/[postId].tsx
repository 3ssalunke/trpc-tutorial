import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const SinglePost = () => {
  const router = useRouter();
  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

export default SinglePost;
