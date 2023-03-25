import Icon from '@/common-ui/assets/Icon';
import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem } from '../../api/bookmark';
import { DisClosureType } from '../../service/hooks/useBookmarkAddHandler';
import TagBoxList from '../BookmarkTagList';

interface BookmarkAddBSProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const BookmarkAddBS = ({ isOpen, close, children }: BookmarkAddBSProps) => {
  return (
    <>
      <BottomSheet open={isOpen} onClose={close}>
        <StyledBSWrapper>{children}</StyledBSWrapper>
      </BottomSheet>
    </>
  );
};

interface URLInputProps {
  url: string;
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidateUrl: boolean;
}

const URLInput = ({ url, onChangeUrl, isValidateUrl }: URLInputProps) => {
  return (
    <>
      <HeadingText>Step 1. URL 입력</HeadingText>
      <StyledInputWrapper>
        <StyledInput
          border={{
            color: 'primary',
            borderWidth: calculateRem(30),
            borderRadius: calculateRem(10),
          }}
          value={url}
          onChange={onChangeUrl}
        />
        <StyledCheckIcon isValidateUrl={isValidateUrl}>
          <Icon name="check-circle-green" size="m" />
        </StyledCheckIcon>
      </StyledInputWrapper>
    </>
  );
};

interface SelectCategoryProps {
  categoryList: ClientBookmarkCategoryItem[] | undefined;
  onClickCategory: (category: string) => void;
}

const SelectCategory = ({
  categoryList,
  onClickCategory,
}: SelectCategoryProps) => {
  return (
    <>
      <HeadingText>Step 2. 카테고리 선택</HeadingText>
      {categoryList && (
        <TagBoxList tags={categoryList} onClickCategory={onClickCategory} />
      )}
    </>
  );
};

interface DisclosureScopeProps {
  selectedDisClosure: DisClosureType;
  onClickDisClosure: (type: DisClosureType) => void;
}

const DisclosureScope = ({
  selectedDisClosure,
  onClickDisClosure,
}: DisclosureScopeProps) => {
  return (
    <>
      <HeadingText>Step 3. 공개범위 선택</HeadingText>
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
          buttonColor={
            selectedDisClosure === 'FRIENDS' ? 'primary' : 'darkGrey'
          }
          onClick={() => onClickDisClosure('FRIENDS')}
        >
          <Text.Span>친구 공개</Text.Span>
        </Button>
        <Button
          buttonColor={
            selectedDisClosure === 'PRIVATE' ? 'primary' : 'darkGrey'
          }
          onClick={() => onClickDisClosure('PRIVATE')}
        >
          <Text.Span>비공개</Text.Span>
        </Button>
      </div>
    </>
  );
};

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <Button
      style={{
        position: 'absolute',
        bottom: getRem(20),
        width: `calc(100% - ${getRem(40)})`,
      }}
      onClick={onClick}
    >
      <Text.Span fontSize={calculateRem(18)} weight="bold">
        저장
      </Text.Span>
    </Button>
  );
};

BookmarkAddBS.URLInput = URLInput;
BookmarkAddBS.SelectCategory = SelectCategory;
BookmarkAddBS.DisclosureScope = DisclosureScope;
BookmarkAddBS.SubmitButton = SubmitButton;

export default BookmarkAddBS;

interface HeadingTextProps {
  children: string;
}

const HeadingText = ({ children }: HeadingTextProps) => {
  return (
    <StyledMarginSpanText>
      <Text.Span fontSize={calculateRem(24)} weight="bold">
        {children}
      </Text.Span>
    </StyledMarginSpanText>
  );
};

const StyledBSWrapper = styled.div`
  padding: 0 ${getRem(20)};
  margin-bottom: ${getRem(90)};
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
