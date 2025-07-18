import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoProducto } from "./components/NuevoProducto"
import { ConsultarProducto } from "./components/ConsultarProducto"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Lista/>} />
          <Route path="/nuevoproducto" element={<NuevoProducto/>} />
          <Route path="/consultarproducto/:id" element={<ConsultarProducto/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
