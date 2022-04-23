import { useAppContext } from "../context/appcontext";
import classes from './pagecontainer.module.css'

export default function PageContainer(){

  const {numOfPages,page,changePage}=useAppContext();

  const pages =Array.from({length:numOfPages}, (v, i) =>{return i+1});

  const leftPage=()=>{
      console.log("right");
      let newPage =page+1
      if(newPage > numOfPages){
          newPage = numOfPages
      }
      changePage(newPage)
  }

  const rightPage=()=>{
    console.log("left");
    let newPage =page-1
    if(newPage < 1){
        newPage = numOfPages
    }
    changePage(newPage)
}
    return(
        <div className={classes.pageCont}>
            <button className={classes.rgtbtn} onClick={rightPage}> {` << right `}  </button>
            <div>{pages.map((num,i)=>{
                  return    <button style={num ===page ?{backgroundColor:'blueviolet'}:{backgroundColor:'rgb(155, 250, 184)'}} key={i}
                  onClick={()=>changePage(num)}>{num}</button>     
            })}</div>
            <button className={classes.leftbtn}  onClick={leftPage}>{`left >>`} </button>
        </div>
    )
}