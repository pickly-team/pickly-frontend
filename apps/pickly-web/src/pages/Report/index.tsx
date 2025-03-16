import { Route } from 'react-router-dom';
import ReportPage from './ReportPage';
import { navigatePath } from '@/shared/constants/navigatePath';

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
