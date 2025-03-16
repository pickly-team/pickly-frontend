import { useGETBookmarkCategoryStatusQuery } from '@/widgets/bookmarks/api/bookmark';

import { navigatePath } from '@/shared/constants/navigatePath';
import useAuthStore from '@/shared/store/auth';
import useBookmarkStore from '@/shared/store/bookmark';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import CategoryAddArea from '@/widgets/category/ui/Add/CategoryAddArea';

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
