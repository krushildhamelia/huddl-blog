import React, { SyntheticEvent, useEffect } from 'react';
import { PostModel } from '@/interfaces/Post.model';
import { useUser } from '@/hooks/useUser';

import styles from '@/styles/Post.module.scss';
import { useRouter } from 'next/router';

type PostProps = {
  post: PostModel;
};

export const Post = ({ post }: PostProps) => {
  const { data: user, isLoading } = useUser(post.userId);
  const router = useRouter();

  const goToPost = (e: SyntheticEvent) => {
    e.stopPropagation();
    router.push({
      pathname: `/post/[id]`,
      query: { id: post.id },
    });
  };

  const goToUser = (e: SyntheticEvent) => {
    e.stopPropagation();
    router.push({
      pathname: `/user/[id]`,
      query: { id: post.userId },
    });
  };

  useEffect(() => {
    router.prefetch(`/user/${post.userId}`);
    router.prefetch(`/post/${post.id}`);
  }, [post.id, post.userId, router]);

  return (
    <div
      role="link"
      className={`${styles.post} touchable`}
      onClick={goToPost}
      onKeyDown={goToPost}
      tabIndex={0}
    >
      <h3 className={styles.title}>{post.title}</h3>

      <h6 className={`${styles.username} touchable`}>
        {isLoading ? (
          `Loading...`
        ) : (
          <div role="link" onClick={goToUser} tabIndex={0} onKeyDown={goToUser}>
            <a>{`#${user.username}`}</a>
          </div>
        )}
      </h6>
    </div>
  );
};
