import { useState } from 'react';

const useSelectCategory = () => {
  const [selectedCategoryId, setCategoryId] = useState(0);

  const setSelectedCategoryId = (id: number) => {
    setCategoryId(id);
  };

  return { selectedCategoryId, setCategoryId, setSelectedCategoryId };
};

export default useSelectCategory;
