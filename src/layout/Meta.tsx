import React from 'react';

import Head from 'next/head';
import { Config } from '@/utils/Config';

type IMetaProps = {
  title: string;
  description: string;
};

const Meta = ({ title, description }: IMetaProps) => (
  <>
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link
        rel="icon"
        href={`${process.env.baseUrl}/favicon.ico`}
        key="favicon"
      />
      <title>{`${title}`}</title>
      <meta name="description" content={description} key="description" />
      <meta name="author" content={Config.author} key="author" />
    </Head>
  </>
);

export { Meta };
