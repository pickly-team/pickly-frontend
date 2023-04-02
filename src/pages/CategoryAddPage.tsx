import useAddAndDeleteCategory from '@/category/service/hooks/useAddAndDeleteCategory';
import useChangeCategoryName from '@/category/service/hooks/useChangeCategoryName';
import useChangeEmoji from '@/category/service/hooks/useChangeEmoji';
import CategoryAddArea from '@/category/ui/Add/CategoryAddArea';
import CategoryAddInfo from '@/category/ui/Add/CategoryAddInfo';
import CategoryInput from '@/category/ui/Add/CategoryInput';
import EmojiSelect from '@/category/ui/Add/EmojiSelect';
import Divider from '@/category/ui/Divider';
import HeaderLeftAndRight from '@/common-ui/Header/HeaderLeftAndRight';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// TODO : 이모지 라이브러리 찾아서 연동

const CategoryAddPage = () => {
  const router = useNavigate();

  // BUSINESS LOGIC
  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen } =
    useChangeEmoji();
  const { categoryName, onChangeCategoryName } = useChangeCategoryName();
  const { categoryList, addCategory, deleteCategory } =
    useAddAndDeleteCategory();

  // INTERACTION
  // 1. 뒤로가기 버튼 > 뒤로가기
  const onClickBack = () => router(-1);
  // 2. 저장 버튼 > 저장
  const onClickSave = () => router(-1);

  const initializeCategoryNameAndEmoji = () => {
    onChangeCategoryName('');
    onChangeEmoji('😎');
  };

  const onClickAddCategory = (emoji: string, categoryName: string) => {
    addCategory(emoji, categoryName);
    initializeCategoryNameAndEmoji();
  };

  const onClickDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const setSelectedCategory = (id: string) => {
    const selectedCategory = categoryList.find(
      (category) => category.id === id,
    );
    if (selectedCategory) {
      onChangeEmoji(selectedCategory.emoji);
      onChangeCategoryName(selectedCategory.categoryName);
    }
  };

  const onClickEditCategory = (id: string) => {
    setSelectedCategory(id);
    deleteCategory(id);
  };

  const isAllCategoryInfoFilled = !!(emoji.length && categoryName.length);

  return (
    <>
      <HeaderLeftAndRight
        leftButton={{ type: 'back', onClick: onClickBack }}
        rightButton={{ text: '저장', onClick: onClickSave }}
      />
      {/** 카테고리 페이지 설명 영역 */}
      <CategoryAddInfo />
      {/** 카테고리 입력 영역 */}
      <CategoryInput>
        <CategoryInput.Emoji emoji={emoji} onClickEmoji={setEmojiBSOpen} />
        <CategoryInput.Name
          categoryName={categoryName}
          onChangeCategoryName={onChangeCategoryName}
        />
      </CategoryInput>
      <MarginDivider>
        <Divider size="s" margin="off" />
      </MarginDivider>
      {/** 카테고리 추가 영역 */}
      <CategoryAddArea categoryList={categoryList}>
        <CategoryAddArea.BlankCategoryBox
          onClickAddCategory={() => onClickAddCategory(emoji, categoryName)}
          isAllCategoryInfoFilled={isAllCategoryInfoFilled}
        />
        <CategoryAddArea.CategoryList
          categoryList={categoryList}
          onClickDeleteCategory={onClickDeleteCategory}
          onClickEditCategory={onClickEditCategory}
          isAllCategoryInfoFilled={isAllCategoryInfoFilled}
          onClickAddCategory={() => onClickAddCategory(emoji, categoryName)}
        />
      </CategoryAddArea>
      {/** 이모지 BS */}
      {isEmojiBSOpen && <EmojiSelect onChangeEmoji={onChangeEmoji} />}
    </>
  );
};

export default CategoryAddPage;

const MarginDivider = styled.div`
  margin: ${getRem(40)} 0;
`;
