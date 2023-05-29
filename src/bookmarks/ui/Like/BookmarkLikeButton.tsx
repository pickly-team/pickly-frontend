import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface BookMarkLikeButtonProps {
  isLike: boolean;
  onClickLike?: () => void;
  onClickDislike?: () => void;
}

const BookmarkLikeButton = ({
  isLike,
  onClickLike,
  onClickDislike,
}: BookMarkLikeButtonProps) => {
  return (
    <LikeButton
      onClick={() => {
        isLike ? onClickDislike?.() : onClickLike?.();
      }}
    >
      {isLike ? (
        <Icon name="heart-fill-green" size="m" />
      ) : (
        <Icon name="heart-blank-green" size="m" />
      )}
    </LikeButton>
  );
};

export default BookmarkLikeButton;

const LikeButton = styled.button`
  width: ${getRem(60)};
  height: 100%;
  &:active {
    opacity: 0.5;
  }
`;
