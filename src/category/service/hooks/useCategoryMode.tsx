import { Mode } from '@/category';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import Text from '@/common-ui/Text';
import IconButton from '@/common/ui/IconButton';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoryModeProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  openDeleteCategoryBS: () => void;
  onClickSaveOrder: () => void;
}

const useCategoryMode = ({
  mode,
  setMode,
  openDeleteCategoryBS,
  onClickSaveOrder,
}: CategoryModeProps) => {
  const router = useNavigate();
  const navigateToCategoryAddPage = () => {
    router('/category/add', {
      state: {
        fromPath: location.pathname,
      },
    });
  };

  const setNormalMode = () => setMode('NORMAL');
  const setDeleteMode = () => setMode('DELETE');
  const setOrderMode = () => setMode('ORDER');
  const headerRight = () => {
    if (mode === 'NORMAL') {
      return (
        <HeaderButtonWrapper>
          <IconButton
            onClick={navigateToCategoryAddPage}
            name="plus"
            size="s"
          />
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet onClose={setNormalMode}>
              <TriggerBottomSheet.Item onClick={setDeleteMode}>
                삭제하기
              </TriggerBottomSheet.Item>
              <TriggerBottomSheet.Item onClick={setOrderMode}>
                순서편집
              </TriggerBottomSheet.Item>
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        </HeaderButtonWrapper>
      );
    }
    if (mode === 'DELETE') {
      return (
        <RightButtonWrapper>
          <TextButton onClick={setNormalMode}>
            <Text.Span>취소</Text.Span>
          </TextButton>
          <TextButton onClick={openDeleteCategoryBS}>
            <Text.Span>삭제</Text.Span>
          </TextButton>
        </RightButtonWrapper>
      );
    }
    if (mode === 'EDIT') {
      return (
        <RightButtonWrapper>
          <TextButton>
            <Text.Span onClick={setNormalMode}>취소</Text.Span>
          </TextButton>
        </RightButtonWrapper>
      );
    }
    if (mode === 'ORDER') {
      return (
        <RightButtonWrapper>
          <TextButton onClick={setNormalMode}>
            <Text.Span>취소</Text.Span>
          </TextButton>
          <TextButton onClick={onClickSaveOrder}>
            <Text.Span>저장</Text.Span>
          </TextButton>
        </RightButtonWrapper>
      );
    }
    return null;
  };
  return { headerRight };
};

export default useCategoryMode;

const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightButtonWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(20)};
`;

const TextButton = styled.button``;
