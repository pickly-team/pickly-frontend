import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import ReportPage from './ReportPage';

const ReportRoutes = () => {
  return [
    <Route
      path={navigatePath.COMMENT_REPORT}
      element={<ReportPage mode="COMMENT" />}
    />,
    <Route
      path={navigatePath.BOOKMARK_REPORT}
      element={<ReportPage mode="BOOKMARK" />}
    />,
    <Route
      path={navigatePath.MEMBER_REPORT}
      element={<ReportPage mode="MEMBER" />}
    />,
  ];
};

export default ReportRoutes;
