export const setNewOffset = (card, mouseMoveDir={x:0,y:0}) => {
    const OffsetLeft = card.offsetLeft - mouseMoveDir.x;
    const OffsetTop = card.offsetTop - mouseMoveDir.y;
    // console.log(OffsetLeft, OffsetTop)

    return({
        x: OffsetLeft < 0 ? 0 : OffsetLeft>1110 ? 1110 : OffsetLeft,
        y: OffsetTop  < 0 ? 0 : OffsetTop>1110 ? 1110 : OffsetTop,
    })
}


export const setZIndex = (selectedCard) =>{
    selectedCard.style.zIndex = 999;
    
    Array.from(document.getElementsByClassName('card')).map((card)=>{
        if(card !== selectedCard){
            card.style.zIndex = selectedCard.style.zIndex-1;
        }
    })
}


export const bodyParser = (value)=>{
    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}