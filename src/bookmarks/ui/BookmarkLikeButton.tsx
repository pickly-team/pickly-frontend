import Icon from '@/common-ui/assets/Icon';

interface BookMarkLikeButtonProps {
  isLike: boolean;
}

const BookmarkLikeButton = ({ isLike }: BookMarkLikeButtonProps) => {
  return (
    <button>
      {isLike ? (
        //TODO : fill heart green 아이콘 추가
        <Icon name="heart-fill-green" size="m" />
      ) : (
        <Icon name="heart-blank-green" size="m" />
      )}
    </button>
  );
};

export default BookmarkLikeButton;
