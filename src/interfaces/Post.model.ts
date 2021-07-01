import { InfiniteScrollModel } from '@/interfaces/InfiniteScroll.model';

export interface PostModel extends InfiniteScrollModel {
  userId: number;
  title: string;
  body: string;
}
