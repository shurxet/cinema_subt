// src/components/trainer/TrainerDetail/TrainerTabs.tsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TrainerTabsProps {
  sections: SectionType[];
  selectedTab: number;
  onTabChange: (event: React.ChangeEvent<NonNullable<unknown>>, newValue: number) => void;
}

const TrainerTabs: React.FC<TrainerTabsProps> = ({ sections, selectedTab, onTabChange }) => (
  <Box mt={2}>
    <Tabs
      value={selectedTab}
      onChange={onTabChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="lesson sections tabs"
    >
      {sections.map((section, index) => (
        <Tab key={section.id} label={section.title} />
      ))}
      <Tab label="Упражнения" />
    </Tabs>
  </Box>
);

export default TrainerTabs;
