import { ClientBookMarkItem } from '@/bookmarks/api/bookmark';

interface BookmarkListProps {
  bookmarkList: ClientBookMarkItem[];
  renderItem: (item: ClientBookMarkItem) => JSX.Element;
}

const BookmarkList = ({ bookmarkList, renderItem }: BookmarkListProps) => {
  return (
    <>
      {bookmarkList.map((bookmark) => {
        return renderItem(bookmark);
      })}
    </>
  );
};

export default BookmarkList;
