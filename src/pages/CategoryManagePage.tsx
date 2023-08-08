import useAddAndDeleteCategory from '@/category/service/hooks/useAddAndDeleteCategory';
import useChangeCategoryName from '@/category/service/hooks/useChangeCategoryName';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import CategoryAddArea from '@/category/ui/Add/CategoryAddArea';
import CategoryAddInfo from '@/category/ui/Add/CategoryManageInfo';
import EmojiSelect from '@/common/ui/EmojiSelect';
import HeaderLeftAndRight from '@/common-ui/Header/HeaderLeftAndRight';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Emoji from '@/common/ui/Emoji';
import CategoryName from '@/category/ui/Add/CategoryName';
import Divider from '@/category/ui/Divider';
import { usePOSTCategoryMutation } from '@/category/api/add';
import { useGETCategoryAPI } from '@/category/api/category';
import { useEffect } from 'react';
import { usePUTCategoryMutation } from '@/category/api/edit';
import useAuthStore from '@/store/auth';

interface CategoryManagePageProps {
  mode: 'ADD' | 'EDIT';
}

export const bookmarkAddPagePaths = [
  '',
  '/friend',
  '/notification',
  '/profile',
] as const;

const CategoryManagePage = ({ mode }: CategoryManagePageProps) => {
  // TODO : 인증 로직 추가
  const { memberId } = useAuthStore();
  const router = useNavigate();

  const categoryId = location.pathname.split('/').pop();

  // BUSINESS LOGIC
  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen } =
    useChangeEmoji();
  const { categoryName, onChangeCategoryName } = useChangeCategoryName();
  const { categoryList, addCategory, deleteCategory } =
    useAddAndDeleteCategory();

  const { data: categoryData } = useGETCategoryAPI({
    categoryId: categoryId ?? '',
    memberId,
    mode,
  });
  useEffect(() => {
    if (mode === 'EDIT' && categoryData) {
      onChangeCategoryName(categoryData.name);
      onChangeEmoji(categoryData.emoji);
    }
  }, [categoryData]);

  // INTERACTION
  // 1. 뒤로가기 버튼 > 뒤로가기
  const onClickBack = () => {
    router(-1);
  };

  // 2. 저장 버튼 > 저장
  const { mutate: postCategory } = usePOSTCategoryMutation({
    memberId,
  });
  const { mutate: putCategory } = usePUTCategoryMutation({
    memberId,
    categoryId: categoryId ?? '',
  });
  const onClickSave = () => {
    if (mode === 'EDIT') {
      putCategory({
        categoryId: categoryId ?? '',
        memberId,
        postData: {
          name: categoryName,
          emoji,
        },
      });
      return;
    }
    if (mode === 'ADD') {
      postCategory({
        memberId,
        postData: categoryList.map((category) => ({
          emoji: category.emoji,
          name: category.name,
        })),
      });
    }
  };

  const onClickAddCategory = (emoji: string, categoryName: string) => {
    addCategory(emoji, categoryName);
    onChangeCategoryName('');
    onChangeEmoji('📖');
  };

  const onClickDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const setSelectedCategory = (id: string) => {
    const selectedCategory = categoryList.find(
      (category) => category.categoryId === id,
    );
    if (selectedCategory) {
      onChangeEmoji(selectedCategory.emoji);
      onChangeCategoryName(selectedCategory.name);
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
      <CategoryAddInfo mode={mode} />
      {/** 카테고리 입력 영역 */}
      <CategoryNameInputWrapper>
        <Emoji emoji={emoji} onClickEmoji={setEmojiBSOpen} />
        <CategoryName
          categoryName={categoryName}
          onChangeCategoryName={onChangeCategoryName}
        />
      </CategoryNameInputWrapper>
      {mode === 'ADD' && (
        <MarginDivider>
          <Divider size="s" margin="off" />
        </MarginDivider>
      )}
      {/** 카테고리 추가 영역 */}
      {mode === 'ADD' && (
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
      )}
      {/** 이모지 BS */}
      {isEmojiBSOpen && <EmojiSelect onChangeEmoji={onChangeEmoji} />}
    </>
  );
};

export default CategoryManagePage;

const MarginDivider = styled.div`
  margin: ${getRem(40)} 0;
`;

const CategoryNameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getRem(20)};
  padding: 0 ${getRem(20)};
`;
