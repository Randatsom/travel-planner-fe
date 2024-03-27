import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LiquorIcon from "@mui/icons-material/Liquor";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import {
  IEvent,
  IEventList,
  IEventListItem,
} from "../../../../core/models/events";
import React, { useState } from "react";
import { useEditEvent } from "../../query/mutations";
import { useSelector } from "react-redux";
import { selectEvent } from "../../../../core/slices/event/eventSelect";
import { EventList } from "./EventList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import { openModal } from "../../../../core/slices/modal/modalSlice";
import { ModalId } from "../../../modal/types";
import { AddListModal } from "./add-list/AddListModal";

export const EventLists = ({ stateSelectedList }) => {
  const dispatch = useAppDispatch();
  const [selectedList, setSelectedList] = useState(null);
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

  const getCheckedItemsPercentages = (list: IEventList) => {
    let checkedItemsQuantity = 0;
    list.items.forEach((item: IEventListItem) => {
      if (item.checked) checkedItemsQuantity++;
    });
    return checkedItemsQuantity
      ? ((checkedItemsQuantity / list.items.length) * 100).toFixed(0)
      : 0;
  };

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
      <Card sx={cardStyles}>
        <CardContent
          sx={{
            height: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            size="large"
            onClick={() => dispatch(openModal(ModalId.AddNewList))}
          >
            <AddCircleIcon
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
              }}
            />
          </IconButton>
          <AddListModal />
          <Typography variant="h5">Добавить список</Typography>
        </CardContent>
      </Card>
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
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 220,
              }}
            >
              <CircularProgress
                variant="determinate"
                value={getCheckedItemsPercentages(list)}
                size={120}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >{`${getCheckedItemsPercentages(list)}%`}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
