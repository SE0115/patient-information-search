import React from "react";
import styled from "styled-components";

function PatientDetail({ setModal }) {
  return (
    <Background onClick={() => setModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>모달창</Modal>
    </Background>
  );
}

export default PatientDetail;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #21212180;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 80%;
  height: 90%;
  background-color: #fff;
  border-radius: 15px;
  pointer-events: none;
`;
