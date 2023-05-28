import { useState } from 'react';

export type CategoryType = {
  value: string;
  label: string;
};

const useCategory = () => {
  const categoryOptions: CategoryType[] = [
    { value: '백엔드', label: '백엔드' },
    { value: '프론트엔드', label: '프론트엔드' },
  ];
  const [category, setCategory] = useState<string>('');

  const onChangeCategory = (category: string) => {
    setCategory(category);
  };

  return { categoryOptions, category, onChangeCategory };
};

export default useCategory;
