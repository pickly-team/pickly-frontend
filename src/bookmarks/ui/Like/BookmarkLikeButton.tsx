import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface BookMarkLikeButtonProps {
  isLike: boolean;
  isMyPost?: boolean;
  onClickLike?: () => void;
  onClickDislike?: () => void;
}

const BookmarkLikeButton = ({
  isLike,
  isMyPost = true,
  onClickLike,
  onClickDislike,
}: BookMarkLikeButtonProps) => {
  return (
    <LikeButton
      onClick={() => {
        isLike ? onClickDislike?.() : onClickLike?.();
      }}
      disabled={!isMyPost}
    >
      <Icon name={isLike ? 'like-green' : 'like'} size="s" />
    </LikeButton>
  );
};

export default BookmarkLikeButton;

interface LikeButtonProps {
  disabled: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  width: ${getRem(30)};
  height: 100%;
  &:active {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
  }
`;
