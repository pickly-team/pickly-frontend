import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import CategoryManagePage from './CategoryManagePage';

const CategoryRoutes = () => {
  return [
    <Route path={navigatePath.CATEGORY_LIST} />,
    <Route
      path={navigatePath.CATEGORY_ADD}
      element={<CategoryManagePage mode="ADD" />}
    />,
    <Route
      path={navigatePath.CATEGORY_EDIT}
      element={<CategoryManagePage mode="EDIT" />}
    />,
  ];
};

export default CategoryRoutes;
