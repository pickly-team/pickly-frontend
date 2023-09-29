import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { timeStampToDate } from '@/utils/date/timeConverter';
import { navigatePath } from '@/constants/navigatePath';
import { useNavigate } from 'react-router-dom';

interface CommentListProps {
  id: number;
  bookmarkId: number;
  title: string;
  nickName: string;
  content: string;
  updatedAt: number;
  category: string;
}

const CommentItem = ({
  id,
  bookmarkId,
  title,
  nickName,
  content,
  updatedAt,
  category,
}: CommentListProps) => {
  const navigate = useNavigate();

  const navigateToBookmark = () => {
    navigate(navigatePath.BOOKMARK_DETAIL.replace(':id', String(bookmarkId)));
  };

  return (
    <>
      <Container onClick={navigateToBookmark}>
        <CommentHeader>
          <IconAndTitleWrapper>
            <StyleIconWrapper>
              {<StyleIcon name="bookmark" size={'s'} />}
            </StyleIconWrapper>
            <TitleText fontSize={getRem(18)} weight={'bold'}>
              {title}
            </TitleText>
          </IconAndTitleWrapper>
        </CommentHeader>
        <IconAndNickNameWrapper>
          {<Icon name="badge-green" size={'s'} />}
          <NicknameText fontSize={getRem(14)} weight={'bold'}>
            {nickName}
          </NicknameText>
        </IconAndNickNameWrapper>
        <ContentText fontSize={getRem(11)}>{content}</ContentText>
        <IconAndTimeAndCategoryWrapper>
          <Icon name="timeline" size={'s'} />
          <UpdatedAtText fontSize={getRem(10)}>
            {timeStampToDate(updatedAt)}
          </UpdatedAtText>
          <CategoryText fontSize={getRem(10)} weight={'bold'}>
            {category}
          </CategoryText>
        </IconAndTimeAndCategoryWrapper>
      </Container>
    </>
  );
};

export default CommentItem;

const Container = styled.div`
  display: grid;
  row-gap: ${getRem(10)};
  width: 100%;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey800};
`;

const StyleIcon = styled(Icon)`
  width: ${getRem(8)};
  height: ${getRem(8)};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size: ${(props) => props.fontSize};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NicknameText = styled(Text.Span)``;

const ContentText = styled(Text.Span)`
  white-space: pre-wrap;
  line-height: 1.2;
`;
const CategoryText = styled(Text.Span)`
  margin-left: auto;
`;
const UpdatedAtText = styled(Text.Span)``;

const IconAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const IconAndNickNameWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const IconAndTimeAndCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const StyleIconWrapper = styled.div`
  flex-shrink: 0;
`;
