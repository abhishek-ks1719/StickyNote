import React, { useRef } from 'react'
import Plus from '../icons/Plus'
import colors from '../assets/colors.json'
import { db } from '../appwrite/databases'
import {useContext} from "react";
import {NoteContext} from '../Context/NoteContext'



const AddButton = () => {
  const {setSelectedNote,notes,setNotes} = useContext(NoteContext)
  const startingPos = useRef(10);

  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current
      }),
      colors: JSON.stringify(colors[1]),
    }
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState)=>[response,...prevState]);
    
  }

  return (
    <div
      id='add-btn'
      onClick={addNote} >
      <Plus />
    </div>
  )
}

export default AddButton