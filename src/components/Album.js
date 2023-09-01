import React from "react";
import vinyl from "../images/vinyl.png"
import { useState } from "react";
export const DisplayAlbum = (props) => {
    const delayTime = 1500;
    const [scoreVisible, setScoreVisibile] = useState(false);
    const [dummyScore, setDummyScore] = useState(null);
    const animationDuration = 1000;

    function handleScore(selectedAlbum){
        if (props.albumList){
            const leftAlbum = props.albumList[0];
            const rightAlbum = props.albumList[1];
            scoreAnimation(rightAlbum.pos)

            setScoreVisibile(true);
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

              setScoreVisibile(false);
            }, delayTime)
        }

    }
    function scoreAnimation(score){  // animation to reveal the right album.
      const animationSteps = 50;  // number of steps for animation 
      const stepInterval = animationDuration / animationSteps;  // number of 'frames'
      const increment = Math.floor(score / animationSteps);  // score increment floor used so rank is an integer
      let currentScore = 0;
      const animate = () =>{
        if (currentScore < score){  // base case
          setDummyScore(currentScore);
          currentScore += increment;
          setTimeout(animate, stepInterval);  // recursive function
        }
        else{
          setDummyScore(score);  
        }
      }
      animate();
      setScoreVisibile(false);  // set false before reveal
    } 


    return (
      <div className={props.isPhone ? 'flex flex-col justify-center min-h-screen' :'flex flex-row justify-start'}>
        {props.albumList &&
          props.albumList.map((alb, index) => (
            <div className="cursor-pointer" key={alb?.id} onClick={() => index === 0 ? handleScore("left") : handleScore("right")}>
              <div className="relative">
                <img className={`${props.imgDimension}transition duration-300 filter brightness-75`} src={alb && alb?.album_imgs === "no-img" ? vinyl : alb?.album_imgs} alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-10 border-black bg-white flex flex-col justify-center items-center">
                    <h1 className="font-bold text-sm sm:text-base md:text-2xl">{alb?.album_name}</h1>
                    <h2 className="font-semibold text-2rem">{alb?.artist}</h2>
                    <h1 className="font-semibold">{index === 0 ? `Rank: ${alb.pos}` : ""}</h1>
                    {console.log(scoreVisible)}
                    <h1 className={`font-semibold transition-opacity duration-${animationDuration} ease-in-out opacity-${scoreVisible?"100":"0"}`}>{index === 1 ? `Rank: ${dummyScore}` : ""}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }