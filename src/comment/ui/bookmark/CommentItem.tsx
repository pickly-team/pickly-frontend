/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import { useFlow } from '@/common-ui/stackflow';

interface CommentProps {
  id: number;
  memberId: number;
  profileEmoji: string;
  nickname: string;
  content: string;
  updatedAt: string;
  isWriter: boolean;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

const CommentItem = ({
  id,
  memberId,
  profileEmoji,
  nickname,
  content,
  updatedAt,
  isWriter,
  onClickDelete,
  onClickEdit,
}: CommentProps) => {
  const { push } = useFlow();
  const onClickUserProfile = () => {
    if (isWriter) return;
    push('FriendBookmarkPage', {
      id: String(memberId),
    });
  };
  const onClickReport = () => {
    push('ReportPage', {
      mode: 'COMMENT',
      id: String(id),
    });
  };

  return (
    <Container>
      <CommentHeader>
        <NicknameTextAndIconWrapper onClick={onClickUserProfile}>
          <NicknameText fontSize={1}>{profileEmoji}</NicknameText>
          <NicknameText fontSize={1} weight={'bold'}>
            {nickname}
          </NicknameText>
        </NicknameTextAndIconWrapper>
        <div />
        <div />
        <TriggerBottomSheet>
          <TriggerBottomSheet.Trigger
            as={<IconButton onClick={() => {}} name="more" size="s" />}
          />
          <TriggerBottomSheet.BottomSheet>
            {isWriter ? (
              <MoreContent
                type="writer"
                onClickDelete={onClickDelete ?? (() => {})}
                onClickEdit={onClickEdit ?? (() => {})}
              />
            ) : (
              <MoreContent type="notWriter" onClickReport={onClickReport} />
            )}
          </TriggerBottomSheet.BottomSheet>
        </TriggerBottomSheet>
      </CommentHeader>
      <ContentText fontSize={0.8}>{content}</ContentText>
      <IconAndTextWrapper>
        <Icon name="timeline" size={'xs'} />
        <UpdatedAtText fontSize={0.625}>{updatedAt}</UpdatedAtText>
      </IconAndTextWrapper>
    </Container>
  );
};

export default CommentItem;

const Container = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 0.8rem;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey800};
  margin-bottom: 1rem;
  :nth-last-of-type(1) {
    margin-bottom: 5rem;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 1.5rem;
`;

const NicknameTextAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
  margin-right: auto; // 추가
`;

const NicknameText = styled(Text.Span)``;
const ContentText = styled(Text.Span)``;
const UpdatedAtText = styled(Text.Span)``;
const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

type Writer = {
  type: 'writer';
  onClickDelete?: () => void;
  onClickEdit?: () => void;
};

type NotWriter = {
  type: 'notWriter';
  onClickReport?: () => void;
};

type UserActions =
  | {
      type: 'writer';
      onClickDelete: () => void;
      onClickEdit: () => void;
    }
  | {
      type: 'notWriter';
      onClickReport: () => void;
    };

const MoreContent = ({ type, ...actions }: UserActions) => {
  if (type === 'writer') {
    const { onClickDelete, onClickEdit } = actions as Writer;
    return (
      <>
        <TriggerBottomSheet.Item onClick={onClickEdit}>
          수정하기
        </TriggerBottomSheet.Item>
        <TriggerBottomSheet.Item onClick={onClickDelete}>
          삭제하기
        </TriggerBottomSheet.Item>
      </>
    );
  } else {
    const { onClickReport } = actions as NotWriter;
    return (
      <>
        <TriggerBottomSheet.Item onClick={onClickReport}>
          신고하기
        </TriggerBottomSheet.Item>
      </>
    );
  }
};
