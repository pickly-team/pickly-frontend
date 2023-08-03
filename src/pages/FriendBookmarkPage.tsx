/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useReadList, {
  READ_OPTIONS,
} from '@/bookmarks/service/hooks/home/useReadList';
import getRem from '@/utils/getRem';
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
import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

interface FriendBookmarkPageProps {
  id: string;
}

const FriendBookmarkPage: ActivityComponentType<FriendBookmarkPageProps> = ({
  params: { id: friendId },
}) => {
  // FIRST RENDER
  const { memberId } = useAuthStore();

  const { setReadOption } = useBookmarkStore();
  const { setFriendId } = useFriendStore();

  useEffect(() => {
    setFriendId(Number(friendId));
    setReadOption('📖 전체');
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
  const onClickBack = () => {
    setReadOption('📖 전체');
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
    },
  );

  // 3. 읽은 북마크 선택
  const { readSelectOptionsList, selectedReadOption, onClickReadMode } =
    useReadList();

  return (
    <AppScreen preventSwipeBack>
      <Header
        showBackButton
        backButtonCallback={onClickBack}
        rightButton={
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet>
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
          selectedCategory={String(selectedCategoryId)}
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
            isReadMode={READ_OPTIONS[selectedReadOption ?? '📖 전체']}
          />
        </Suspense>
      </LMiddle>
    </AppScreen>
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
