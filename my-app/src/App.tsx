import './App.css'
import Alumnos from './components/Alumnos'
// import { BrowserRouter ,Link } from 'react-router'

function App() {


  return (
    <div className='app'>
    {/* <BrowserRouter>

        <div className='contenedorRegistros'>
            <h1>Menu de registros</h1>
            <Link to='alumnos' onClick={()=><Alumnos />}>Alumnos</Link>
        </div>
    
    </BrowserRouter > */}
      
      <Alumnos />
    </div>
  );
}

export default App;
