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
      (category) => category.categoryId === categoryId,
    );
    if (category) {
      onChangeEmoji(category.emoji);
      onChangeCategoryName(category.name);
      onChangeCategoryList(
        categoryList.filter((category) => category.categoryId !== categoryId),
      );
    }
  };
  return {
    onClickEditCategory,
  };
};

export default useEditCategory;
