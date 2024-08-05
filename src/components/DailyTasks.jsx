import styled from "styled-components";
import Check from "../assets/check.svg";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DailyTasks({ task, onCheck, onUncheck }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const [dailySequence, setDailySequence] = useState(task.currentSequence);
  const [highestSequence, setHighestSequence] = useState(task.highestSequence);

  const handleClick = () => {
    if (isChecked) {
      onUncheck();
      setIsChecked(false);
      setDailySequence(dailySequence - 1);
    } else {
      onCheck();
      setIsChecked(true);
      setDailySequence(dailySequence + 1);
      if (dailySequence + 1 > highestSequence) {
        setHighestSequence(dailySequence + 1);
      }
    }
  };

  return (
    <Teste>
      <ContainerHabito>
        <div>
          <h2>{task.name}</h2>
          <span>Sequencia atual: {dailySequence} dias</span>
          <br />
          <span>Seu recorde: {highestSequence} dias</span>
        </div>
        <Button checked={isChecked} onClick={handleClick}>
          <img src={Check} alt="" />
        </Button>
      </ContainerHabito>
    </Teste>
  );
}

DailyTasks.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentSequence: PropTypes.number.isRequired,
    highestSequence: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
};

const Teste = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerHabito = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 303px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
    margin-bottom: 10px;
    font-weight: 400;
  }
  span {
    color: #666666;
    font-family: "Lexend Deca", sans-serif;
    font-size: 13px;
  }
`;

const Button = styled.button`
  width: 70px;
  height: 70px;
  background-color: ${({ checked }) => (checked ? "#8FC549" : "#ebebeb")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  cursor: pointer;
`;
