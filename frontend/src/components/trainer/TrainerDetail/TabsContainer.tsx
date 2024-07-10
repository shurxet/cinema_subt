// src/components/trainer/TrainerDetail/TabsContainer.tsx
import React from 'react';
import { Box } from '@mui/material';
import DialogueTabs from './DialogueTabs';
import ReplicaContent from './ReplicaContent';

interface TabsContainerProps {
  replicas: ReplicaType[];
  selectedTab: number;
  setSelectedTab: (newValue: number) => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ replicas, selectedTab, setSelectedTab }) => {
  const handleChange = (_event: null, newValue: number) => {
    console.log('New selected tab:', newValue);
    setSelectedTab(newValue);
  };

  return (
    <>
      <DialogueTabs replicas={replicas} selectedTab={selectedTab} handleChange={handleChange} />
      <Box>
        {replicas.map((replica, index) => (
          <Box key={index}>
            {selectedTab === index * 2 && (
              <ReplicaContent
                text={replica.interlocutor_a}
                translation={replica.translater_a}
                analysis={replica.interlocutor_a_analysis}
              />
            )}
            {selectedTab === index * 2 + 1 && (
              <ReplicaContent
                text={replica.interlocutor_b}
                translation={replica.translater_b}
                analysis={replica.interlocutor_b_analysis}
              />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TabsContainer;
