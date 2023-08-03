import { usePOSTBookmarkReportMutation } from '@/bookmarks/api/bookmark';
import BookmarkReportList from '@/bookmarks/ui/Report/BookmarkReportList';
import BookmarkReportWrite from '@/bookmarks/ui/Report/BookmarkReportWrite';
import { usePOSTReportCommentQuery } from '@/comment/api/Comment';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Header from '@/common-ui/Header/Header';
import Text from '@/common-ui/Text';
import useAuthStore from '@/store/auth';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import { useState } from 'react';

export type ReportMode = 'CHECK' | 'WRITE';

interface ReportPageProps {
  mode: 'BOOKMARK' | 'COMMENT';
  id: string;
}

const ReportPage: ActivityComponentType<ReportPageProps> = ({
  params: { id, mode },
}) => {
  const [reportMode, setReportMode] = useState<ReportMode>('CHECK');
  const [reportText, setReportText] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const { memberId } = useAuthStore();

  const onChangeReportText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportText(e.target.value);
  };

  // TODO : 신고하기 버튼 클릭 시 신고 API 호출
  const { mutate: reportBookmark } = usePOSTBookmarkReportMutation({
    reporterId: memberId,
  });
  const { mutate: reportComment } = usePOSTReportCommentQuery();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = reportMode === 'WRITE' ? reportText : selectedReport;
    if (mode === 'BOOKMARK') {
      reportBookmark({
        reportedId: Number(id),
        reporterId: memberId,
        content,
      });
    }
    if (mode === 'COMMENT') {
      reportComment({
        reportedId: Number(id),
        reporterId: memberId,
        content,
      });
    }
  };

  const buttonDisabled =
    reportMode === 'WRITE' ? !reportText.length : !selectedReport.length;

  return (
    <AppScreen>
      <Header showBackButton />
      <Form onSubmit={onSubmit}>
        <MainText fontSize={getRem(20)} weight="bold" level="h1">
          신고 사유를 선택해 주세요
        </MainText>
        <BookmarkReportList
          setMode={setReportMode}
          setSelectedReport={setSelectedReport}
        />
        <BookmarkReportWrite
          value={reportText}
          isWriteMode={reportMode === 'WRITE'}
          onChange={onChangeReportText}
        />
        <BottomFixedButton disabled={buttonDisabled} type="submit">
          <Text.Span>신고하기</Text.Span>
        </BottomFixedButton>
      </Form>
    </AppScreen>
  );
};

export default ReportPage;

const Form = styled.form``;

const MainText = styled(Text.Header)`
  padding: 0 ${getRem(20)};
  margin-top: ${getRem(10)};
  margin-bottom: ${getRem(20)};
`;
