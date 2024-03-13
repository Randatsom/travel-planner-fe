import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CustomTabPanel from "./CustomTabPanel";
import { v4 as uuidv4 } from "uuid";

const CustomTabs = ({ children, currentTabIndex, setCurrentTabIndex }) => {
  const childrenArray = React.Children.toArray(children);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {childrenArray.map((child, index) => (
            <Tab
              key={uuidv4()}
              label={child.props.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {childrenArray.map((child, index) => (
        <CustomTabPanel key={uuidv4()} value={currentTabIndex} index={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default CustomTabs;
