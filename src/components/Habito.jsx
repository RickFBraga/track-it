import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Habito({ token }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        setHabits(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }, [token]);

  return (
    <ContainerHabito>
      {habits.map((habit) => (
        <HabitContainer key={habit.id}>
          <p>{habit.name}</p>
          <WeekDaysContainer>
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
              <WeekDay key={index} selected={habit.days.includes(index)}>
                {day}
              </WeekDay>
            ))}
          </WeekDaysContainer>
        </HabitContainer>
      ))}
    </ContainerHabito>
  );
}

Habito.propTypes = {
  token: PropTypes.string.isRequired,
};

const ContainerHabito = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* margin-bottom: 40px; */
`;

const HabitContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
    margin-bottom: 10px;
  }
`;

const WeekDaysContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const WeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#CFCFCF" : "#fff")};
  font-size: 20px;
  font-family: "Lexend Deca", sans-serif;
  border: 1px solid #d4d4d4;
  color: ${({ selected }) => (selected ? "#fff" : "#dbdbdb")};
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
