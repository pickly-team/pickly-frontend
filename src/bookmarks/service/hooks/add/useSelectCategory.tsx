import { useEffect, useState } from 'react';

interface SelectCategory {
  defaultCategoryId?: number;
}

const useSelectCategory = ({ defaultCategoryId }: SelectCategory) => {
  const [selectedCategoryId, setCategoryId] = useState(0);

  useEffect(() => {
    if (defaultCategoryId) {
      setCategoryId(defaultCategoryId);
    }
  }, [defaultCategoryId]);

  const setSelectedCategoryId = (id: number) => {
    setCategoryId(id);
  };

  return { selectedCategoryId, setCategoryId, setSelectedCategoryId };
};

export default useSelectCategory;
