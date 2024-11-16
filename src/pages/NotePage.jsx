import React from 'react'
import NoteCard from '../Components/NoteCard'
import { useContext } from 'react'
import { NoteContext } from '../Context/NoteContext'
import Controls from '../Components/Controls'
const NotePage = () => { 

  const {notes} = useContext(NoteContext)
  
  return (
    <div>
        {notes ? notes.map((note)=>(
            <NoteCard key={note.$id} note={note} />
            )) : <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>Empty</div>}
            <Controls notes={notes}/>
    </div>
  )
}

export default NotePage