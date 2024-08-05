import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  function createAccount(e) {
    e.preventDefault();

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const body = { email, name, image, password };

    setDisabled(false);

    const noEmpty = (...values) => values.every((value) => value.trim() !== "");

    if (!noEmpty(email, name, image, password)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    axios
      .post(URL, body)
      .then((res) => {
        if (res.data !== 'Campo "body" inválido') {
          setDisabled(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => alert(err.response.data.message), setDisabled(false));
  }

  // https://storyset.com/illustration/muslim-graduation/amico

  function sendToLoginPage() {
    navigate("/");
  }

  return (
    <Container>
      <LogoContainer>
        <img src={Logo} alt="" />
      </LogoContainer>

      <FormContainer action="">
        <Input
          type="email"
          placeholder="email"
          required
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="senha"
          required
          disabled={disabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="nome"
          required
          disabled={disabled}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="foto"
          required
          disabled={disabled}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" disabled={disabled} onClick={createAccount}>
          {disabled ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#FFF"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </FormContainer>

      <SingUp onClick={sendToLoginPage}>Já tem uma conta? Faça login!</SingUp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LogoContainer = styled.div`
  margin-top: 70px;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 32px;
  gap: 6px;
`;

const Input = styled.input`
  width: 295px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  font-family: Lexend Deca;
  font-size: 20px;
  padding-left: 10px;

  &::placeholder {
    color: #dbdbdb;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #afafaf;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background-color: #52b6ff;
  width: 309px;
  height: 45px;
  border-radius: 5px;
  border: none;
  font-family: "Lexend Deca", sans-serif;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3b95d6;
    transition: 0.4s;
  }

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
  }
`;

const SingUp = styled.p`
  margin-top: 25px;
  color: #52b6ff;
  font-family: Lexend Deca;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #48a2e2;
  }
`;
