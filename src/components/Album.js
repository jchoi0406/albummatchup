import React from "react";
import vinyl from "../images/vinyl.png"

export const DisplayAlbum = (props) => {
    const delayTime = 500;
    function handleScore(selectedAlbum){
        if (props.albumList){
            const leftAlbum = props.albumList[0];
            const rightAlbum = props.albumList[1];
            const timer = setTimeout(()=>{
              if (selectedAlbum === "left" && leftAlbum.pos < rightAlbum.pos){
                  props.setScore((prev)=>prev+1)
                  props.setCorrect(true);

              }
              else if (selectedAlbum === "right" && rightAlbum.pos < leftAlbum.pos){
                  props.setScore((prev)=>prev+1);
                  props.setCorrect(true);
              }
              else{
                  props.setScore((prev)=>prev===0 ? null: 0);
                  props.setCorrect(false);
              }
              }, delayTime)

        }

    }
    return (
      <div className={props.isPhone ? 'flex flex-col justify-center min-h-screen' :'flex flex-row justify-start'}>
        {console.log(props.isPhone)}
        {props.albumList &&
          props.albumList.map((alb, index) => (
            <div className="border-2 cursor-pointer" key={alb?.id} onClick={() => index === 0 ? handleScore("left") : handleScore("right")}>
              <div className="relative">
                <img className={`${props.imgDimension}transition duration-300 filter brightness-75`} src={alb && alb?.album_imgs === "no-img" ? vinyl : alb?.album_imgs} alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-10 border-black bg-white flex flex-col justify-center items-center">
                    <h1 className="font-bold text-sm sm:text-base md:text-2xl">{alb?.album_name}</h1>
                    <h2 className="font-semibold text-2rem">{alb?.artist}</h2>
                    <h1 className="font-semibold">{index === 0 ? `Rank: ${alb.pos}` : ""}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }