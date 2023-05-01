import { Mode } from '@/category';
import useCategoryMode from '@/category/service/hooks/useCategoryMode';
import CategoryList from '@/category/ui/CategoryList';
import SkeletonCategoryList from '@/category/ui/SkeletonCategoryList';
import Header from '@/common-ui/Header/Header';
import { Suspense, useState } from 'react';

const CategoryListPage = () => {
  const [mode, setMode] = useState<Mode>('NORMAL');

  const { headerRight } = useCategoryMode({ mode, setMode });

  return (
    <>
      <Header
        showBackButton
        title="카테고리 목록"
        rightButton={headerRight()}
      />
      <Suspense fallback={<SkeletonCategoryList />}>
        <CategoryList mode={mode} />
      </Suspense>
    </>
  );
};

export default CategoryListPage;
