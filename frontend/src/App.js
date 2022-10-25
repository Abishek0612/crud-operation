import EmployeeTable from './components/Features/EmployeeTable';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEmployee from './components/Add';
import Edit from './components/Features/Edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route exact path='/home' name='Index Page' element={<EmployeeTable />} />
          <Route exact path='/addNew' name='Index Page' element={<AddEmployee /> } />
          <Route exact path='/edit/:id' name='Index Page' element={<Edit />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
