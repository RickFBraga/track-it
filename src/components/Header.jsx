import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const user = useContext(UserContext);
  return (
    <Container>
      <h1>TrackIt</h1>

      <Image src={user.image} alt="" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #126ba5;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  h1 {
    color: #fff;
    font-size: 39px;
    font-family: Playball;
  }

  img {
    background-color: white;
    border-radius: 50%;
    margin-right: 30px;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
`;
