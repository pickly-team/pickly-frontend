import { BookmarkItem } from '@/bookmarks/api/bookmark';

interface BookmarkListProps {
  bookmarkList: BookmarkItem[];
  renderItem: (item: BookmarkItem) => JSX.Element;
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
