import styled from "styled-components";
import Calendar from "../assets/calendar.svg";
import Event from "../assets/event.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  function habitsPage() {
    navigate("/home");
  }

  function todayPage() {
    navigate("/hoje");
  }

  return (
    <Container>
      <CalendarContainer
        onClick={habitsPage}
        active={location.pathname === "/home" ? "true" : undefined}
      >
        <img src={Calendar} alt="" />
        <span>Hábitos</span>
      </CalendarContainer>
      <EventContainer
        onClick={todayPage}
        active={location.pathname === "/hoje" ? "true" : undefined}
      >
        <img src={Event} alt="" />
        <span>Hoje</span>
      </EventContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const CalendarContainer = styled.div`
  height: 65px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: Lexend Deca;
  color: ${({ active }) => (active ? "#fff" : "#d4d4d4")};
  background-color: ${({ active }) => (active ? "#52b6ff" : "#fff")};
`;

const EventContainer = styled.div`
  height: 65px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 18px;
  font-family: Lexend Deca;
  color: ${({ active }) => (active ? "#fff" : "#d4d4d4")};
  background-color: ${({ active }) => (active ? "#52b6ff" : "#fff")};
`;
