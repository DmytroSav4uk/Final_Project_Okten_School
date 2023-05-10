import {Navigate, Route, Routes} from "react-router-dom";

import {GetStartedComponent} from "./components/GetStartedComponent/GetStarted";
import {TableComponent} from "./components/TableComponent/TableComponent";
import {AdminComponent} from "./components/AdminComponent/AdminComponent";
import {UserActivateComponent} from "./components/UserActivateComponent/UserActivateComponent";

const App = () => (
    <div>
        <Routes>
            <Route path={'/getStarted'} element={<GetStartedComponent/>}/>
            <Route path={'/tables'} element={<TableComponent/>}/>
            <Route path={'/admin'} element={<AdminComponent/>}/>
            <Route path={'/admin/activate/:token'} element={<UserActivateComponent/>}/>
            <Route path="" element={<Navigate to="/getStarted"/>}/>
        </Routes>
    </div>
);

export default App;
