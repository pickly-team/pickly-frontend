import styled from '@emotion/styled';
import Icon from '@/common-ui/assets/Icon';
import { useState } from 'react';
import getRem from '@/utils/getRem';

interface Props {
  summary: string;
  detail: string;
}

const Collapsible = ({ summary, detail }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleBtn = () => setToggle(!toggle);

  return (
    <ToggleCard>
      <button onClick={toggleBtn}>
        <IconSection open={toggle}>
          <Icon name={toggle ? 'arrow-right' : 'arrow-right'} size="xs" />
        </IconSection>
        {summary}
      </button>
      <br />
      <ToggleBody open={toggle}>{detail}</ToggleBody>
    </ToggleCard>
  );
};

export default Collapsible;

const ToggleCard = styled.div`
  margin-bottom: ${getRem(10)};
`;

const IconSection = styled.div<{ open: boolean }>`
  margin-right: 15px;
  display: inline-block;
  transition: transform 0.5s ease;
  transform: rotate(${(props) => (props.open ? '90deg' : '0deg')});
`;

const ToggleBody = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-height: ${(props) => (props.open ? getRem(500) : '0')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;

  gap: ${getRem(10)};
  background: #313131;
  padding: ${(props) =>
    props.open
      ? `${getRem(10)}`
      : `${getRem(0)} ${getRem(10)} ${getRem(0)} ${getRem(10)}`};
  border-radius: ${getRem(8)};
  margin-left: ${getRem(30)};
  font-family: 'NanumSquareRound';
  font-style: normal;
  font-weight: ${getRem(700)};
  font-size: ${getRem(11)};
  line-height: 150%;
  white-space: pre-wrap;
  margin-bottom: ${getRem(30)};
`;
