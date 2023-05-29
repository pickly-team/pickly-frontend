import { FC } from 'react';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

type FriendInfo = {
  id: string;
  name: string;
  profileEmoji?: string;
};
export type FriendItemRendererProps = FriendInfo;

interface FriendItemListLayoutProps {
  infos: FriendInfo[];
  Renderer: FC<FriendItemRendererProps>;
}
const FriendList = ({ infos, Renderer }: FriendItemListLayoutProps) => {
  return (
    <Container>
      {infos.map((info) => (
        <Renderer key={info.id} {...info} />
      ))}
    </Container>
  );
};

export default FriendList;

const Container = styled.div`
  > * + * {
    margin-top: ${getRem(10)};
  }
`;
