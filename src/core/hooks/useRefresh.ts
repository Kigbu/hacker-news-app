import {useState} from 'react';

const useRefresh = (refreshFunctions: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    const refresh = new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    refresh.then(() => {
      refreshFunctions.map((refreshFunction: any) => {
        refreshFunction();
      });
      setRefreshing(false);
    });
  };

  return {refreshing, onRefresh};
};

export default useRefresh;
