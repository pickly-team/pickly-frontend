import { useGETBookmarkReadStatusQuery } from '@/widgets/bookmarks/api/bookmark';
import { theme, Text, ProgressBar } from '@pickly/design-system';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { navigatePath } from '@/shared/constants/navigatePath';
import useAuthStore from '@/shared/store/auth';
import useBookmarkStore from '@/shared/store/bookmark';

const ReadProgress = () => {
  const { memberId } = useAuthStore();

  const { data: bookmarkStatus } = useGETBookmarkReadStatusQuery({
    memberId,
  });

  const { setSelectedCategoryId, setReadOption } = useBookmarkStore();

  const onClick = () => {
    setSelectedCategoryId(null);
    setReadOption('🫣 읽지 않음');
  };

  return (
    <Wrapper to={navigatePath.BOOKMARK} onClick={onClick}>
      <Text.Header level="h2" weight="bold" fontSize={1.3}>
        현재까지 읽은 북마크
      </Text.Header>
      <Text.P fontSize={0.9}>
        현재까지 {bookmarkStatus?.readCount ?? 0}개의 북마크를 읽었어요!
      </Text.P>
      <ProgressWrapper>
        <Text.P fontSize={0.9}>
          {bookmarkStatus?.readStatusPercentage ?? 0}%
        </Text.P>
        <ProgressBar progress={bookmarkStatus?.readStatusPercentage ?? 0} />
      </ProgressWrapper>
    </Wrapper>
  );
};

export default ReadProgress;

const Wrapper = styled(Link)`
  display: flex;
  background-color: ${theme.colors.grey850};
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 1.5rem;
  border-radius: 1rem;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 0.5rem;
`;
