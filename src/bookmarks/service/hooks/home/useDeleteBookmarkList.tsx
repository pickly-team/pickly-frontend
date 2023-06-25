import { useDELETEBookMarkMutation } from '@/bookmarks/api/bookmark';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { useState } from 'react';

interface DeleteBookmarkListProps {
  categoryId?: number;
}

const useDeleteBookmarkList = ({ categoryId }: DeleteBookmarkListProps) => {
  const [isEditMode, setEditMode] = useState(false);

  const {
    close: deleteBookmarkClose,
    isOpen: isDeleteBookmarkOpen,
    open: deleteBookmarkOpen,
  } = useBottomSheet();

  const [deleteBookmarkList, setDeleteBookmarkList] = useState<number[]>([]);

  const onClickBookmarkItemInEdit = (id: number) => {
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
  const { mutate } = useDELETEBookMarkMutation({ userId: 1, categoryId });
  const onClickDelete = () => {
    // 1. 북마크 삭제
    mutate({ bookmarkIds: deleteBookmarkList });
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
