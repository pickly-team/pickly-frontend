import BottomSheet from '@/common-ui/BottomSheet/BottomSheet';
import Button from '@/common-ui/Button';
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem, { calculateRem } from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ClientBookmarkCategoryItem, Visibility } from '../../api/bookmark';
import TagBoxList from '../BookmarkTagList';
import Icon from '@/common-ui/assets/Icon';
import { KeyboardEvent, useEffect, useRef } from 'react';
import IconButton from '@/common/ui/IconButton';
import useBookmarkStore from '@/store/bookmark';
import { useLocation } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { Oval } from 'react-loader-spinner';
import DisabledButton from '@/common-ui/DisabledButton';
import { AiOutlinePaperClip as PaperClip } from 'react-icons/ai';

interface BookmarkAddBSProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const BookmarkAddBS = ({ isOpen, close, children }: BookmarkAddBSProps) => {
  const location = useLocation();
  const { setFromPath } = useBookmarkStore();
  useEffect(() => {
    setFromPath(location.pathname);
  }, [location.pathname]);
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
  title: string;
  isValidateUrl: boolean;
  isLoadingGetTitle: boolean;
  onChangeUrl: (url: string) => void;
  onChangeTitle: (title: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onDeleteInput: (type: 'url' | 'title') => void;
  disabled?: boolean;
}

const URLInput = ({
  url,
  title,
  isValidateUrl,
  isLoadingGetTitle,
  onChangeUrl,
  onChangeTitle,
  handleKeyDown,
  onDeleteInput,
  disabled = false,
}: URLInputProps) => {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // NOTE : URL 입력창이 포커스 되면, 키보드가 올라오는데,
  // 이때, 키보드가 올라오는 시간을 기다려서, 포커스를 해제한다.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (urlInputRef.current) urlInputRef.current.blur();
      if (titleInputRef.current) titleInputRef.current.blur();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeadingText>Step 1. URL 입력</HeadingText>
      <StyledInputWrapper>
        <StyleIconWrapper>
          <IconWrapper>
            <PaperClip size={27} color={theme.colors.white} />
          </IconWrapper>
          <StyledInputCloseWrapper>
            <StyledInput
              css={css`
                transition: all 0.5s ease-in-out;
              `}
              border={{
                color: isValidateUrl ? 'lightPrimary' : 'grey700',
                borderWidth: calculateRem(30),
                borderRadius: calculateRem(10),
              }}
              value={url}
              onKeyDown={handleKeyDown}
              onChange={(e) => onChangeUrl(e.target.value)}
              disabled={disabled}
              ref={urlInputRef}
              maxLength={2000}
            />
            <FixedIconWrapper>
              {!!url.length && !disabled && (
                <IconButton
                  onClick={() => onDeleteInput('url')}
                  name="close"
                  size="xs"
                />
              )}
            </FixedIconWrapper>
          </StyledInputCloseWrapper>
        </StyleIconWrapper>
        <StyleIconWrapper>
          <IconWrapper>
            <Icon name="bookmark" size="m" />
          </IconWrapper>
          <StyledInputCloseWrapper>
            {isLoadingGetTitle ? (
              <StyledLoadingInput>
                <Oval
                  height={25}
                  width={25}
                  color={theme.colors.lightPrimary}
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor={theme.colors.lightPrimary}
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              </StyledLoadingInput>
            ) : (
              <>
                <StyledInput
                  css={css`
                    transition: all 0.5s ease-in-out;
                  `}
                  border={{
                    color: title.length ? 'lightPrimary' : 'grey700',
                    borderWidth: calculateRem(30),
                    borderRadius: calculateRem(10),
                  }}
                  value={title}
                  onChange={(e) => onChangeTitle(e.target.value)}
                  ref={titleInputRef}
                  maxLength={100}
                />
                <FixedIconWrapper>
                  {!!title.length && (
                    <IconButton
                      onClick={() => onDeleteInput('title')}
                      name="close"
                      size="xs"
                    />
                  )}
                </FixedIconWrapper>
              </>
            )}
          </StyledInputCloseWrapper>
        </StyleIconWrapper>
      </StyledInputWrapper>
    </>
  );
};

const StyledLoadingInput = styled.div`
  display: flex;
  height: ${getRem(52)};
  width: 100%;
  background-color: ${theme.colors.grey900};
  border-color: ${theme.colors.grey700};
  border-width: ${getRem(30)};
  border-radius: ${getRem(10)};
  border: 1px solid ${theme.colors.grey700};
  align-items: center;
  justify-content: center;
`;

interface SelectCategoryProps {
  categoryList: ClientBookmarkCategoryItem[] | undefined;
  selectedCategoryId: number;
  onClickCategory: (category: number) => void;
}

const SelectCategory = ({
  categoryList,
  selectedCategoryId,
  onClickCategory,
}: SelectCategoryProps) => {
  return (
    <>
      <HeadingText>Step 2. 카테고리 선택</HeadingText>
      {categoryList && (
        <TagBoxList
          tags={categoryList}
          selectedTagId={selectedCategoryId}
          onClickCategory={onClickCategory}
        />
      )}
    </>
  );
};

interface DisclosureScopeProps {
  selectedPublishScoped: Visibility;
  onClickPublishScoped: (type: Visibility) => void;
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
          margin-bottom: ${getRem(90)};
        `}
      >
        <Button
          buttonColor={
            selectedPublishScoped === 'SCOPE_PUBLIC'
              ? 'lightPrimary'
              : 'grey700'
          }
          onClick={() => onClickPublishScoped('SCOPE_PUBLIC')}
        >
          <Text.Span
            weight="bold"
            color={selectedPublishScoped === 'SCOPE_PUBLIC' ? 'black' : 'white'}
          >
            👀 전체 공개
          </Text.Span>
        </Button>
        <Button
          buttonColor={
            selectedPublishScoped === 'SCOPE_FRIEND'
              ? 'lightPrimary'
              : 'grey700'
          }
          onClick={() => onClickPublishScoped('SCOPE_FRIEND')}
        >
          <Text.Span
            weight="bold"
            color={selectedPublishScoped === 'SCOPE_FRIEND' ? 'black' : 'white'}
          >
            👥 친구 공개
          </Text.Span>
        </Button>
        <Button
          buttonColor={
            selectedPublishScoped === 'SCOPE_PRIVATE'
              ? 'lightPrimary'
              : 'grey700'
          }
          onClick={() => onClickPublishScoped('SCOPE_PRIVATE')}
        >
          <Text.Span
            weight="bold"
            color={
              selectedPublishScoped === 'SCOPE_PRIVATE' ? 'black' : 'white'
            }
          >
            🔒 비공개
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
    <>
      {!!isAllWritten && (
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
      )}
      {!isAllWritten && (
        <DisabledButton
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
        </DisabledButton>
      )}
    </>
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: ${getRem(20)};
`;

const StyleIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${getRem(10)};
  width: 100%;
`;

const StyledInputCloseWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const FixedIconWrapper = styled.div`
  position: absolute;
  top: ${getRem(0)};
  right: ${getRem(12)};
`;

const StyledInput = styled(Input)`
  padding-right: ${getRem(40)};
`;

const StyledMarginSpanText = styled.div`
  margin: ${getRem(30)} 0;
  :nth-of-type(1) {
    margin-top: ${getRem(10)};
  }
`;

const IconWrapper = styled.div`
  width: ${getRem(40)};
`;
