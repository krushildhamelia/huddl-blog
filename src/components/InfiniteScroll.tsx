import React, { FunctionComponent, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteScrollModel } from '@/interfaces/InfiniteScroll.model';
import { fetcher } from '@/utils/Utils';

type InfiniteScrollProps = {
  resource: InfiniteScrollModel[];
  fetchMore: (start: number, limit: number) => string;
  limit: number;
  Component: FunctionComponent<any>;
};

const InfiniteScrollContent = ({
  resource,
  fetchMore,
  limit,
  Component,
}: InfiniteScrollProps) => {
  const [data, setData] = useState(resource);
  const [hasMore, setHasMore] = useState(resource.length <= limit);

  const getMoreData = async () => {
    const newData: InfiniteScrollModel[] = await fetcher(
      fetchMore(data.length, limit),
    );

    if (newData.length < limit) {
      setHasMore(false);
    }
    setData([...data, ...newData]);
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={getMoreData}
      hasMore={hasMore}
      loader={<h3> Loading... </h3>}
      endMessage={<h4>No More Data Available</h4>}
    >
      {data.map((componentProps: InfiniteScrollModel) => (
        <Component key={componentProps.id} post={componentProps} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollContent;
