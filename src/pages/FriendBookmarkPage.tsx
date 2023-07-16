/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BookmarkList from '@/bookmarks/ui/Main/BookmarkList';
import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useBookmarkList from '@/bookmarks/service/hooks/home/useBookmarkList';
import useReadList from '@/bookmarks/service/hooks/home/useReadList';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import getRem from '@/utils/getRem';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/common-ui/Header/Header';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import { navigatePath } from '@/constants/navigatePath';
import {
  useGETFriendProfileQuery,
  usePOSTBlockMemberQuery,
} from '@/members/api/member';
import useAuthStore from '@/store/auth';

const FriendBookmarkPage = () => {
  // FIRST RENDER
  const { memberId } = useAuthStore();
  const { id: friendId } = useParams<{ id: string }>();
  const router = useNavigate();

  // SERVER
  // 1. 친구 프로필 조회
  const { data: profileInfo } = useGETFriendProfileQuery({
    loginId: memberId,
    memberId: Number(friendId),
  });

  // USER INTERACTION
  // 1. 상단 more > 신고하기
  const onClick_신고하기 = () => router(navigatePath.REPORT);

  // 2. 상단 more > 차단하기
  const { mutate: postBlockMember } = usePOSTBlockMemberQuery();
  const onClick_차단하기 = () => {
    postBlockMember({ blockeeId: Number(friendId), blockerId: memberId });
  };

  // 3. 카테고리 선택
  const { selectedCategory, categoryOptions, onChangeCategory } = useCategory({
    memberId: Number(friendId),
  });

  // 4. 읽은 북마크 선택
  const { isReadMode, onClickReadMode } = useReadList();

  // SERVER
  // 2. 북마크 리스트 조회
  const { bookMarkList, isLoading, fetchNextPage, isFetchingNextPage } =
    useBookmarkList({
      readByUser: isReadMode,
      categoryId: selectedCategory,
      memberId: Number(friendId),
    });

  // 5. 무한 스크롤
  const { bottom } = useBottomIntersection({ fetchNextPage });

  return (
    <>
      <Header
        showBackButton
        rightButton={
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet>
              <TriggerBottomSheet.Item onClick={onClick_신고하기}>
                신고하기
              </TriggerBottomSheet.Item>
              <TriggerBottomSheet.Item onClick={onClick_차단하기}>
                차단하기
              </TriggerBottomSheet.Item>
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        }
      />
      <LTop>
        <BookmarkUserInfo
          userEmoji={profileInfo?.profileEmoji || ''}
          userName={profileInfo?.nickname || ''}
          isFriendPage={{
            isFollowing: profileInfo?.isFollowing || false,
            friendId: Number(friendId),
            memberId,
          }}
        />
      </LTop>
      <BookmarkToggle>
        <BookmarkToggle.SelectCategory
          selectedCategory={String(selectedCategory)}
          categoryOptions={categoryOptions}
          setCategoryId={onChangeCategory}
        />
        <BookmarkToggle.ToggleRead
          isRead={isReadMode}
          onChangeRead={onClickReadMode}
        />
        <BlankView />
      </BookmarkToggle>
      <LMiddle>
        {!!isLoading &&
          [1, 2, 3, 4, 5, 6].map((item) => <BookmarkSkeletonItem key={item} />)}
        {!isLoading && bookMarkList?.pages.length && (
          <>
            {bookMarkList.pages[0].contents[0]?.bookmarkId &&
              bookMarkList.pages.map((page) => (
                <BookmarkList
                  key={page.contents[0].bookmarkId}
                  bookmarkList={page.contents?.filter(
                    (item) => item.readByUser === isReadMode,
                  )}
                  renderItem={(bookMarkList) => (
                    <BookmarkItem
                      key={bookMarkList.bookmarkId}
                      {...bookMarkList}
                    />
                  )}
                />
              ))}
          </>
        )}
        <div ref={bottom} />
        {isFetchingNextPage &&
          [1, 2, 3, 4, 5, 6].map((item) => <BookmarkSkeletonItem key={item} />)}
      </LMiddle>
    </>
  );
};

export default FriendBookmarkPage;

const LTop = styled.div`
  padding: ${getRem(20)} ${getRem(20)} 0 ${getRem(20)};
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;

const BlankView = styled.div`
  width: 30%;
`;
