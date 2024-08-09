import './App.css'
import AddNotes from './components/notes/addNotes'
import Notes from './components/notes/notes'

function App() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: 'center'
    }}>
      <AddNotes/>
      <Notes/>
    </main>
  )
}

export default App
