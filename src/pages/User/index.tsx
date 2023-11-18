import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import AuthenticationCodePage from './AuthenticationCodePage';
import BlockUserListPage from './BlockUserListPage';
import CommentPage from './CommentPage';
import FaqPage from './FaqPage';
import LikePage from './LikePage';
import ProfilePage from './ProfilePage';
import SettingPage from './SettingPage';
import UserInfoPage from './UserInfoPage';

const UserRoutes = () => {
  return [
    <Route path={navigatePath.PROFILE} element={<ProfilePage />} />,
    <Route path={navigatePath.COMMENT} element={<CommentPage />} />,
    <Route path={navigatePath.LIKE_PAGE} element={<LikePage />} />,
    <Route path={navigatePath.FAQ} element={<FaqPage />} />,
    <Route path={navigatePath.SETTING} element={<SettingPage />} />,
    <Route path={navigatePath.USER} element={<UserInfoPage mode="CREATE" />} />,
    <Route path={navigatePath.USER} element={<UserInfoPage mode="EDIT" />} />,
    <Route path={navigatePath.CODE} element={<AuthenticationCodePage />} />,
    <Route path={navigatePath.BLOCK_USER} element={<BlockUserListPage />} />,
  ];
};

export default UserRoutes;
