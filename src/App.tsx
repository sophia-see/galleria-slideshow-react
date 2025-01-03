import { RxTrackNext } from 'react-icons/rx'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Art from './components/Art/Art'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art/:id" element={<Art />} />\
        <Route path="*" element={<></>} />     
      </Routes>   
    </BrowserRouter>
  )
}

export default App
