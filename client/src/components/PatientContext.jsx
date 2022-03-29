import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PatientInfo = createContext({
  originList: [],
  patientList: [],
  setPatientList: () => {},
});

function PatientContext({ children }) {
  const [originList, setOriginList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/patient/list?order_column=birth&order_desc=false`)
      .then((res) => {
        setPatientList(res.data.patient.list);
        setOriginList(res.data.patient.list);
      });
  }, []);

  return (
    <PatientInfo.Provider value={{ patientList, originList, setPatientList }}>
      {children}
    </PatientInfo.Provider>
  );
}

export default PatientContext;
