import { CategoryItem, Mode } from '@/category';
import { useDeleteCategoryMutation } from '@/category/api/delete';
import { usePATCHCategoryOrderMutation } from '@/category/api/order';
import useCategoryMode from '@/category/service/hooks/useCategoryMode';
import CategoryList from '@/category/ui/CategoryList';
import SkeletonCategoryList from '@/category/ui/SkeletonCategoryList';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import Header from '@/common-ui/Header/Header';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useAuthStore from '@/store/auth';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import { Suspense, useState } from 'react';

const CategoryListPage: ActivityComponentType = () => {
  const { memberId } = useAuthStore();
  const [mode, setMode] = useState<Mode>('NORMAL');

  const { close, isOpen, open } = useBottomSheet();

  const [deleteCategoryList, setDeleteCategoryList] = useState<string[]>([]);
  const { mutateAsync: mutateDeleteCategory } = useDeleteCategoryMutation({
    memberId,
  });
  const onClickDelete = async () => {
    await mutateDeleteCategory({
      categoryId: deleteCategoryList,
      memberId,
    });
    setMode('NORMAL');
    close();
  };
  const [clientCategoryList, setClientCategoryList] = useState<CategoryItem[]>(
    [],
  );

  const { mutateAsync: mutatePatchOrder } = usePATCHCategoryOrderMutation({
    memberId,
  });
  const onClickSaveOrder = async () => {
    const orderData = clientCategoryList.map((category, index) => ({
      categoryId: category.categoryId,
      orderNum: index + 1,
    }));
    await mutatePatchOrder(orderData);
    setMode('NORMAL');
  };

  const { headerRight } = useCategoryMode({
    mode,
    setMode,
    openDeleteCategoryBS: open,
    onClickSaveOrder,
  });

  return (
    <AppScreen>
      <Header
        showBackButton
        title="카테고리 목록"
        rightButton={headerRight()}
      />
      <Suspense fallback={<SkeletonCategoryList />}>
        <CategoryList
          mode={mode}
          clientCategoryList={clientCategoryList}
          setClientCategoryList={setClientCategoryList}
          deleteCategoryList={deleteCategoryList}
          setDeleteCategoryList={setDeleteCategoryList}
        />
      </Suspense>
      <BSConfirmation
        title="정말로 삭제 할까요?"
        description="카테고리에 연관된 북마크도 모두 삭제 됩니다."
        open={isOpen}
        onCancel={close}
        onClose={close}
        onConfirm={onClickDelete}
      />
    </AppScreen>
  );
};

export default CategoryListPage;
