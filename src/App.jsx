
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from "./pages/user/Login"
import Dashboard from "./pages/Dashboard"
import PageNotFound from './pages/error/PageNotFound'
import Layout from './pages/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Todo from './pages/todos/Todo'
import CreateTicket from './pages/ticket/CreateTicket'
import GetTickets from './pages/ticket/GetTickets'
import UpdateTicket from './pages/ticket/UpdateTicket'
import UnderDevelopment from './pages/error/UnderDevelopment'
import AddApp from './pages/myapps/AddApp'
import Register from './pages/user/Register'
import GetUsers from './pages/user/GetUsers'
import CreateHandover from './pages/handover/CreateHandover'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/infra" element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="/infra/home" element={<Dashboard/>} />
        <Route path="/infra/todos" element={<Todo/>} />

        {/* User Routes */}
        <Route path="/infra/users/register" element={<Register />} />
        <Route path="/infra/users/all" element={<GetUsers />} />

        {/* MyApps Routes */}
        <Route path="/infra/myapps" element={<AddApp/>}></Route>
        
        {/* Ticket Routes */}
        <Route path="/infra/tickets/" element={<GetTickets/>}/>
        <Route path="/infra/tickets/create" element={<CreateTicket/>}/>
        <Route path="/infra/tickets/update" element={<UpdateTicket/>}/>
        <Route path="*" element={<PageNotFound />} />
        <Route path="infra/error/underdevelopment" element={<UnderDevelopment/>} />

        {/* Handover Routes */}
        <Route path="/infra/handover" element={<CreateHandover/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
