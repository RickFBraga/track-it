import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DailyTasks from "../components/DailyTasks";
import "dayjs/locale/pt-br";
import { Main } from "../GlobalStyle";

export default function Hoje({ token }) {
  const [dailyTasks, setDailyTasks] = useState([]);
  dayjs.locale("pt-br");
  const today = dayjs().format("dddd, DD/MM");
  console.log(today);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        config
      )
      .then((res) => setDailyTasks(res.data))
      .catch((err) => console.log(err.response.data));
  }, [token]);

  const handleCheck = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      )
      .then(() => {
        setDailyTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  done: true,
                  currentSequence: task.currentSequence + 1,
                  highestSequence: Math.max(
                    task.currentSequence + 1,
                    task.highestSequence
                  ),
                }
              : task
          )
        );
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleUncheck = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      )
      .then(() => {
        setDailyTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  done: false,
                  currentSequence: task.currentSequence - 1,
                }
              : task
          )
        );
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div>
      <Header />
      <Main>
        <WeekDay>
          <DataTitle>{today}</DataTitle>
        </WeekDay>
        {dailyTasks.map((task) => (
          <DailyTasks
            key={task.id}
            task={task}
            onCheck={() => handleCheck(task.id)}
            onUncheck={() => handleUncheck(task.id)}
          />
        ))}
      </Main>
      <Footer />
    </div>
  );
}

Hoje.propTypes = {
  token: PropTypes.string.isRequired,
};

const DataTitle = styled.p`
  padding-left: 10px;
  margin-top: 70px;
`;

const WeekDay = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  p {
    color: #126ba5;
    font-size: 23px;
    font-family: Lexend Deca;
  }
`;
