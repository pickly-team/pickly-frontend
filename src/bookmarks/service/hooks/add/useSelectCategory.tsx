import { useState } from 'react';

const useSelectCategory = () => {
  const [selectedCategoryId, setCategoryId] = useState('');

  const setSelectedCategoryId = (id: string) => {
    setCategoryId(id);
  };

  return { selectedCategoryId, setCategoryId, setSelectedCategoryId };
};

export default useSelectCategory;
