import React from 'react';

const useEditList = () => {
  const [isEdit, setEdit] = React.useState(false);

  const onChangeEdit = () => {
    if (isEdit) return;
    setEdit(!isEdit);
  };

  return { isEdit, onChangeEdit };
};

export default useEditList;
