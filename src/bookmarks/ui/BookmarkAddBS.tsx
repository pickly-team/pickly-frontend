import Icon from '@/common-ui/assets/Icon';
import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useBookmarkAddHandler, {
  DisClosureType,
} from '../service/hooks/useBookmarkAddHandler';
import TagBoxList from './BookmarkTagList';

interface BookmarkAddBSProps {
  isOpen: boolean;
  close: () => void;
}

const BookmarkAddBS = ({ isOpen, close }: BookmarkAddBSProps) => {
  const {
    url,
    onChangeUrl,
    isValidateUrl,
    categoryList,
    onClickCategory,
    onClickDisClosure,
    selectedDisClosure,
  } = useBookmarkAddHandler();

  return (
    <>
      <BottomSheet open={isOpen} onClose={close}>
        <StyledBSWrapper>
          {/** URL 입력 영역 */}
          <StyledMarginSpanText>
            <Text.Span fontSize={calculateRem(24)} weight="bold">
              Step 1. URL 입력
            </Text.Span>
          </StyledMarginSpanText>
          <StyledInputWrapper>
            <StyledInput
              border={{
                color: 'primary',
                borderWidth: calculateRem(1),
                borderRadius: calculateRem(10),
              }}
              value={url}
              onChange={onChangeUrl}
            />
            <StyledCheckIcon isValidateUrl={isValidateUrl}>
              <Icon name="check-circle-green" size="m" />
            </StyledCheckIcon>
          </StyledInputWrapper>
          {/** 카테고리 선택 영역 */}
          <>
            <StyledMarginSpanText>
              <Text.Span fontSize={calculateRem(24)} weight="bold">
                Step 2. 카테고리 선택
              </Text.Span>
            </StyledMarginSpanText>
            {categoryList && (
              <TagBoxList
                tags={categoryList}
                onClickCategory={onClickCategory}
              />
            )}
          </>
          {/** 공개 범위 선택 영역 */}
          <StyledMarginSpanText>
            <Text.Span fontSize={calculateRem(24)} weight="bold">
              Step 3. 공개 범위 선택
            </Text.Span>
          </StyledMarginSpanText>
          <DisclosureScope
            selectedDisClosure={selectedDisClosure}
            onClickDisClosure={onClickDisClosure}
          />
          <Button onClick={close}>
            <Text.Span fontSize={calculateRem(18)} weight="bold">
              저장
            </Text.Span>
          </Button>
        </StyledBSWrapper>
      </BottomSheet>
    </>
  );
};

export default BookmarkAddBS;

const StyledBSWrapper = styled.div`
  padding: 0 ${getRem(20)};
  margin-bottom: ${getRem(25)};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  transition: width 0.1s ease-in-out;
  width: 90%;
`;

const StyledCheckIcon = styled.div<{
  isValidateUrl: boolean;
}>`
  opacity: ${(props) => (props.isValidateUrl ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const StyledMarginSpanText = styled.div`
  margin-top: ${getRem(25)};
  margin-bottom: ${getRem(25)};
`;

interface DisclosureScopeProps {
  selectedDisClosure: DisClosureType;
  onClickDisClosure: (type: DisClosureType) => void;
}

const DisclosureScope = ({
  selectedDisClosure,
  onClickDisClosure,
}: DisclosureScopeProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        column-gap: ${getRem(10)};
        margin-bottom: ${getRem(25)};
      `}
    >
      <Button
        buttonColor={selectedDisClosure === 'PUBLIC' ? 'primary' : 'darkGrey'}
        onClick={() => onClickDisClosure('PUBLIC')}
      >
        <Text.Span>전체 공개</Text.Span>
      </Button>
      <Button
        buttonColor={selectedDisClosure === 'FRIENDS' ? 'primary' : 'darkGrey'}
        onClick={() => onClickDisClosure('FRIENDS')}
      >
        <Text.Span>친구 공개</Text.Span>
      </Button>
      <Button
        buttonColor={selectedDisClosure === 'PRIVATE' ? 'primary' : 'darkGrey'}
        onClick={() => onClickDisClosure('PRIVATE')}
      >
        <Text.Span>비공개</Text.Span>
      </Button>
    </div>
  );
};
