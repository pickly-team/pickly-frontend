import { useGETBookmarkCategoryStatusQuery } from '@/bookmarks/api/bookmark';
import CategoryAddArea from '@/category/ui/Add/CategoryAddArea';
import { navigatePath } from '@/constants/navigatePath';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const CategoryReadList = () => {
  const router = useNavigate();
  const { memberId } = useAuthStore();
  const { data: categoryList } = useGETBookmarkCategoryStatusQuery({
    memberId,
  });
  const { setSelectedCategoryId, setReadOption } = useBookmarkStore();

  const onClickCategory = (id: number) => {
    setSelectedCategoryId(id);
    setReadOption('🫣 읽지 않음');
  };

  const onClickAddCategory = () => {
    router(navigatePath.CATEGORY_ADD);
  };

  return (
    <Container>
      {!categoryList?.length && (
        <CategoryAddArea>
          <CategoryAddArea.BlankCategoryBox
            isAllCategoryInfoFilled={true}
            onClickAddCategory={onClickAddCategory}
          />
        </CategoryAddArea>
      )}
      {!!categoryList?.length &&
        categoryList?.map((category) => (
          <CategoryCard
            emoji={category.categoryEmoji}
            name={category.categoryName}
            percentage={category.readStatus.readStatusPercentage}
            readCount={category.readStatus.readCount}
            totalCount={category.readStatus.total}
            onClickCategory={() => onClickCategory(category.categoryId)}
            key={category.categoryId}
          />
        ))}
    </Container>
  );
};

export default CategoryReadList;

const Container = styled.div`
  display: flex;
  column-gap: 1rem;
  row-gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 7rem;
`;
