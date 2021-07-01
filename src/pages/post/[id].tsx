import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/layout/Layout';
import { PostModel } from '@/interfaces/Post.model';
import styles from '@/styles/PostPage.module.scss';
import { CommentModel } from '@/interfaces/Comment.model';
import { Comment } from '@/components/Comment';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import { PlaceholderAPI } from '@/external-api/PlaceholderAPI';
import { fetcher } from '@/utils/Utils';
import { useUser } from '@/hooks/useUser';

type PostProps = {
  post: PostModel;
  comments: CommentModel[];
};

const PostPage = ({ post, comments }: PostProps) => {
  const router = useRouter();
  const { data: user, isLoading } = useUser(post?.userId);
  if (router.isFallback || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title} description={post.title} backHref="/">
      <h3 className={styles.title}>{post.title}</h3>

      <h4 className={styles.username}>
        {isLoading ? (
          `Loading...`
        ) : (
          <div>
            <a>{`Author: #${user.username}`}</a>
          </div>
        )}
      </h4>

      <pre className={styles.body}>{post.body}</pre>

      {comments.length > 0 && <h4 className={styles.comments}>Comments:</h4>}

      <div className={styles.container}>
        {comments.map((comment: CommentModel) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PostProps> = async (
  context: GetStaticPropsContext,
) => {
  const id = `${context.params?.id ?? ``}`;
  const post: PostModel = await fetcher(PlaceholderAPI.post(id));
  const comments: CommentModel[] = await fetcher(PlaceholderAPI.comments(id));

  return {
    props: {
      post,
      comments,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async (
  /* eslint-disable @typescript-eslint/no-unused-vars */
  context: GetStaticPathsContext,
) => {
  const posts: PostModel[] = await fetcher(PlaceholderAPI.posts());

  const paths = posts.map((post: PostModel) => ({
    params: {
      id: `${post.id}`,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default PostPage;
