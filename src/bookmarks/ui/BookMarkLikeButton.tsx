import Icon from '@/common-ui/assets/Icon';

interface BookMarkLikeButtonProps {
  isLike: boolean;
}

const BookMarkLikeButton = ({ isLike }: BookMarkLikeButtonProps) => {
  return (
    <button>
      {isLike ? (
        //TODO : fill heart green 아이콘 추가
        <Icon name="heart-green" size="m" />
      ) : (
        <Icon name="heart-green" size="m" />
      )}
    </button>
  );
};

export default BookMarkLikeButton;
