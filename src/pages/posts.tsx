import { type NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { api } from '~/utils/api';

const Posts: NextPage = () => {
  const postGetAllQuery = api.post.getAll.useQuery();
  const addPostMutation = api.post.addPost.useMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  if (postGetAllQuery.isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  const handleAddPost = (
    e: ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addPostMutation.mutate(
      { title, content },
      {
        onSuccess: (result) => {
          postGetAllQuery.refetch();
        },
      }
    );
    setTitle('');
    setContent('');
  };
  return (
    <div>
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          name="tcontent"
          value={content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
        <input type="submit" value="Submit" />
      </form>
      <h1>Posts</h1>
      {postGetAllQuery.data?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <h4>{post.createdAt.toLocaleString()}</h4>
        </div>
      ))}
    </div>
  );
};

export default Posts;
