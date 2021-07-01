import React from 'react';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import { PlaceholderAPI } from '@/external-api/PlaceholderAPI';
import styles from '@/styles/User.module.scss';
import { UserModel } from '@/interfaces/User.model';
import { fetcher } from '@/utils/Utils';
import { useRouter } from 'next/router';
import Layout from '@/layout/Layout';
import { Autocomplete } from '@/components/Autocomplete';

type UserProps = {
  user: UserModel;
  users: UserModel[];
};

const UserPage = ({ user, users }: UserProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const onUsernameSelected = (username: string) => {
    const selectedUser: UserModel | undefined = users.find(
      (currentUser: UserModel) => currentUser.username === username,
    );
    if (!selectedUser) {
      return;
    }
    router.push(`/user/${selectedUser.id}`);
  };
  return (
    <Layout
      title="User Information"
      description="User Information"
      backHref="/"
    >
      <div className={`${styles.detail}`}>
        Name: <b>{user.name}</b>
      </div>

      <div className={`${styles.detail}`}>
        Username: <b>{user.username}</b>
      </div>

      <div className={`${styles.detail}`}>
        Email: <b>{user.email}</b>
      </div>

      <div className={`${styles.detail}`}>
        Website: <b>{user.website}</b>
      </div>

      <div className={`${styles.detail}`}>
        Company Name: <b>{user.company.name}</b>
      </div>

      <h3 className={styles.search}>Search More Users:</h3>
      <Autocomplete
        suggestions={users.map(
          (currentUser: UserModel) => currentUser.username,
        )}
        onSuggestionSelected={onUsernameSelected}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<UserProps> = async (
  context: GetStaticPropsContext,
) => {
  const id = `${context.params?.id ?? ``}`;
  const user: UserModel = await fetcher(PlaceholderAPI.user(id));
  const users: UserModel[] = await fetcher(PlaceholderAPI.users());

  return {
    props: {
      user,
      users,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async (
  /* eslint-disable @typescript-eslint/no-unused-vars */
  context: GetStaticPathsContext,
) => {
  const users: UserModel[] = await fetcher(PlaceholderAPI.users());

  const paths = users.map((user: UserModel) => ({
    params: {
      id: `${user.id}`,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default UserPage;
