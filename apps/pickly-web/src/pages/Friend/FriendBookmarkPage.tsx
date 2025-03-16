/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';

import BookmarkToggle from '@/widgets/bookmarks/ui/Bookmark/BookmarkToggle';
import BookmarkUserInfo from '@/widgets/bookmarks/ui/BookmarkUserInfo';
import useCategory from '@/widgets/bookmarks/service/hooks/home/useCategory';
import useReadList from '@/widgets/bookmarks/service/hooks/home/useReadList';
import { useNavigate, useParams } from 'react-router-dom';

import useAuthStore from '@/shared/store/auth';
import BookmarkListView from '@/widgets/bookmarks/ui/Bookmark/BookmarkListView';
import { Suspense, useEffect } from 'react';

import BookmarkSkeletonItem from '@/widgets/bookmarks/ui/Bookmark/BookmarkSkeletonItem';
import useFriendStore from '@/shared/store/friend';
import useBookmarkStore from '@/shared/store/bookmark';
import SkeletonBookmarkUserInfo from '@/widgets/bookmarks/ui/SkeletonBookmarkUserInfo';

import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import { navigatePath } from '@/shared/constants/navigatePath';
import {
  useGETFriendProfileQuery,
  usePOSTBlockMemberQuery,
  useUnblockUserQuery,
} from '@/widgets/members/api/member';
import {
  getRem,
  Header,
  PullToRefresh,
  SkeletonWrapper,
} from '@pickly/design-system';
import TriggerBottomSheet from '@/shared/ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/shared/common/ui/IconButton';

const FriendBookmarkPage = () => {
  // FIRST RENDER
  const { memberId } = useAuthStore();
  const { id: friendId } = useParams<{ id: string }>();
  const { setFriendReadOption } = useBookmarkStore();
  const { setFriendId } = useFriendStore();

  useEffect(() => {
    setFriendId(Number(friendId));
    setFriendReadOption('💡 모두보기');
  }, [friendId]);

  // SERVER
  // 1. 친구 프로필 조회
  const { data: profileInfo, isLoading: profileLoading } =
    useGETFriendProfileQuery({
      loginId: memberId,
      memberId: Number(friendId),
    });

  // USER INTERACTION
  // 뒤로가기
  // 1. 상단 more > 신고하기
  const navigate = useNavigate();
  const onClick_신고하기 = () => {
    navigate(navigatePath.MEMBER_REPORT.replace(':id', String(friendId)));
  };

  // 1. 상단 more > 차단하기
  const { mutate: postBlockMember } = usePOSTBlockMemberQuery({ memberId });
  const onClick_차단하기 = () => {
    postBlockMember({ blockeeId: Number(friendId), blockerId: memberId });
  };
  const { mutate: deleteUnBlockMember } = useUnblockUserQuery({ memberId });
  const onClick_차단해제 = () => {
    deleteUnBlockMember({ blockeeId: Number(friendId), blockerId: memberId });
  };

  // 2. 카테고리 선택
  const { selectedCategoryId, categoryOptions, onChangeCategory } = useCategory(
    {
      memberId: Number(friendId),
      isFriendPage: true,
    },
  );

  // 3. 읽은 북마크 선택
  const { readSelectOptionsList, selectedReadOption, onClickReadMode } =
    useReadList({ memberId, isFriendPage: true });

  const { handleRefresh } = useHandleRefresh({ pageType: 'FRIEND_BOOKMARK' });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
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
              {!!profileInfo?.isBlocked && (
                <TriggerBottomSheet.Item onClick={onClick_차단해제}>
                  차단해제
                </TriggerBottomSheet.Item>
              )}
              {!profileInfo?.isBlocked && (
                <TriggerBottomSheet.Item onClick={onClick_차단하기}>
                  차단하기
                </TriggerBottomSheet.Item>
              )}
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        }
      />
      <LTop>
        {profileLoading ? (
          <SkeletonBookmarkUserInfo
            isFriendPage={{
              isFollowing: false,
              friendId: Number(friendId),
              memberId,
              isBlocked: false,
            }}
          />
        ) : (
          <BookmarkUserInfo
            userEmoji={profileInfo?.profileEmoji ?? ''}
            userName={profileInfo?.nickname ?? ''}
            isFriendPage={{
              isFollowing: profileInfo?.isFollowing ?? false,
              friendId: Number(friendId),
              memberId,
              isBlocked: profileInfo?.isBlocked ?? false,
            }}
          />
        )}
      </LTop>
      <BookmarkToggle isFriendPage>
        <BookmarkToggle.SelectCategory
          selectedCategoryId={selectedCategoryId}
          categoryOptions={categoryOptions}
          setCategoryId={onChangeCategory}
        />
        <BookmarkToggle.SelectReadMode
          readOptions={readSelectOptionsList}
          selectedReadOption={selectedReadOption}
          onChangeRead={onClickReadMode}
        />
        <BlankView />
      </BookmarkToggle>
      <LMiddle>
        <Suspense
          fallback={
            <SkeletonWrapper>
              {Array.from({ length: 10 }).map((_, index) => (
                <BookmarkSkeletonItem key={index} />
              ))}
            </SkeletonWrapper>
          }
        >
          <BookmarkListView
            memberId={friendId ? Number(friendId) : 0}
            isEditMode={false}
            readMode={selectedReadOption}
            selectedCategory={selectedCategoryId}
          />
        </Suspense>
      </LMiddle>
    </PullToRefresh>
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
