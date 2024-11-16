import { createContext,useEffect, useState} from 'react'
import Spinner from '../icons/Spinner'
import { db } from '../appwrite/databases'


export const NoteContext = createContext();



const NoteProvider = ({children}) =>{
  // loading is a state for loading data
  const [loading,setLoading] = useState(true);

  // notes is the main state holding all the notes
  const [notes,setNotes] = useState([]);

  // to select the current note 
  const [selectedNote, setSelectedNote] = useState(null);

  // using useEffect to call intilizing function
  useEffect(()=>{
    init();
  },[])   
  
// connection to the database and and getting response data
  const init = async()=>{
    const response = await db.notes.list()
    setNotes(response.documents)
    setLoading(false);
  };



  const contextData = { notes, setNotes, selectedNote, setSelectedNote}

  return (
    <NoteContext.Provider value={contextData}>
    {loading?<div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}>
                    <Spinner size="100" color='white' />
                </div>:children}
  </NoteContext.Provider>)
}

export default NoteProvider;