import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import BSConfirmation from '@/shared/common/ui/BSConfirmation';
import useAuthStore from '@/shared/store/auth';
import useBottomSheet from '@/shared/ui/BottomSheet/hooks/useBottomSheet';
import { ClientBookmarkCategoryItem } from '@/widgets/bookmarks/api/bookmark';
import { Mode } from '@/widgets/category';
import { useDeleteCategoryMutation } from '@/widgets/category/api/delete';
import { usePATCHCategoryOrderMutation } from '@/widgets/category/api/order';
import useCategoryMode from '@/widgets/category/service/hooks/useCategoryMode';
import CategoryList from '@/widgets/category/ui/CategoryList';
import SkeletonCategoryList from '@/widgets/category/ui/SkeletonCategoryList';
import { Header, PullToRefresh, SkeletonWrapper } from '@pickly/design-system';
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
  const [clientCategoryList, setClientCategoryList] = useState<
    ClientBookmarkCategoryItem[]
  >([]);

  const { mutateAsync: mutatePatchOrder } = usePATCHCategoryOrderMutation({
    memberId,
  });
  const onClickSaveOrder = async () => {
    const orderData = clientCategoryList.map((category, index) => ({
      categoryId: String(category.id),
      orderNum: index + 1,
    }));
    await mutatePatchOrder(orderData);
    setMode('NORMAL');
  };

  const { headerRight } = useCategoryMode({
    mode,
    categoryLength: clientCategoryList.length,
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
