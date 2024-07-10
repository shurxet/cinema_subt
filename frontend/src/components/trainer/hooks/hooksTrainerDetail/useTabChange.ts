// src/components/trainer/hooks/useTabChange.ts
import React, { useState } from 'react';

const useTabChange = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.ChangeEvent<NonNullable<unknown>>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return { selectedTab, handleTabChange };
};

export default useTabChange;
