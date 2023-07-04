
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarHeader from "./CalendarHeader";
import EventDialog from "./EventDialog";
import AppointmentDialog from "../../apps/calendar/AppointmentDialog";
import reducer from "./store";
import history from "@history";
import { Link } from "react-router-dom";
import {
  selectEvents,
  openNewEventDialog,
  openNewAppointmentDialog,
  openEditEventDialog,
  openEditAppointmentDialog,
  updateEvent,
  updateAppointment,
  getEvents,
  getAppointment,
} from "./store/eventsSlice";

const Root = styled("div")(({ theme }) => ({
  "& a": {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: "none!important",
  },
  "&  .fc-media-screen": {
    minHeight: "100%",
  },
  "& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th": {
    borderColor: `${theme.palette.divider}!important`,
  },
  "&  .fc-scrollgrid-section > td": {
    border: 0,
  },
  "& .fc-daygrid-day": {
    "&:last-child": {
      borderRight: 0,
    },
  },
  "& .fc-col-header-cell": {
    borderWidth: "0 0 1px 0",
    padding: "16px 0",
    "& .fc-col-header-cell-cushion": {
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  },
  "& .fc-view ": {
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    "& > .fc-scrollgrid": {
      border: 0,
    },
  },
  "& .fc-daygrid-day-number": {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  "& .fc-event": {
    backgroundColor: `orange`,
    color: `${theme.palette.primary.contrastText}!important`,
    border: 0,
    padding: "0 6px",
    borderRadius: "16px!important",
  },
}));

const StyledAddButton = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 12,
  top: 172,
  zIndex: 99,
}));
function CalendarApp(props, className) {
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const calendarRef = useRef();
  const appointment = useSelector(selectEvents);

  const [visible, setVisible] = useState(false);

  const headerEl = useRef(null);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAppointment());
  }, [dispatch]);

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;

    console.log(start, end);

    // dispatch(
    //   openNewEventDialog({
    //     start,
    //     end,
    //   })
    // );
    dispatch(
      openNewAppointmentDialog({
        start,
        end,
      })
    );
  };

  const handleEventDrop = (eventDropInfo) => {
    const { id, title, allDay, start, end, extendedProps } =
      eventDropInfo.event;
    dispatch(
      updateEvent({
        id,
        title,
        allDay,
        start,
        end,
        extendedProps,
      })
    );
  };
  const handleEventClick = (clickInfo) => {
    const { id, title, allDay, start, end, extendedProps } = clickInfo.event;
    dispatch(
      openEditEventDialog({
        id,
        title,
        allDay,
        start,
        end,
        extendedProps,
      })
    );
  };
  const handleAppointmentClick = (clickInfo) => {
    const { id, title, allDay, start, end, extendedProps } = clickInfo.event;
    dispatch(
      openEditAppointmentDialog({
        id,
        title,
        allDay,
        start,
        end,
        extendedProps,
      })
    );
  };

  const handleDates = (rangeInfo) => {
    setCurrentDate(rangeInfo);
  };

  const handleEventAdd = (addInfo) => {};
  const handleAppointmentAdd = (addInfo) => {};

  const handleEventChange = (changeInfo) => {};
  const handleAppointmentChange = (changeInfo) => {};

  const handleEventRemove = (removeInfo) => {};
  function handleNewAppointment() {
    history.push("/apps/calendar/NewAppointment");
  }

  return (
    <Root className="flex flex-col flex-auto relative">
      <CalendarHeader calendarRef={calendarRef} currentDate={currentDate} />

      <div className="flex flex-1 p-24 container">
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            datesSet={handleDates}
            select={handleDateSelect}
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove}
            eventDrop={handleEventDrop}
            initialDate={new Date(2021, 3, 1)}
            ref={calendarRef}
          />
        </motion.div>

        {/* <StyledAddButton
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.4 } }}
        >
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() =>
              dispatch(
                openNewEventDialog({
                  start: new Date(),
                  end: new Date(),
                })
              )
            }
          >
            
            <Icon>add</Icon>
             New Appointment
          </Fab>
        </StyledAddButton> */}
        <Button
          target="_blank"
          rel="noreferrer noopener"
          role="button"
          className={clsx("", className)}
          variant="contained"
          color="secondary"
          style={{
            position: "absolute",
            height: "30px",
            right: 12,
            top: 150,
            zIndex: 99,
          }}
          aria-label="add"
          onClick={() =>
            dispatch(
              openNewAppointmentDialog({
                start: new Date(),
                end: new Date(),
              })
            )
          }
        >
          <Icon>add</Icon>
          <span className="mx-4"> New Appointment</span>
        </Button>
        <AppointmentDialog setVisible={setVisible} />
      </div>
    </Root>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="flex items-center">
      <Typography className="text-12 font-semibold">
        {eventInfo.timeText}
      </Typography>
      <Typography className="text-12 px-4 truncate">
        {eventInfo.event.title}
      </Typography>
    </div>
  );
}

export default withReducer("calendarApp", reducer)(CalendarApp);

