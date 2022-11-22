import styled from "styled-components";

export const SuccessWrapper = styled.div`
  border-radius: 20px;
  padding: 3rem;
  border: solid;
  margin-top: 30px;
  margin-bottom: 30px;
  background-image: url(https://images.unsplash.com/photo-1608389168343-ba8aa0cb3a63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 40rem;
  h2 {
    color: #fff;
  }
  button {
    border-radius: 20px;
    background: #ffeb3b;
    border: none;
    &:hover {
      background-color: #dbe3e3;
      color: green;
    }
  }
  .thanks {
    width: 400px;
    height: 400px;
  }
`;
