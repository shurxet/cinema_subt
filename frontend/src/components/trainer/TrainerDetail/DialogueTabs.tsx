// src/components/trainer/TrainerDetail/DialogueTabs.tsx
import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface DialogueTabsProps {
  replicas: ReplicaType[];
  selectedTab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const DialogueTabs: React.FC<DialogueTabsProps> = ({ replicas, selectedTab, handleChange }) => {
  const tabs = replicas.flatMap((replica, index) => [
    <Tab key={`a-${index}`} label={replica.interlocutor_a} value={index * 2} sx={{ fontWeight: 'bold' }} />,
    <Tab key={`b-${index}`} label={replica.interlocutor_b} value={index * 2 + 1} sx={{ fontWeight: 'bold' }} />,
  ]);

  return (
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="dialogue tabs"
      sx={{ paddingBottom: 5 }}
    >
      {tabs}
    </Tabs>
  );
};

export default DialogueTabs;
