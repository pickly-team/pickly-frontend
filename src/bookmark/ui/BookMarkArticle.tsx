import getRem from '@/utils/getRem';
import Button from '@/common-ui/Button';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface BookMarkArticleProps {
  previewImgSrc: string;
  title: string;
  category: string;
  createdAt: string;
  bookMarkUrl: string;
  likeButton: ReactNode;
  messageInfo: ReactNode;
}

const BookMarkArticle = ({
  previewImgSrc,
  title,
  category,
  createdAt,
  bookMarkUrl,
  likeButton,
  messageInfo,
}: BookMarkArticleProps) => {
  return (
    <Container>
      <BookMarkImage src={previewImgSrc} />
      <BookMarkTitle level="h1" fontSize={getRem(24)}>
        {title}
      </BookMarkTitle>
      <BookMarkMainInfo>
        <CategoryButtonWrapper>
          <Button>{category}</Button>
        </CategoryButtonWrapper>
        <LikeAndMessageIconWrapper>
          {likeButton}
          {messageInfo}
        </LikeAndMessageIconWrapper>
      </BookMarkMainInfo>
      <BookMarkSubInfo>
        <SubInfoRow>
          <Icon name="heart-green" size="m" />
          <SubInfoTextWrapper>
            <Text.Span>등록일자</Text.Span>
            <Text.Span>{createdAt}</Text.Span>
          </SubInfoTextWrapper>
        </SubInfoRow>
        <SubInfoRow>
          <Icon name="heart-green" size="m" />
          <SubInfoTextWrapper>
            <Text.Span>원본 URL</Text.Span>
            <a href={bookMarkUrl} target="_blank" rel="noreferrer">
              <Text.Span>{bookMarkUrl}</Text.Span>
            </a>
          </SubInfoTextWrapper>
        </SubInfoRow>
      </BookMarkSubInfo>
    </Container>
  );
};

export default BookMarkArticle;

const Container = styled.article``;
const BookMarkImage = styled.img`
  width: 100%;
  height: 247px;
  object-fit: cover;
  border-radius: 0 0 32px 32px;
`;

const BookMarkTitle = styled(Text.Header)`
  margin-top: 28px;
`;

const BookMarkMainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const CategoryButtonWrapper = styled.div`
  width: 154px;
`;

const LikeAndMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const BookMarkSubInfo = styled.div`
  padding: 10px;
  > * {
    margin-bottom: 10px;
  }
`;
const SubInfoRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const SubInfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 35px;
`;
