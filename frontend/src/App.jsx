
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import UploadPage from './pages/UploadPage'
import SessionPage from './pages/SessionPage'
import SeperateSummaryPage from './pages/SeperateSummaryPage'
import SeperateFlashcards from './pages/SeperateFlashcards'
import SeperateQuiz from './pages/SeperateQuiz'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster/>
      
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterPage/>}  />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/sessions/:id' element={<SessionPage/>} />
        <Route path='/summary/:id' element={<SeperateSummaryPage/>} />
        <Route path='/flashcards/:id' element={<SeperateFlashcards/>} />
        <Route path='/quiz/:id' element={<SeperateQuiz/>}/>
      </Routes>
    </>
  )
}

export default App
