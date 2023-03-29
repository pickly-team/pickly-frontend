import Icon from '@/common-ui/assets/Icon';
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem, { calculateRem } from '@/utils/getRem';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface CategoryInputProps {
  children: ReactNode;
}

const CategoryInput = ({ children }: CategoryInputProps) => {
  return <CategoryNameInputWrapper>{children}</CategoryNameInputWrapper>;
};

////////////////////////
const CategoryNameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getRem(20)};
  padding: 0 ${getRem(20)};
`;

const CategoryNameInput = styled(Input)`
  margin-top: ${getRem(20)};
`;

interface EmojiProps {
  emoji: string;
  setEmojiBSOpen: () => void;
}

const Emoji = ({ emoji, setEmojiBSOpen }: EmojiProps) => {
  return (
    <UserEmojiEdit onClick={setEmojiBSOpen}>
      <UserBox>
        <Text.Span fontSize={calculateRem(48)}>{emoji}</Text.Span>
        <EditIcon>
          <Icon name="pencil" size="xs" />
        </EditIcon>
      </UserBox>
    </UserEmojiEdit>
  );
};

const UserEmojiEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${getRem(40)};
`;

const UserBox = styled.div`
  position: relative;
  display: flex;
  width: ${getRem(90)};
  height: ${getRem(90)};
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
`;

const EditIcon = styled.div`
  position: absolute;
  right: ${getRem(5)};
  bottom: ${getRem(5)};
`;

interface NameProps {
  onChangeCategoryName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryName: string;
}

const Name = ({ categoryName, onChangeCategoryName }: NameProps) => {
  return (
    <>
      <Text.Header level="h3" weight="bold" fontSize={calculateRem(16)}>
        카테고리 이름
      </Text.Header>
      <CategoryNameInput value={categoryName} onChange={onChangeCategoryName} />
    </>
  );
};

CategoryInput.Emoji = Emoji;
CategoryInput.Name = Name;

export default CategoryInput;
