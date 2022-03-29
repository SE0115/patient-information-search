import React from "react";
import styled from "styled-components";

function PatientDetail({ setModal, selected }) {
  const { conditionList, visitCount } = selected;
  return (
    <Background onClick={() => setModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <section>
          <div className="title">진단 정보</div>
          <ul>
            {conditionList.map((x, idx) => (
              <li key={idx}>
                {idx + 1}. {x}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="title">전체 방문 수</div>
          <div>{visitCount}</div>
        </section>
      </Modal>
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
  gap: 50px;
  justify-content: space-around;
  align-items: flex-start;
  position: relative;
  width: 50%;
  padding: 50px;
  background-color: #fff;
  border-radius: 15px;
  pointer-events: none;

  section {
    display: flex;
    flex-direction: column;
    .title {
      font-weight: 700;
      font-size: 20px;
    }
    gap: 10px;
  }
`;
