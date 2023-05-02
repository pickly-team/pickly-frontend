import styled from '@emotion/styled';
import Icon from '@/common-ui/assets/Icon';
import { useState } from 'react';
import getRem from '@/utils/getRem';

interface Props {
  summary: string;
  detail: string;
}

const Collapsible = ({ summary, detail }: Props) => {
  const [toggle, setToggle] = useState<boolean | null>(false);
  const toggleBtn = () => {
    if (toggle !== !toggle) {
      setToggle(!toggle);
    }
  };
  return (
    <ToggleCard>
      <button onClick={toggleBtn}>
        <IconSection>
          <Icon name={toggle ? 'arrow-down' : 'arrow-right'} size="xs" />
        </IconSection>
        {summary}
      </button>
      <br />
      <ToogleBody style={toggle ? { display: 'block' } : { display: 'none' }}>
        {detail}
      </ToogleBody>
    </ToggleCard>
  );
};

export default Collapsible;

const ToggleCard = styled.div`
  margin-bottom: 15px;
`;

const ToogleBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${getRem(0)};
  gap: ${getRem(10)};
  background: #313131;
  border-radius: ${getRem(8)};
  padding: ${getRem(10)};
  margin-left: ${getRem(30)};

  font-family: 'NanumSquareRound';
  font-style: normal;
  font-weight: ${getRem(700)};
  font-size: ${getRem(11)};
  line-height: 150%;
`;

const IconSection = styled.div`
  margin-right: 15px;
`;
