import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

const CATEGORY_MAX_LENGTH = 10;

interface NameProps {
  onChangeCategoryName: (name: string) => void;
  categoryName: string;
}

const CategoryName = ({ categoryName, onChangeCategoryName }: NameProps) => {
  return (
    <Wrapper>
      <Text.Header level="h3" weight="bold" fontSize={getRem(16)}>
        카테고리 이름
      </Text.Header>
      <CategoryNameInput
        value={categoryName}
        onChange={(e) => onChangeCategoryName(e.target.value)}
        maxLength={CATEGORY_MAX_LENGTH}
      />
      <CountText
        fontSize={getRem(10)}
      >{`${categoryName.length} / ${CATEGORY_MAX_LENGTH}자`}</CountText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: ${getRem(20)};
`;

const CategoryNameInput = styled(Input)`
  margin-top: ${getRem(20)};
`;

const CountText = styled(Text.P)`
  text-align: right;
  margin-top: ${getRem(10)};
`;

export default CategoryName;
