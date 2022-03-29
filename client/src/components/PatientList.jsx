import React, { useState, useContext } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import PatientDetail from "./PatientDetail";
import ConditionBox from "./ConditionBox";
import { PatientInfo } from "./PatientContext";
import Charts from "./Charts";
import axios from "axios";

function PatientList() {
  const [modal, setModal] = useState(false);
  const { patientList } = useContext(PatientInfo);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(10);
  const [selected, setSelected] = useState({});

  return (
    <>
      <ConditionBox />
      <Charts />
      <Main>
        <select
          name="lenPerPage"
          onChange={(e) => setLength(Number(e.target.value))}
          value={length}
        >
          <option value="5">5개씩 보기</option>
          <option value="10">10개씩 보기</option>
          <option value="15">15개씩 보기</option>
          <option value="20">20개씩 보기</option>
        </select>
        <ListBox>
          <PatientEl>
            <div>환자 ID</div>
            <div>생년월일</div>
            <div>나이</div>
            <div>성별</div>
            <div>인종</div>
            <div>민족</div>
            <div>사망 여부</div>
          </PatientEl>
          {patientList
            .slice(length * (page - 1), length * (page - 1) + length)
            .map((x) => (
              <PatientEl
                key={x.personID}
                onClick={(e) => {
                  setModal(true);
                  axios
                    .get(`/api/patient/brief/${e.target.children[0].innerText}`)
                    .then((res) => {
                      setSelected(res.data);
                    });
                }}
              >
                <div>{x.personID}</div>
                <div>{x.birthDatetime.split(" 00:00:00")}</div>
                <div>{x.age}</div>
                <div>{x.gender}</div>
                <div>{x.race}</div>
                <div>{x.ethnicity}</div>
                <div>{String(x.isDeath)}</div>
              </PatientEl>
            ))}
        </ListBox>
        {modal && <PatientDetail setModal={setModal} selected={selected} />}
        <Pagination
          activePage={page}
          itemsCountPerPage={length}
          totalItemsCount={patientList.length}
          onChange={(page) => setPage(page)}
        />
      </Main>
    </>
  );
}

export default PatientList;

const Main = styled.div`
  position: relative;
  padding: 10px 20px;

  select {
    position: absolute;
    right: 20px;
    font-family: "Pretendard-Regular";
  }
`;
const ListBox = styled.ul`
  padding-top: 30px;
`;
const PatientEl = styled.li`
  list-style: none;
  display: flex;

  div {
    text-align: center;
    font-size: 16px;
    padding: 10px 5px;
    width: calc(100% / 7);
    pointer-events: none;
  }

  &:first-child {
    font-weight: 700;
    padding: 5px 0;
  }
  &:not(:first-child):hover {
    background-color: #dedede;
    cursor: pointer;
  }
  & + & {
    border-top: 1px solid #dedede;
  }
`;
