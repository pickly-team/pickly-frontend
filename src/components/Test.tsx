import CheckBox from '@/common-ui/CheckBox';
import styled from '@emotion/styled';

const Test = () => {
  const onChange = (checked: boolean) => {
    console.log(checked);
  };
  return (
    <Container>
      <CheckBox onChange={onChange}>
        <Text>hi</Text>
      </CheckBox>
      <CheckBox onChange={onChange} isChecked={true}>
        <Text>hi</Text>
      </CheckBox>
    </Container>
  );
};

export default Test;

const Container = styled.div`
  width: 200px;
  height: fit-content;
  background-color: ${(p) => p.theme.colors.black};
`;

const Text = styled.span`
  color: ${(p) => p.theme.colors.white};
`;
