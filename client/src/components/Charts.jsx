import React, { useContext } from "react";
import styled from "styled-components";
import { PatientInfo } from "./PatientContext";
import { PieChart } from "react-minimal-pie-chart";

function Charts() {
  const { patientList } = useContext(PatientInfo);

  return (
    <Container>
      <PChartBox>
        <div className="title">성별 환자 수</div>
        <div className="chart">
          <PieChart
            data={[
              {
                title: "F",
                value: patientList.filter((x) => x["gender"] === "F").length,
                color: "#fc4949",
              },
              {
                title: "M",
                value: patientList.filter((x) => x["gender"] === "M").length,
                color: "#ff9838",
              },
            ]}
            label={({ dataEntry }) => dataEntry.value}
          />
          <Colors>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#fc4949",
                }}
              />
              F
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#ff9838",
                }}
              />
              M
            </div>
          </Colors>
        </div>
      </PChartBox>
      <PChartBox>
        <div className="title">인종별 환자 수</div>
        <div className="chart">
          <PieChart
            data={[
              {
                title: "other",
                value: patientList.filter((x) => x["race"] === "other").length,
                color: "#ff8c2d",
              },
              {
                title: "native",
                value: patientList.filter((x) => x["race"] === "native").length,
                color: "#ffce2e",
              },
              {
                title: "black",
                value: patientList.filter((x) => x["race"] === "black").length,
                color: "#b0d11d",
              },
              {
                title: "white",
                value: patientList.filter((x) => x["race"] === "white").length,
                color: "#8d94f7eb",
              },
              {
                title: "asian",
                value: patientList.filter((x) => x["race"] === "asian").length,
                color: "#9d7af0",
              },
            ]}
            label={({ dataEntry }) => dataEntry.value}
          />
          <Colors>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#ff8c2d",
                }}
              />
              other
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#ffce2e",
                }}
              />
              native
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#b0d11d",
                }}
              />
              black
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#8d94f7eb",
                }}
              />
              white
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#9d7af0",
                }}
              />
              asian
            </div>
          </Colors>
        </div>
      </PChartBox>
      <PChartBox>
        <div className="title">민족별 환자 수</div>
        <div className="chart">
          <PieChart
            data={[
              {
                title: "nonhispanic",
                value: patientList.filter(
                  (x) => x["ethnicity"] === "nonhispanic"
                ).length,
                color: "#82cfcf",
              },
              {
                title: "hispanic",
                value: patientList.filter((x) => x["ethnicity"] === "hispanic")
                  .length,
                color: "#df88d0",
              },
            ]}
            label={({ dataEntry }) => dataEntry.value}
          />
          <Colors>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#82cfcf",
                }}
              />
              nonhispanic
            </div>
            <div className="El">
              <div
                className="color"
                style={{
                  backgroundColor: "#df88d0",
                }}
              />
              hispanic
            </div>
          </Colors>
        </div>
      </PChartBox>
    </Container>
  );
}

export default Charts;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PChartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 10px;
  }
  .chart {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  svg {
    height: 100px;
    width: 100px;
  }
  & + & {
    margin-left: 30px;
  }
`;

const Colors = styled.div`
  .El {
    display: flex;
    align-items: center;
  }
  .color {
    margin-right: 5px;
    width: 10px;
    height: 10px;
  }
`;
