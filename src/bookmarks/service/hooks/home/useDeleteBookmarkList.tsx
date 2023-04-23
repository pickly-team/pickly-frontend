import { ClientBookMarkItem } from '@/bookmarks/api/bookmark';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { useState } from 'react';

interface DeleteBookmarkListProps {
  bookMarkList: ClientBookMarkItem[] | undefined;
  onChangeBookmarkList: (bookmarkList: ClientBookMarkItem[]) => void;
}

const useDeleteBookmarkList = ({
  bookMarkList,
  onChangeBookmarkList,
}: DeleteBookmarkListProps) => {
  const [isEditMode, setEditMode] = useState(false);

  const {
    close: deleteBookmarkClose,
    isOpen: isDeleteBookmarkOpen,
    open: deleteBookmarkOpen,
  } = useBottomSheet();

  const [deleteBookmarkList, setDeleteBookmarkList] = useState<string[]>([]);

  const onClickBookmarkItemInEdit = (id: string) => {
    if (deleteBookmarkList.includes(id)) {
      setDeleteBookmarkList(deleteBookmarkList.filter((item) => item !== id));
    } else {
      setDeleteBookmarkList([...deleteBookmarkList, id]);
    }
  };

  const onClickEdit = () => {
    if (isEditMode && deleteBookmarkList.length) {
      deleteBookmarkOpen();
      return;
    }
    setEditMode(!isEditMode);
  };

  // BS에 대한 이벤트 처리
  const onClickDelete = () => {
    // 1. 북마크 삭제
    // TODO : 북마크 삭제 API 연동
    bookMarkList &&
      onChangeBookmarkList(
        bookMarkList.filter((item) => !deleteBookmarkList.includes(item.id)),
      );
    // 2. 북마크 리스트 초기화
    setDeleteBookmarkList([]);
    // 3. 편집모드 종료
    setEditMode(false);
    // 4. BS 닫기
    deleteBookmarkClose();
  };

  return {
    isEditMode,
    deleteBookmarkList,
    isDeleteBookmarkOpen,
    onClickBookmarkItemInEdit,
    deleteBookmarkOpen,
    onClickEdit,
    onClickDelete,
  };
};

export default useDeleteBookmarkList;
