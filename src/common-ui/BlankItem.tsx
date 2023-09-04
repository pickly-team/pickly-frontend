import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from './Text';

type PAGE =
  | 'BOOKMARK'
  | 'BOOKMARK_READ'
  | 'CATEGORY'
  | 'FRIEND'
  | 'NOTIFICATION'
  | 'FOLLOWER'
  | 'FOLLOWING'
  | 'COMMENT'
  | 'LIKE'
  | 'BLOCK_USER';

interface BlankItemProps {
  page: PAGE;
}

const description: Record<BlankItemProps['page'], string> = {
  BOOKMARK: '아직 즐겨찾기를\n 추가하지 않았어요!',
  BOOKMARK_READ: '모든 즐겨찾기를\n 읽으셨어요!',
  CATEGORY: '앗! 아직 카테고리가 없어요',
  FRIEND: '친구가 없어요',
  NOTIFICATION: '아직 알림을\n 받지 않았어요!',
  FOLLOWER: '앗! 아직 팔로워가 없어요',
  FOLLOWING: '앗! 아직 팔로잉 중인\n 친구가 없어요',
  COMMENT: '앗! 아직 댓글이 없어요',
  LIKE: '아직 좋아요를\n 누르지 않았어요!',
  BLOCK_USER: '차단한 사용자가 없어요',
};

const height: Record<BlankItemProps['page'], string> = {
  BOOKMARK: 'calc(100dvh - 18rem)',
  BOOKMARK_READ: 'calc(100dvh - 18rem)',
  CATEGORY: 'calc(100dvh - 5rem)',
  FRIEND: 'calc(100dvh - 5rem)',
  NOTIFICATION: 'calc(100dvh - 10rem)',
  FOLLOWER: 'calc(80dvh - 5rem)',
  FOLLOWING: 'calc(80dvh - 5rem)',
  COMMENT: 'calc(100dvh - 10rem)',
  LIKE: 'calc(100dvh - 10rem)',
  BLOCK_USER: 'calc(100dvh - 5rem)',
};

const imgSrc: Record<BlankItemProps['page'], string> = {
  BOOKMARK: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  BOOKMARK_READ: `${process.env.VITE_ASSETS_URL}/main.webp`,
  CATEGORY: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  FRIEND: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  NOTIFICATION: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  FOLLOWER: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  FOLLOWING: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  COMMENT: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  LIKE: `${process.env.VITE_ASSETS_URL}/empty.webp`,
  BLOCK_USER: `${process.env.VITE_ASSETS_URL}/empty.webp`,
};

const BlankItem = ({ page }: BlankItemProps) => {
  return (
    <>
      <Wrapper page={page}>
        <Image src={imgSrc[page]} />
        <Description fontSize={1.1} weight="bold">
          {description[page]}
        </Description>
      </Wrapper>
    </>
  );
};

export default BlankItem;

const Wrapper = styled.div<BlankItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => height[props.page]};
  background-color: ${theme.colors.black};
  flex-direction: column;
`;
const Image = styled.img`
  width: 6rem;
  height: 10rem;
`;

const Description = styled(Text.Span)`
  margin-top: 1.3rem;
  white-space: pre-line;
  text-align: center;
`;
