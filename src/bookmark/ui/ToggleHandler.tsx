import Icon from '@/common-ui/assets/Icon';
import Button from '@/common-ui/Button';
import Select from '@/common-ui/Select';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

interface ToggleHandlerProps {
  isRead: boolean;
  isEdit: boolean;
  category: string;
  onChangeRead: () => void;
  onChangeEdit: () => void;
}

// TODO : Select 컴포넌트 수정

const OPTIONS = [
  { value: '1', label: '1 라벨' },
  { value: '2', label: '2 라벨' },
];

const ToggleHandler = ({
  isRead,
  isEdit,
  category,
  onChangeEdit,
  onChangeRead,
}: ToggleHandlerProps) => {
  const CategoryButton = () => (
    <Button
      buttonColor="black"
      height={2.5}
      style={{
        border: `2px solid ${theme.colors.lightPrimary}`,
        borderRadius: '0.8rem',
      }}
    >
      <Text.Span color="lightPrimary">백엔드</Text.Span>
      <IconWrapper>
        <Icon name="arrow-down-green" size="xs" />
      </IconWrapper>
    </Button>
  );

  return (
    <>
      <ToggleWrapper>
        <Select
          value={category}
          onChange={() => console.log('hi')}
          isSearchActive
          TriggerButton={CategoryButton}
        >
          {OPTIONS.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Button
          buttonColor="black"
          height={2.5}
          style={{
            border: `2px solid ${theme.colors.lightPrimary}`,
            borderRadius: '0.8rem',
          }}
          onClick={onChangeRead}
        >
          <Text.Span color="lightPrimary">
            {isRead ? '읽음' : '읽지 않음'}
          </Text.Span>
        </Button>
        <Button
          buttonColor="black"
          height={2.5}
          style={{
            border: `2px solid ${theme.colors.lightPrimary}`,
            borderRadius: '0.8rem',
          }}
          onClick={onChangeEdit}
        >
          <Text.Span color="lightPrimary">{isEdit ? '완료' : '편집'}</Text.Span>
        </Button>
      </ToggleWrapper>
    </>
  );
};

export default ToggleHandler;

const ToggleWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  button:nth-of-type(1) {
    margin-right: 2rem;
  }
  button:nth-of-type(2) {
    margin-right: 2rem;
  }
`;

const IconWrapper = styled.div`
  margin-left: 0.3rem;
`;
