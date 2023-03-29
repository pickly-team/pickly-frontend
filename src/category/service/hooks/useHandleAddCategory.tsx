import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export interface CategoryItem {
  id: string;
  emoji: string;
  categoryName: string;
}

const useHandleAddCategory = () => {
  const router = useNavigate();
  const onClickBack = () => router(-1);
  // TODO : API 연동
  const onClickSave = () => router(-1);

  const [emoji, setEmoji] = useState('😎');
  // 이모지 선택 모달에 가까움
  // BS를 이용하여 이모지 라이브러리를 띄우면
  // 프레임 드랍이 심하여 성능이 떨어짐
  const {
    close: setEmojiBSClose,
    open,
    isOpen: isEmojiBSOpen,
  } = useBottomSheet();

  const setEmojiBSOpen = useCallback(() => {
    open();
  }, []);

  const onChangeEmoji = useCallback((emoji: string) => {
    setEmoji(emoji);
    setEmojiBSClose();
  }, []);

  const [categoryName, setCategoryName] = useState('');
  const onChangeCategoryName = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((categoryName) => {
    setCategoryName(categoryName.target.value);
  }, []);

  const isAllCategoryInfoFilled = (): boolean =>
    Boolean(emoji.length && categoryName.length);

  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const onClickAddCategory = useCallback(() => {
    setCategoryList([...categoryList, { emoji, categoryName, id: uuid() }]);
    setEmoji('😎');
    setCategoryName('');
  }, [categoryList, emoji, categoryName]);

  const onClickDeleteCategory = useCallback(
    (id: string) => {
      setCategoryList(categoryList.filter((item) => item.id !== id));
    },
    [categoryList],
  );

  const onClickEditCategory = useCallback(
    (id: string) => {
      const category = categoryList.find((category) => category.id === id);
      if (category) {
        setEmoji(category.emoji);
        setCategoryName(category.categoryName);
      }
      setCategoryList(categoryList.filter((category) => category.id !== id));
    },
    [categoryList, emoji, categoryName],
  );

  return {
    emoji,
    categoryName,
    categoryList,
    isEmojiBSOpen,
    setEmojiBSOpen,
    isAllCategoryInfoFilled,
    onClickBack,
    onClickSave,
    onChangeEmoji,
    onChangeCategoryName,
    onClickAddCategory,
    onClickDeleteCategory,
    onClickEditCategory,
  };
};

export default useHandleAddCategory;
