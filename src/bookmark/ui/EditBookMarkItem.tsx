import { ClientBookMarkItem } from '@/apis/bookmark';
import Icon from '@/common-ui/assets/Icon';
import CheckBox from '@/common-ui/CheckBox';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';
import { useState } from 'react';

const EditBookMarkItem = ({
  title,
  url,
  imgSrc,
  isRead,
  isLiked,
  isMessage,
  date,
  id,
  onClickItem,
}: ClientBookMarkItem & { onClickItem: (bookmarkId: string) => void }) => {
  const [checked, setChecked] = useState(false);

  const onChangeCheck = () => {
    setChecked(!checked);
    onClickItem(id);
  };

  return (
    <CheckBox id={id} isChecked={checked} onChange={onChangeCheck}>
      <Wrapper>
        <ItemWrapper>
          <ItemUpperLeft>
            <EllipsisText fontSize={1.2} weight="bold">
              {title}
            </EllipsisText>
            <Text.Span fontSize={1} color="lightGreen">
              {url}
            </Text.Span>
          </ItemUpperLeft>
          <ItemUpperRight>
            <Thumbnail src={imgSrc} />
          </ItemUpperRight>
        </ItemWrapper>
        <UnderWrapper>
          <IconWrapper>
            <Icon name={isLiked ? 'like-green' : 'like'} size="xs" />
            <Icon name={isMessage ? 'message-on-green' : 'message'} size="xs" />
            {!isRead && <Icon name="not-read" size="xs" />}
          </IconWrapper>
          <Text.Span fontSize={0.9} color="lightGreen">
            {date}
          </Text.Span>
        </UnderWrapper>
      </Wrapper>
    </CheckBox>
  );
};

export default EditBookMarkItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UnderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
`;

const IconWrapper = styled.div`
  display: flex;
  column-gap: 0.7rem;
`;

const ItemUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  flex: 1 1 auto;
  min-width: 0;
`;

const EllipsisText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemUpperRight = styled.div`
  display: flex;
`;

const Thumbnail = styled.img`
  width: 7rem;
  height: 5rem;
`;
