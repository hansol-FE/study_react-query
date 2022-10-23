import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(["comments",post.id], ()=>fetchComments(post.id));
  const deleteMutaion = useMutation(()=> deletePost(post.id));
  const updateMutaion = useMutation(()=> updatePost(post.id));

  if(isLoading){
    return <div>loading...</div>
  }
  if(isError){
    return(<>
      <h3>Error!</h3>
      <p>{error.toString()}</p>
    </>)
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={(()=>deleteMutaion.mutate())}>Delete</button>
      {
        deleteMutaion.isError && <p>Error deleting the post</p>
      }
      {
        deleteMutaion.isLoading && <p>deleting the post..</p>
      }
      {
        deleteMutaion.isSuccess && <p>Success deleting the post..</p>
      }
      <button onClick={()=> updateMutaion.mutate()}>Update title</button>
      {
        updateMutaion.isError && <p>Error updating the post</p>
      }
      {
        updateMutaion.isLoading && <p>updating the post..</p>
      }
      {
        updateMutaion.isSuccess && <p>Success updating the post..</p>
      }
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
