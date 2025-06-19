import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TableFuncionario } from './components/TableFuncionario/TableFuncionario'
import { TableContador } from './components/TableContador/TableContador'
import { TableSalario } from './components/TableSalario/TableSalario'
import { TableContracheque } from './components/TableContracheque/TableContracheque'
import { TableEmpregador } from './components/TableEmpregador/TableEmpregador'
import { Login } from './pages/login/Login'
import { Home } from './pages/inicio/Home'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />}>
          <Route path="funcionarios" element={
            <>
              <h2>Consulta de Funcionários</h2>
              <TableFuncionario />
            </>
          } />
          <Route path="contadores" element={
            <>
              <h2>Consulta de Contadores</h2>
              <TableContador />
            </>
          } />
          <Route path="tabelaSalario" element={
            <>
              <h2>Tabela Salário</h2>
              <TableSalario />
            </>
          } />
          <Route path="contracheques" element={
            <>
              <h2>Consulta de Contracheques</h2>
              <TableContracheque />
            </>
          } />
          <Route path="empregadores" element={
            <>
              <h2>Consulta de Empregadores</h2>
              <TableEmpregador />
            </>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App