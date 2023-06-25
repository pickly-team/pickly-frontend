import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';

interface CommentListProps {
  title: string;
  nickName: string;
  content: string;
  updatedAt: string;
  category: string;
}

const CommentItem = ({
  title,
  nickName,
  content,
  updatedAt,
  category,
}: CommentListProps) => {
  return (
    <>
      <Container>
        <CommentHeader>
          <IconAndTitleWrapper>
            {<Icon name="bookmark" size={'s'} />}
            <TitleText fontSize={getRem(20)} weight={'bold'}>
              {title}
            </TitleText>
          </IconAndTitleWrapper>
        </CommentHeader>
        <IconAndNickNameWrapper>
          <NicknameText fontSize={getRem(16)} weight={'bold'}>
            {nickName}
          </NicknameText>
          {<Icon name="badge-green" size={'s'} />}
        </IconAndNickNameWrapper>
        <ContentText fontSize={getRem(13)}>{content}</ContentText>
        <IconAndTimeAndCategoryWrapper>
          <Icon name="timeline" size={'s'} />
          <UpdatedAtText fontSize={getRem(10)}>{updatedAt}</UpdatedAtText>
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

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled(Text.Span)``;

const NicknameText = styled(Text.Span)``;

const ContentText = styled(Text.Span)``;
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
