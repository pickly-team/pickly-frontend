import BookmarkReportList from '@/bookmarks/ui/Report/BookmarkReportList';
import BookmarkReportWrite from '@/bookmarks/ui/Report/BookmarkReportWrite';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Header from '@/common-ui/Header/Header';
import Text from '@/common-ui/Text';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { useState } from 'react';

export type ReportMode = 'CHECK' | 'WRITE';

const ReportPage = () => {
  const [mode, setMode] = useState<ReportMode>('CHECK');
  const [reportText, setReportText] = useState('');
  const [selectedReport, setSelectedReport] = useState('');

  const onChangeReportText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportText(e.target.value);
  };

  // TODO : 신고하기 버튼 클릭 시 신고 API 호출
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedReport, reportText);
  };

  const buttonDisabled =
    mode === 'WRITE' ? !reportText.length : !selectedReport.length;

  return (
    <>
      <Header showBackButton />
      <Form onSubmit={onSubmit}>
        <MainText fontSize={getRem(20)} weight="bold" level="h1">
          신고 사유를 선택해 주세요
        </MainText>
        <BookmarkReportList
          setMode={setMode}
          setSelectedReport={setSelectedReport}
        />
        <BookmarkReportWrite
          value={reportText}
          isWriteMode={mode === 'WRITE'}
          onChange={onChangeReportText}
        />
        <BottomFixedButton disabled={buttonDisabled} type="submit">
          <Text.Span>신고하기</Text.Span>
        </BottomFixedButton>
      </Form>
    </>
  );
};

export default ReportPage;

const Form = styled.form``;

const MainText = styled(Text.Header)`
  padding: 0 ${getRem(20)};
  margin-top: ${getRem(10)};
  margin-bottom: ${getRem(20)};
`;
