import { CategoryItem } from '@/category';

interface EditCategory {
  categoryList: CategoryItem[];
  onChangeEmoji: (emoji: string) => void;
  onChangeCategoryName: (categoryName: string) => void;
  onChangeCategoryList: (categoryList: CategoryItem[]) => void;
}

const useEditCategory = ({
  categoryList,
  onChangeCategoryName,
  onChangeEmoji,
  onChangeCategoryList,
}: EditCategory) => {
  const onClickEditCategory = (categoryId: string) => {
    const category = categoryList.find(
      (category) => category.id === categoryId,
    );
    if (category) {
      onChangeEmoji(category.emoji);
      onChangeCategoryName(category.categoryName);
      onChangeCategoryList(
        categoryList.filter((category) => category.id !== categoryId),
      );
    }
  };
  return {
    onClickEditCategory,
  };
};

export default useEditCategory;
