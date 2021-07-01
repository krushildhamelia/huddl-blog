import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = ({ meta, children }: IMainProps) => (
  <div className="main-content">
    {meta}

    <div className="nav-bar">
      <div className="nav-item">Blogs</div>
    </div>

    <div className="main-content">{children}</div>
  </div>
);

export { Main };
