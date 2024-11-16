import React, { useContext } from 'react'
import { useRef, useEffect, useState } from 'react'
import { setNewOffset, setZIndex } from '../utils'
import { bodyParser } from '../utils'
import { db } from '../appwrite/databases'
import Spinner from '../icons/Spinner'
import DeleteButton from './DeleteButton'
import { NoteContext } from '../Context/NoteContext'

const NoteCard = ({note}) => {
    
    const {setSelectedNote} = useContext(NoteContext)
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);
    
    // the content displayed in the note 
    const body = bodyParser(note.body)

    // holding the postion of note {x:"",y:""}
    const [position,setPosition] = useState(JSON.parse(note.position))


    // holdig the colors  
    const colors = JSON.parse(note.colors)

    let mouseStartPos = {x:0,y:0}
    const textAreaRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(()=>{
        autoGrow(textAreaRef);
        setZIndex(cardRef.current)
    },[])


    const autoGrow = (textAreaRef) =>{
        const {current} = textAreaRef;

        current.style.height = 'auto';
        current.style.height = current.scrollHeight + "px";
    }


    const mouseDown = (event) =>{
        if(event.target.className === "card-header"){
            
        setZIndex(cardRef.current)
        
        mouseStartPos.x = event.clientX;
        mouseStartPos.y = event.clientY;
        // console.log(event.target)

        setSelectedNote(note);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

    }};

    const mouseMove = (e) =>{
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        // console.log('MouseMoveDir:',mouseMoveDir)
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;


        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)
        // console.log(newPosition)
        setPosition(newPosition)
        


    }
    const mouseUp = () =>{
        document.removeEventListener('mousemove',mouseMove);
        document.removeEventListener('mouseup', mouseUp)
        // getting the new position of our card, in new position variable
        const newPosition = setNewOffset(cardRef.current);

        // calling save data function and specifing the key and payload(value)
        saveData('position',newPosition)


        // db.notes.update(note.$id, {'position': JSON.stringify(newPosition)})
    }

    const saveData = async(key, value) =>{
        const payload = {[key]:JSON.stringify(value)};

        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.log(error)
        }
        setSaving(false);
    }

    const handleKeyUp = async () =>{
        console.log("typing decteted")
        setSaving(true);

        if(keyUpTimer.current){
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(()=>{
            saveData("body", textAreaRef.current.value)
        },3000)
    }

  return (
    <div className='card' 
    ref={cardRef}
    style={{
    backgroundColor:colors.colorBody, 
    left:`${position.x}px`,
    top:`${position.y}px`}
    }>
    
        <div 
        onMouseDown={mouseDown}
        className="card-header"
        style={{backgroundColor:colors.colorHeader}}
        >
            <DeleteButton noteId={note.$id}/>
            {saving && <Spinner />}
        </div>
        <div className='card-body'>
            <textarea 
            onKeyUp={handleKeyUp}
            ref={textAreaRef}
            style={{color:colors.colorText, backgroundColor:colors.colorBody}}
            defaultValue={body}
            onInput={()=>autoGrow(textAreaRef)}
            onFocus={()=>{
                setZIndex(cardRef.current);
                setSelectedNote(note[2]);
            }}
            onDragStart={(event)=>(console.log(event))}
            onDrop={(event)=>(event.preventDefault())}
            ></textarea>
        </div>
    </div>
  )
}

export default NoteCard