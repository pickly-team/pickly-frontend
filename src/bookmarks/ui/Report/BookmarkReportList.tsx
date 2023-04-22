import CheckBox from '@/common-ui/CheckBox';
import Text from '@/common-ui/Text';
import { ReportMode } from '@/pages/ReportPage';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';

interface Report {
  id: number;
  title: string;
  isChecked: boolean;
  mode: ReportMode;
}

interface ReportListProps {
  setMode: (mode: ReportMode) => void;
  setSelectedReport: Dispatch<SetStateAction<string>>;
}

const BookmarkReportList = ({
  setMode,
  setSelectedReport,
}: ReportListProps) => {
  const [reportList, setReportList] = useState<Report[]>([
    { id: 1, title: '개인정보 침해', isChecked: false, mode: 'CHECK' },
    { id: 2, title: '스팸홍보 / 도배글', isChecked: false, mode: 'CHECK' },
    { id: 3, title: '욕설 / 비방', isChecked: false, mode: 'CHECK' },
    { id: 4, title: '음란물', isChecked: false, mode: 'CHECK' },
    { id: 5, title: '직접 입력', isChecked: false, mode: 'WRITE' },
  ]);

  const onClickCheckBox = (id: number) => {
    setReportList((prev) =>
      prev.map((report) =>
        report.id === id
          ? { ...report, isChecked: !report.isChecked }
          : { ...report, isChecked: false },
      ),
    );
    setSelectedReport(
      reportList[id - 1].isChecked ? '' : reportList[id - 1].title,
    );
    if (reportList[id - 1].mode === 'WRITE') setMode('WRITE');
    else setMode('CHECK');
  };

  return (
    <Container>
      {reportList.map((report) => (
        <ReportCheckItem key={report.id}>
          <CheckBox
            isChecked={report.isChecked}
            onChange={() => onClickCheckBox(report.id)}
          >
            <ReportText fontSize={getRem(12)}>{report.title}</ReportText>
          </CheckBox>
        </ReportCheckItem>
      ))}
    </Container>
  );
};

export default BookmarkReportList;

const Container = styled.div`
  padding: 0 ${getRem(20)};
`;

const ReportCheckItem = styled.li`
  margin-bottom: ${getRem(15)};
`;

const ReportText = styled(Text.P)`
  margin-left: ${getRem(15)};
`;
