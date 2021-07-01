import { GetStaticProps, GetStaticPropsContext } from 'next';
import { PostModel } from '@/interfaces/Post.model';
import { PlaceholderAPI } from '@/external-api/PlaceholderAPI';
import InfiniteScrollContent from '@/components/InfiniteScroll';
import { Post } from '@/components/Post';

import { fetcher } from '@/utils/Utils';
import Layout from '@/layout/Layout';

type HomeProps = {
  posts: PostModel[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <Layout title="Blog Posts" description="Blog Posts">
      <InfiniteScrollContent
        resource={posts}
        fetchMore={PlaceholderAPI.posts}
        limit={25}
        Component={Post}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (
  /* eslint-disable @typescript-eslint/no-unused-vars */
  context: GetStaticPropsContext,
) => {
  const posts: PostModel[] = await fetcher(PlaceholderAPI.posts(0, 25));

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
