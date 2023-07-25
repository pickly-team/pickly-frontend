/* eslint-disable @typescript-eslint/no-empty-function */
import Input from '@/common-ui/Input';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import React from 'react';

interface EditBoxProps {
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isEssential?: boolean;
  withCount?: boolean;
}

const EditBox = ({
  name,
  value,
  onChange,
  disabled = false,
  isEssential = false,
  withCount = false,
}: EditBoxProps) => {
  return (
    <StyleEditBox>
      <StyleRow>
        <Title>{name}</Title>
        {isEssential && <StarText color="lightGreen"> *</StarText>}
      </StyleRow>
      <Input
        value={value}
        onChange={onChange ? onChange : () => {}}
        disabled={disabled}
        maxLength={withCount ? 7 : undefined}
      />
      {withCount && (
        <CountText fontSize={getRem(10)}>{`${value.length} / 7자`}</CountText>
      )}
    </StyleEditBox>
  );
};

export default EditBox;

const StyleEditBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${getRem(20)};
`;

const StyleRow = styled.div`
  display: flex;
`;

const Title = styled(Text.P)`
  margin-bottom: ${getRem(10)};
`;

const StarText = styled(Text.P)`
  margin-left: ${getRem(3)};
`;

const CountText = styled(Text.P)`
  text-align: right;
  margin-top: ${getRem(10)};
`;
