import React, { ReactNode } from 'react';
import { Meta } from '@/layout/Meta';
import Link from 'next/link';

type LayoutProps = {
  title: string;
  description: string;
  backHref?: string;
  children: ReactNode;
};

const Layout = ({ title, description, backHref, children }: LayoutProps) => (
  <div className="page">
    <Meta title={title} description={description} />

    <div className="title-bar">
      {!!backHref && (
        <Link href={backHref}>
          <a>&lt;- Go Back</a>
        </Link>
      )}

      <h1 className="page-title">{title}</h1>
    </div>

    <div className="horizontal-dashed-row" />

    {children}
  </div>
);

export default Layout;
