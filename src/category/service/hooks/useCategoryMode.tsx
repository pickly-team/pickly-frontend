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
}

const useCategoryMode = ({ mode, setMode }: CategoryModeProps) => {
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
              as={<IconButton onClick={() => {}} name="more" size="l" />}
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
          <Text.Span onClick={setNormalMode}>취소</Text.Span>
          <Text.Span onClick={setNormalMode}>삭제</Text.Span>
        </RightButtonWrapper>
      );
    }
    if (mode === 'EDIT') {
      return (
        <RightButtonWrapper>
          <Text.Span onClick={setNormalMode}>취소</Text.Span>
        </RightButtonWrapper>
      );
    }
    if (mode === 'ORDER') {
      return (
        <RightButtonWrapper>
          <Text.Span onClick={setNormalMode}>취소</Text.Span>
          <Text.Span onClick={setNormalMode}>저장</Text.Span>
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
