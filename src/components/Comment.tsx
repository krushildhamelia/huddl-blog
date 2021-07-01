import React from 'react';

import styles from '@/styles/Comment.module.scss';
import { CommentModel } from '@/interfaces/Comment.model';

type CommentProps = {
  comment: CommentModel;
};

export const Comment = ({ comment }: CommentProps) => (
  <div className={styles.comment}>
    <h4 className={styles.subject}>{comment.name}</h4>

    <div className={styles.body}>{comment.body}</div>

    <div className={styles.email} style={{ textAlign: `center` }}>
      <a href={`mailto:${comment.email}`}>{comment.email}</a>
    </div>
  </div>
);
