import { Mode } from '@/category';
import useCategoryMode from '@/category/service/hooks/useCategoryMode';
import CategoryList from '@/category/ui/CategoryList';
import SkeletonCategoryList from '@/category/ui/SkeletonCategoryList';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import Header from '@/common-ui/Header/Header';
import BSConfirmation from '@/common/ui/BSConfirmation';
import { Suspense, useState } from 'react';

const CategoryListPage = () => {
  const [mode, setMode] = useState<Mode>('NORMAL');

  const { close, isOpen, open } = useBottomSheet();

  const { headerRight } = useCategoryMode({
    mode,
    setMode,
    openDeleteCategoryBS: open,
  });

  // TODO : 카테고리 리스트 API 연동
  // TODO : 카테고리 삭제 API 연동
  // TODO : 카테고리 순서 변경 API 연동

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
      <BSConfirmation
        title="정말로 삭제 할까요?"
        description="삭제된 카테고리는 복구할 수 없습니다."
        open={isOpen}
        onCancel={close}
        onClose={close}
        onConfirm={close}
      />
    </>
  );
};

export default CategoryListPage;
