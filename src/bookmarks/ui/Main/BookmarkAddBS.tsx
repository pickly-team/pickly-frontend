import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem } from '../../api/bookmark';
import { PublishScopedType } from '../../service/hooks/add/useSelectPublishScoped';
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
  onChangeUrl: (url: string) => void;
  isValidateUrl: boolean;
}

const URLInput = ({ url, onChangeUrl, isValidateUrl }: URLInputProps) => {
  return (
    <>
      <HeadingText>Step 1. URL 입력</HeadingText>
      <StyledInputWrapper>
        <StyledInput
          border={{
            color: isValidateUrl ? 'lightPrimary' : 'grey700',
            borderWidth: calculateRem(30),
            borderRadius: calculateRem(10),
          }}
          value={url}
          onChange={(e) => onChangeUrl(e.target.value)}
        />
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
  selectedPublishScoped: PublishScopedType;
  onClickPublishScoped: (type: PublishScopedType) => void;
}

const PublishScoped = ({
  selectedPublishScoped,
  onClickPublishScoped,
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
          buttonColor={
            selectedPublishScoped === 'PUBLIC' ? 'lightPrimary' : 'grey700'
          }
          onClick={() => onClickPublishScoped('PUBLIC')}
        >
          <Text.Span
            weight="bold"
            color={selectedPublishScoped === 'PUBLIC' ? 'black' : 'white'}
          >
            전체 공개
          </Text.Span>
        </Button>
        <Button
          buttonColor={
            selectedPublishScoped === 'FRIENDS' ? 'lightPrimary' : 'grey700'
          }
          onClick={() => onClickPublishScoped('FRIENDS')}
        >
          <Text.Span
            weight="bold"
            color={selectedPublishScoped === 'FRIENDS' ? 'black' : 'white'}
          >
            친구 공개
          </Text.Span>
        </Button>
        <Button
          buttonColor={
            selectedPublishScoped === 'PRIVATE' ? 'lightPrimary' : 'grey700'
          }
          onClick={() => onClickPublishScoped('PRIVATE')}
        >
          <Text.Span
            weight="bold"
            color={selectedPublishScoped === 'PRIVATE' ? 'black' : 'white'}
          >
            비공개
          </Text.Span>
        </Button>
      </div>
    </>
  );
};

interface SubmitButtonProps {
  isAllWritten: boolean;
  onClick: () => void;
}

const SubmitButton = ({ isAllWritten, onClick }: SubmitButtonProps) => {
  return (
    <Button
      disabled={!isAllWritten}
      buttonColor="buttonGreen"
      style={{
        position: 'absolute',
        bottom: getRem(20),
        width: `calc(100% - ${getRem(40)})`,
      }}
      height={calculateRem(52)}
      onClick={onClick}
    >
      <Text.Span color="white" fontSize={calculateRem(18)} weight="bold">
        저장
      </Text.Span>
    </Button>
  );
};

BookmarkAddBS.URLInput = URLInput;
BookmarkAddBS.SelectCategory = SelectCategory;
BookmarkAddBS.PublishScoped = PublishScoped;
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

const StyledInput = styled(Input)``;

const StyledMarginSpanText = styled.div`
  margin-top: ${getRem(25)};
  margin-bottom: ${getRem(25)};
`;
