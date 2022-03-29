import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { PatientInfo } from "./PatientContext";

function ConditionBox() {
  const [order, setOrder] = useState("birth");
  const [isDesc, setIsDesc] = useState(false);
  const [genderList, setGenderList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [ethnicityList, setEthnicityList] = useState([]);
  const [filterCond, setFilterCond] = useState({
    gender: "",
    race: "",
    ethnicity: "",
    death: "",
  });

  useEffect(() => {
    axios.get(`/api/gender/list`).then((res) => {
      setGenderList(res.data.genderList);
    });
    axios.get(`/api/race/list`).then((res) => {
      setRaceList(res.data.raceList);
    });
    axios.get(`/api/ethnicity/list`).then((res) => {
      setEthnicityList(res.data.ethnicityList);
    });
  }, []);

  const { originList, setPatientList } = useContext(PatientInfo);

  useEffect(() => {
    let plusUrl = "";
    Object.keys(filterCond).map((x) => {
      if (filterCond[x] !== "") {
        plusUrl += `&${x}=${filterCond[x]}`;
      }
    });
    axios
      .get(
        `/api/patient/list?order_column=${order}&order_desc=${isDesc}${plusUrl}`
      )
      .then((res) => {
        setPatientList(res.data.patient.list);
      });
  }, [order, isDesc]);

  return (
    <Container>
      <Condition>
        <div>정렬 기준</div>
        <label htmlFor="person_id">
          <input
            type="radio"
            id="person_id"
            checked={order === "person_id"}
            onChange={() => setOrder("person_id")}
          />
          환자 ID
        </label>
        <label htmlFor="birth">
          <input
            type="radio"
            id="birth"
            checked={order === "birth"}
            onChange={() => setOrder("birth")}
          />
          생년월일
        </label>
        <label htmlFor="asc">
          <input
            type="radio"
            id="asc"
            checked={isDesc === false}
            onChange={() => setIsDesc(false)}
          />
          오름차순
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            id="desc"
            checked={isDesc === true}
            onChange={() => setIsDesc(true)}
          />
          내림차순
        </label>
      </Condition>
      <Condition>
        <div>필터 조건</div>
        <select
          name="gender"
          onChange={(e) =>
            setFilterCond({
              ...filterCond,
              gender: e.target.value,
            })
          }
          value={filterCond.gender}
        >
          <option value="">성별</option>
          {genderList.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          name="race"
          onChange={(e) =>
            setFilterCond({
              ...filterCond,
              race: e.target.value,
            })
          }
          value={filterCond.race}
        >
          <option value="">인종</option>
          {raceList.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          name="ethnicity"
          onChange={(e) =>
            setFilterCond({
              ...filterCond,
              ethnicity: e.target.value,
            })
          }
          value={filterCond.ethnicity}
        >
          <option value="">민족</option>
          {ethnicityList.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          name="isDeath"
          onChange={(e) =>
            setFilterCond({
              ...filterCond,
              death: e.target.value,
            })
          }
          value={filterCond.death}
        >
          <option value="">사망여부</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <button
          onClick={() => {
            let plusUrl = "";
            Object.keys(filterCond).map((x) => {
              if (filterCond[x] !== "") {
                plusUrl += `&${x}=${filterCond[x]}`;
              }
            });
            axios
              .get(
                `/api/patient/list?order_column=${order}&order_desc=${isDesc}${plusUrl}`
              )
              .then((res) => {
                setPatientList(res.data.patient.list);
              });
          }}
        >
          필터 적용
        </button>
        <button
          onClick={() => {
            setFilterCond({
              gender: "",
              race: "",
              ethnicity: "",
              isDeath: "",
            });
            setOrder("birth");
            setIsDesc(false);
            setPatientList(originList);
          }}
        >
          초기화
        </button>
      </Condition>
    </Container>
  );
}

export default ConditionBox;

const Container = styled.div`
  width: fit-content;
  margin: 10px auto;
`;
const Condition = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  div {
    margin-right: 20px;
    font-weight: 700;
  }
  input {
    margin-right: 5px;
  }
  select {
    margin-right: 10px;
  }
  label + label {
    margin-left: 10px;
  }
  button {
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #1c263b;
    color: #fff;
  }
`;
