import React from 'react'
import { useContext } from 'react'
import { NoteContext } from '../Context/NoteContext'
import { db } from '../appwrite/databases'


const Color = ({color}) => {

    const {selectedNote,notes,setNotes} = useContext(NoteContext)

    const changeColor = () =>{
        
        
        try {
            // const updatedNote = notes.map((note)=>
            //   (note.$id===selectedNote.$id)?
            // {...note,colors:JSON.stringify(color)}:
            // note)
            // setNotes(updatedNote)
            // db.notes.update(selectedNote.$id,{colors:JSON.stringify(color)})

            const currentNoteIndex = notes.findIndex(
              (note) => note.$id === selectedNote.$id
          );
   
          const updatedNote = {
              ...notes[currentNoteIndex],
              colors: JSON.stringify(color),
          };
   
          const newNotes = [...notes];
          newNotes[currentNoteIndex] = updatedNote;
          setNotes(newNotes);
   
          db.notes.update(selectedNote.$id, {
              colors: JSON.stringify(color),
          });

        } catch (error) {
            alert("you must select Note")
        }

    }


  return (
    <div 
    onClick={changeColor}
    className='color'
    style={{backgroundColor:color.colorHeader}}
    >

    </div>
  )
}

export default Color