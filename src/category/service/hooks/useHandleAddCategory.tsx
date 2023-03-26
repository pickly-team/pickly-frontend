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
  // INTERACTION
  // 1. 사용자 뒤로가기 버튼 클릭
  const router = useNavigate();
  const onClickBack = () => {
    router(-1);
  };

  // 2. 사용자 저장 버튼 클릭
  const onClickSave = () => {
    // TODO : 카테고리 추가 API 호출
    // TODO : 카테고리 추가 후 메인 페이지로 이동
    router(-1);
  };

  // 3. 사용자 카테고리 이모지 변경
  const [emoji, setEmoji] = useState('😎');
  const { close, isOpen, open } = useBottomSheet();
  const onChangeEmoji = useCallback((emoji: string) => {
    setEmoji(emoji);
    open();
  }, []);

  // 4. 사용자 카테고리 이름 변경
  const [categoryName, setCategoryName] = useState('');
  const onChangeCategoryName = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((categoryName) => {
    setCategoryName(categoryName.target.value);
  }, []);

  // 5. 사용자 카테고리 추가
  const isAllCategoryInfoFilled = (): boolean =>
    Boolean(emoji.length && categoryName.length);

  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const onClickAddCategory = useCallback(() => {
    setCategoryList([...categoryList, { emoji, categoryName, id: uuid() }]);
    setEmoji('😎');
    setCategoryName('');
  }, [categoryList, emoji, categoryName]);

  // 6. 사용자 카테고리 삭제
  const onClickDeleteCategory = useCallback(
    (id: string) => {
      setCategoryList(categoryList.filter((item) => item.id !== id));
    },
    [categoryList],
  );

  // 7. 사용자 카테고리 수정
  const onClickEditCategory = useCallback(
    (id: string) => {
      // 1. 수정할 카테고리를 찾는다.
      const category = categoryList.find((category) => category.id === id);
      // 2. 수정할 카테고리의 이름과 이모지를 변경한다.
      if (category) {
        setEmoji(category.emoji);
        setCategoryName(category.categoryName);
      }
      // 3. 수정할 카테고리를 삭제한다.
      setCategoryList(categoryList.filter((category) => category.id !== id));
    },
    [categoryList, emoji, categoryName],
  );

  return {
    emoji,
    categoryName,
    categoryList,
    close,
    isOpen,
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
