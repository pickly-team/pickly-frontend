/* eslint-disable @typescript-eslint/no-empty-function */
import useHandleBookmarkDetailMore from '@/bookmarks/service/hooks/detail/useHandleBookmarkDetailMore';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import Header from '@/common-ui/Header/Header';
import BSConfirmation from '@/common/ui/BSConfirmation';
import IconButton from '@/common/ui/IconButton';

const BookmarkDetailHeader = () => {
  const {
    deleteBookmarkBS,
    isMyBookmark,
    closeDeleteBookmarkBS,
    onClickBackCallback,
    onClickDeleteBookmark,
    onClickEditBookmark,
    openDeleteBookmarkBS,
    onClickReportBookmark,
    onClickAddToMyBookmark,
  } = useHandleBookmarkDetailMore();
  return (
    <>
      <Header
        rightButton={
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet>
              {!!isMyBookmark && (
                <>
                  <TriggerBottomSheet.Item onClick={onClickEditBookmark}>
                    수정하기
                  </TriggerBottomSheet.Item>
                  <TriggerBottomSheet.Item onClick={openDeleteBookmarkBS}>
                    삭제하기
                  </TriggerBottomSheet.Item>
                </>
              )}
              {!isMyBookmark && (
                <>
                  <TriggerBottomSheet.Item onClick={onClickAddToMyBookmark}>
                    내 북마크에 추가하기
                  </TriggerBottomSheet.Item>
                  <TriggerBottomSheet.Item onClick={onClickReportBookmark}>
                    신고하기
                  </TriggerBottomSheet.Item>
                </>
              )}
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        }
        showBackButton
        backButtonCallback={onClickBackCallback}
      />
      {/** 북마크 삭제 BS */}
      <BSConfirmation
        open={deleteBookmarkBS}
        onCancel={closeDeleteBookmarkBS}
        onClose={closeDeleteBookmarkBS}
        title="정말로 삭제하시겠습니까?"
        description="삭제된 북마크는 복구할 수 없습니다."
        onConfirm={onClickDeleteBookmark}
      />
    </>
  );
};

export default BookmarkDetailHeader;
