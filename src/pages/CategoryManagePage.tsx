import { usePOSTCategoryMutation } from '@/category/api/add';
import { useGETCategoryAPI } from '@/category/api/category';
import { usePUTCategoryMutation } from '@/category/api/edit';
import useChangeCategoryName from '@/category/service/hooks/useChangeCategoryName';
import CategoryAddInfo from '@/category/ui/Add/CategoryManageInfo';
import CategoryName from '@/category/ui/Add/CategoryName';
import HeaderLeftAndRight from '@/common-ui/Header/HeaderLeftAndRight';
import useToast from '@/common-ui/Toast/hooks/useToast';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import Emoji from '@/common/ui/Emoji';
import EmojiSelect from '@/common/ui/EmojiSelect';
import useAuthStore from '@/store/auth';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { fireToast } = useToast();

  // BUSINESS LOGIC
  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen, closeEmojiBS } =
    useChangeEmoji();
  const { categoryName, onChangeCategoryName } = useChangeCategoryName();

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
  const { mutate: postCategory, isLoading: isPostLoading } =
    usePOSTCategoryMutation({
      memberId,
    });
  const { mutate: putCategory, isLoading: isPutLoading } =
    usePUTCategoryMutation({
      memberId,
      categoryId: categoryId ?? '',
    });
  const onClickSave = () => {
    if (isPostLoading || isPutLoading) return;
    if (!categoryName.length) {
      fireToast({ message: '앗! 카테고리 이름이 비어있어요', mode: 'ERROR' });
      return;
    }
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
        postData: [
          {
            emoji,
            name: categoryName,
          },
        ],
      });
    }
  };

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
      {/** 이모지 BS */}
      {isEmojiBSOpen && (
        <EmojiSelect
          onChangeEmoji={onChangeEmoji}
          closeEmojiBS={closeEmojiBS}
        />
      )}
    </>
  );
};

export default CategoryManagePage;

const CategoryNameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getRem(20)};
  padding: 0 ${getRem(20)};
`;
