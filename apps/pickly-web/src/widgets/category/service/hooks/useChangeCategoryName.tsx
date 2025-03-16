import { useState } from 'react';

const useChangeCategoryName = () => {
  const [categoryName, setCategoryName] = useState('');
  const onChangeCategoryName = (name: string) => {
    setCategoryName(name);
  };

  return {
    categoryName,
    onChangeCategoryName,
  };
};

export default useChangeCategoryName;
