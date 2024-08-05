import styled from "styled-components";
import Header from "../components/Header";
import Plus from "../assets/plus.svg";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Habito from "../components/Habito";
import { Main } from "../GlobalStyle";
import { ThreeDots } from "react-loader-spinner";

export default function Home({ token }) {
  const [addHabito, setAddHabito] = useState(false);
  const [name, setName] = useState("");
  const [days, setDays] = useState(new Array(7).fill(false));
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading

  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

  const handleDayClick = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  const body = {
    name,
    days: days
      .map((selected, index) => (selected ? index : null))
      .filter((day) => day !== null),
  };

  const adicionarHabito = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when saving starts

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(URL, body, config)
      .then((res) => {
        setHabits((prevHabits) => [...prevHabits, res.data]);
        setAddHabito(false);
        setName("");
        setDays(new Array(7).fill(false));
        setLoading(false); // Set loading to false when save completes
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false); // Set loading to false on error
      });
  };

  const addHabitoPage = () => setAddHabito(true);
  const cancelHabitoPage = () => setAddHabito(false);

  return (
    <>
      <Header />
      <Main>
        <Container>
          <AddHabitContainer>
            <span>Meus hábitos</span>
            <AddButton onClick={addHabitoPage} disabled={loading}>
              <img src={Plus} alt="" />
            </AddButton>
          </AddHabitContainer>

          {habits.length === 0 && !addHabito && (
            <TextNoHabit>
              Você não tem nenhum hábito
              <br /> cadastrado ainda. Adicione um hábito para começar a
              trackear!
            </TextNoHabit>
          )}

          {addHabito && (
            <ContainerHabito>
              <Input
                type="text"
                placeholder="nome do hábito"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading} // Disable input when loading
              />
              <WeekDaysContainer>
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                  <WeekDay
                    key={index}
                    selected={days[index]}
                    onClick={() => handleDayClick(index)}
                    disabled={loading} // Disable days when loading
                  >
                    {day}
                  </WeekDay>
                ))}
              </WeekDaysContainer>
              <ButtonContainer>
                <CancelButton onClick={cancelHabitoPage} disabled={loading}>
                  Cancelar
                </CancelButton>
                <SaveButton onClick={adicionarHabito} disabled={loading}>
                  {loading ? (
                    <ThreeDots color="#fff" height={20} width={50} />
                  ) : (
                    "Salvar"
                  )}
                </SaveButton>
              </ButtonContainer>
            </ContainerHabito>
          )}
          <Habito token={token} />
        </Container>
      </Main>
      <Footer />
    </>
  );
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
};

const Container = styled.div`
  padding: 20px;
  margin-top: 65px;
`;

const ContainerHabito = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
`;

const AddHabitContainer = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: #126ba5;
    font-size: 23px;
    font-family: Lexend Deca;
  }
`;

const TextNoHabit = styled.p`
  color: #666666;
  font-size: 18px;
  font-family: Lexend Deca;
  margin-top: 25px;
`;

const AddButton = styled.button`
  width: 40px;
  height: 35px;
  border: none;
  background-color: #52b6ff;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const WeekDaysContainer = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 3px;
`;

const WeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#CFCFCF" : "#fff")};
  font-size: 20px;
  font-family: "Lexend Deca";
  border: 1px solid #d4d4d4;
  color: ${({ selected }) => (selected ? "#fff" : "#dbdbdb")};
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Input = styled.input`
  height: 45px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 20px;
  color: #666666;

  &::placeholder {
    color: #d4d4d4;
    font-family: "Lexend Deca";
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: end;
  gap: 5px;
`;

const CancelButton = styled.button`
  color: #52b6ff;
  background-color: #fff;
  width: 84px;
  height: 35px;
  font-family: "Lexend Deca";
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SaveButton = styled.button`
  color: #fff;
  width: 84px;
  height: 35px;
  background-color: #52b6ff;
  border-radius: 5px;
  font-family: "Lexend Deca";
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#52b6ff" : "#3b95d6")};
    transition: 0.4s;
  }
`;
