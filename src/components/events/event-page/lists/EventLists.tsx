import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LiquorIcon from "@mui/icons-material/Liquor";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import { IEvent, IEventList } from "../../../../core/models/events";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEditEvent } from "../../query/mutations";
import { useSelector } from "react-redux";
import { selectEvent } from "../../../../core/slices/event/eventSelect";
import { EventList } from "./EventList";

export const EventLists = ({ stateSelectedList }) => {
  const [selectedList, setSelectedList] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const event: IEvent = useSelector(selectEvent);
  const cardStyles = {
    width: 250,
    height: 300,
  };
  const editUserEventMutation = useEditEvent("eventInfo");
  const defaultIcons = {
    ProductionQuantityLimitsIcon: (
      <ProductionQuantityLimitsIcon
        sx={{ marginBottom: "-2px", marginRight: "7px" }}
      />
    ),
    LiquorIcon: (
      <LiquorIcon sx={{ marginBottom: "-2px", marginRight: "7px" }} />
    ),
    InventoryIcon: (
      <InventoryIcon sx={{ marginBottom: "-2px", marginRight: "7px" }} />
    ),
  };

  const defaultLists = [
    {
      title: "Продукты",
      iconName: "ProductionQuantityLimitsIcon",
      items: [],
      completed: 0,
    },
    {
      title: "Напитки",
      iconName: "LiquorIcon",
      items: [],
      completed: 0,
    },
    { title: "Вещи", iconName: "InventoryIcon", items: [], completed: 0 },
  ];

  const getCardIcon = (iconName: string, key: string) => {
    if (iconName) {
      return React.cloneElement(defaultIcons[iconName], { key });
    } else {
      return (
        <CategoryIcon
          key={key}
          sx={{ marginBottom: "-2px", marginRight: "7px" }}
        />
      );
    }
  };

  const handleListCreation = () => {
    if (!event?.lists.length) {
      editUserEventMutation.mutate({
        eventId: event._id,
        data: { ...event, lists: [...defaultLists] },
      });
    }
  };

  if (selectedList || stateSelectedList) {
    return (
      <EventList
        list={selectedList ?? stateSelectedList}
        setSelectedList={setSelectedList}
      />
    );
  }

  if (!event?.lists.length) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">Пока нет созданных списков</Typography>
        </Grid>
        <Grid item xs={12} onClick={handleListCreation}>
          <Button variant="contained">Создать</Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        cursor: "pointer",
      }}
    >
      {event.lists.map((list: IEventList) => (
        <Card
          key={list._id}
          sx={cardStyles}
          onClick={() => setSelectedList(list)}
        >
          <CardContent>
            <Typography variant="h5">
              {getCardIcon(list.iconName, list._id)}
              {list.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
