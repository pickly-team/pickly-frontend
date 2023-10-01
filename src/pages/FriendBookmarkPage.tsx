/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useReadList from '@/bookmarks/service/hooks/home/useReadList';
import getRem from '@/utils/getRem';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/common-ui/Header/Header';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import {
  useGETFriendProfileQuery,
  usePOSTBlockMemberQuery,
  useUnblockUserQuery,
} from '@/members/api/member';
import useAuthStore from '@/store/auth';
import BookmarkListView from '@/bookmarks/ui/Main/BookmarkListView';
import { Suspense, useEffect } from 'react';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';
import useFriendStore from '@/store/friend';
import useBookmarkStore from '@/store/bookmark';
import SkeletonBookmarkUserInfo from '@/bookmarks/ui/SkeletonBookmarkUserInfo';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import { navigatePath } from '@/constants/navigatePath';

const FriendBookmarkPage = () => {
  // FIRST RENDER
  const { memberId } = useAuthStore();
  const { id: friendId } = useParams<{ id: string }>();
  const { setFriendReadOption } = useBookmarkStore();
  const { setFriendId } = useFriendStore();

  useEffect(() => {
    setFriendId(Number(friendId));
    setFriendReadOption('📖 전체');
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
          <SkeletonWrapper>
            <SkeletonBookmarkUserInfo
              isFriendPage={{
                isFollowing: false,
                friendId: Number(friendId),
                memberId,
                isBlocked: false,
              }}
            />
          </SkeletonWrapper>
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
