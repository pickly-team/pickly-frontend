import useHandleAddCategory from '@/category/service/hooks/useHandleAddCategory';
import CategoryAddArea from '@/category/ui/Add/CategoryAddArea';
import CategoryAddInfo from '@/category/ui/Add/CategoryAddInfo';
import CategoryInput from '@/category/ui/Add/CategoryInput';
import EmojiSelect from '@/category/ui/Add/EmojiSelect';
import Divider from '@/category/ui/Divider';
import HeaderLeftAndRight from '@/common-ui/Header/HeaderLeftAndRight';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

// TODO : 이모지 라이브러리 찾아서 연동

const CategoryAddPage = () => {
  const {
    categoryList,
    categoryName,
    emoji,
    isEmojiBSOpen,
    isAllCategoryInfoFilled,
    onChangeCategoryName,
    onClickBack,
    onClickAddCategory,
    onClickDeleteCategory,
    onClickEditCategory,
    onClickSave,
    onChangeEmoji,
    setEmojiBSOpen,
  } = useHandleAddCategory();
  return (
    <>
      <HeaderLeftAndRight
        left={{ type: 'back', onClick: onClickBack }}
        right={{ text: '저장', onClick: onClickSave }}
      />
      {/** 카테고리 페이지 설명 영역 */}
      <CategoryAddInfo />
      {/** 카테고리 입력 영역 */}
      <CategoryInput>
        <CategoryInput.Emoji emoji={emoji} setEmojiBSOpen={setEmojiBSOpen} />
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
          onClickAddCategory={onClickAddCategory}
          isAllCategoryInfoFilled={isAllCategoryInfoFilled}
        />
        <CategoryAddArea.CategoryList
          categoryList={categoryList}
          onClickDeleteCategory={onClickDeleteCategory}
          onClickEditCategory={onClickEditCategory}
          isAllCategoryInfoFilled={isAllCategoryInfoFilled}
          onClickAddCategory={onClickAddCategory}
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
