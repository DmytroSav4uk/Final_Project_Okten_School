import {Navigate, Route, Routes} from "react-router-dom";

import {LoginComponent} from "./Components/LoginRegister/LoginComponent";
import {RegisterComponent} from "./Components/LoginRegister/RegisterComponent";
import {ChooserComponent} from "./Components/LoginRegister/ChooserComponent";
import {TableComponent} from "./Components/TableComponent";

function App() {

    return (
        <div>
            <Routes>
                <Route path={'/getStarted'} element={<ChooserComponent/>}/>
                <Route path={'/login'} element={<LoginComponent/>}/>
                <Route path={'/register'} element={<RegisterComponent/>}/>
                <Route path={'/tables'} element={<TableComponent/>}/>
                <Route path="" element={<Navigate to="/getStarted" />} />
            </Routes>
        </div>
    );
}

export default App;
