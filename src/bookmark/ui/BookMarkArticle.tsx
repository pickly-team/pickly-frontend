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
      <BookMarkTitle level="h1" fontSize={getRem(24)} weight="bold">
        {title}
      </BookMarkTitle>
      <BookMarkMainInfoWrapper>
        <CategoryButtonWrapper>
          <Button>{category}</Button>
        </CategoryButtonWrapper>
        <LikeAndMessageIconWrapper>
          {likeButton}
          {messageInfo}
        </LikeAndMessageIconWrapper>
      </BookMarkMainInfoWrapper>
      <BookMarkSubInfoWrapper>
        <BookMarkSubInfo
          description="등록일자"
          icon={<Icon name="calendar-white" size="m" />}
          content={<Text.Span>{createdAt}</Text.Span>}
        />
        <BookMarkSubInfo
          description="원본 URL"
          icon={<Icon name="location-white" size="m" />}
          content={
            <a href={bookMarkUrl} target="_blank" rel="noreferrer">
              <Text.Span>{bookMarkUrl}</Text.Span>
            </a>
          }
        />
      </BookMarkSubInfoWrapper>
    </Container>
  );
};

export default BookMarkArticle;

const BookMarkSubInfo = ({
  description,
  icon,
  content,
}: {
  description: string;
  icon: ReactNode;
  content: ReactNode;
}) => {
  return (
    <SubInfoRow>
      {icon}
      <SubInfoTextWrapper>
        <SubInfoDescriptionText>{description}</SubInfoDescriptionText>
        {content}
      </SubInfoTextWrapper>
    </SubInfoRow>
  );
};

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

const BookMarkMainInfoWrapper = styled.div`
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

const BookMarkSubInfoWrapper = styled.div`
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

const SubInfoDescriptionText = styled(Text.Span)`
  display: block;
  width: ${getRem(70)}rem;
`;
const SubInfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 35px;
`;
