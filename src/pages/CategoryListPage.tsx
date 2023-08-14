import { CategoryItem, Mode } from '@/category';
import { useDeleteCategoryMutation } from '@/category/api/delete';
import { usePATCHCategoryOrderMutation } from '@/category/api/order';
import useCategoryMode from '@/category/service/hooks/useCategoryMode';
import CategoryList from '@/category/ui/CategoryList';
import SkeletonCategoryList from '@/category/ui/SkeletonCategoryList';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import Header from '@/common-ui/Header/Header';
import PullToRefresh from '@/common-ui/PullToRefresh';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useAuthStore from '@/store/auth';
import { Suspense, useState } from 'react';

const CategoryListPage = () => {
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

  const { handleRefresh } = useHandleRefresh({ pageType: 'CATEGORY_LIST' });

  return (
    <PullToRefresh onRefresh={handleRefresh} disabled={mode !== 'NORMAL'}>
      <Header
        showBackButton
        title="카테고리 목록"
        rightButton={headerRight()}
      />
      <Suspense
        fallback={
          <SkeletonWrapper>
            <SkeletonCategoryList />
          </SkeletonWrapper>
        }
      >
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
    </PullToRefresh>
  );
};

export default CategoryListPage;
