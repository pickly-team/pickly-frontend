import getRem from '@/utils/getRem';
import Button from '@/common-ui/Button';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
      <BookMarkTitle level="h1" fontSize={2} weight="bold">
        {title}
      </BookMarkTitle>
      <CategoryAndIconsWrapper>
        <CategoryButtonWrapper>
          <Button>{category}</Button>
        </CategoryButtonWrapper>
        <LikeAndMessageIconWrapper>
          {likeButton}
          {messageInfo}
        </LikeAndMessageIconWrapper>
      </CategoryAndIconsWrapper>
      <BookMarkInfoWrapper>
        <BookMarkInfo
          description="등록일자"
          icon={<Icon name="calendar-plus" size="m" />}
          content={<Text.Span>{createdAt}</Text.Span>}
        />
        <BookMarkInfo
          description="원본 URL"
          icon={<Icon name="location" size="m" />}
          content={
            <Link to={bookMarkUrl} target={'_blank'} rel={'noreferrer'}>
              <Text.Span>{bookMarkUrl}</Text.Span>
            </Link>
          }
        />
      </BookMarkInfoWrapper>
    </Container>
  );
};

export default BookMarkArticle;

const BookMarkInfo = ({
  description,
  icon,
  content,
}: {
  description: string;
  icon: ReactNode;
  content: ReactNode;
}) => {
  return (
    <InfoRow>
      {icon}
      <InfoTextWrapper>
        <InfoDescriptionText>{description}</InfoDescriptionText>
        {content}
      </InfoTextWrapper>
    </InfoRow>
  );
};

const Container = styled.article``;
const BookMarkImage = styled.img`
  width: 100%;
  height: ${getRem(247)};
  object-fit: cover;
  border-radius: ${getRem(0, 0, 32, 32)};
`;

const BookMarkTitle = styled(Text.Header)`
  margin-top: ${getRem(28)};
`;

const CategoryAndIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(15)};
`;

const CategoryButtonWrapper = styled.div`
  width: ${getRem(154)};
`;

const LikeAndMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(12)};
`;

const BookMarkInfoWrapper = styled.div`
  padding: ${getRem(10)};
  > * {
    margin-bottom: ${getRem(10)};
  }
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
`;

const InfoDescriptionText = styled(Text.Span)`
  display: block;
  width: ${getRem(70)};
`;
const InfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: ${getRem(35)};
`;
