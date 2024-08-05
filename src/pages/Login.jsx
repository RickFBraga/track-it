import styled from "styled-components";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  function sendToSingUp() {
    navigate("/cadastro");
  }

  function loginAccount(e) {
    setDisabled(false);

    e.preventDefault();

    const noEmpty = (...values) => values.every((value) => value.trim() !== "");

    if (!noEmpty(email, password)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    const body = { email, password };

    axios
      .post(URL, body)
      .then((res) => {
        const image = res.data.image;
        const user = { email, image };
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("login", JSON.stringify(user));
        setToken(res.data.token);
        if (res.data !== 'Campo "body" inválido') {
          setDisabled(true);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      })
      .catch((err) => alert(err.response.data.message), setDisabled(false));
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

        <Button type="submit" disabled={disabled} onClick={loginAccount}>
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
            "Entrar"
          )}
        </Button>
      </FormContainer>

      <SingIn onClick={sendToSingUp}>Não tem uma conta? Cadastre-se!</SingIn>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func,
};

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
  font-family: Lexend Deca;
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

const SingIn = styled.p`
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
