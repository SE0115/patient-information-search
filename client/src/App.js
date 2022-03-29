import "./reset.css";
import "./App.css";
import PatientList from "./components/PatientList";
import PatientContext from "./components/PatientContext";

function App() {
  return (
    <div className="App">
      <PatientContext>
        <PatientList />
      </PatientContext>
    </div>
  );
}

export default App;
