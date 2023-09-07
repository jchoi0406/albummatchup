import React, { useEffect, useTransition } from "react";
import vinyl from "../images/vinyl.png"
import { useState } from "react";
export const DisplayAlbum = (props) => {
    const delayTime = 1500;  // delay before next albums are requested
    const [scoreVisible, setScoreVisibile] = useState(false);  // for the 'right' album to hide rank
    const [dummyScore, setDummyScore] = useState(0);  // dummy score is for the rank animation
    const animationDuration = 1000;  // 1 second
    function handleScore(selectedAlbum){
        if (props.albumList){
            const leftAlbum = props.albumList[0];
            const rightAlbum = props.albumList[1];
            scoreAnimation(rightAlbum.pos)  // start score animation
            setScoreVisibile(true);  // set rank visible
            const timer = setTimeout(()=>{  // delay before next albums
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
      const increment = Math.ceil(score / animationSteps);  // score increment needs to be an integer greater than 0
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
    } 


    return (
      <div className={props.isPhone ? 'flex flex-col justify-center items-center min-h-screen' :'flex flex-row justify-start'}>
        {props.albumList &&
          props.albumList.map((alb, index) => (
            <div className="cursor-pointer" key={alb?.id} onClick={() => index === 0 ? handleScore("left") : handleScore("right")}>
              <div className="relative">
                <img className={`${props.imgDimension}transition duration-300 filter brightness-75`} src={alb && alb?.album_imgs === "no-img" ? vinyl : alb?.album_imgs} alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-10 border-black bg-white rounded-lg p-2 flex flex-col justify-center items-center">  
                    <h1 className="font-roboto font-bold text-sm sm:text-base md:text-2xl">{alb?.album_name}</h1>
                    <h2 className="font-roboto font-semibold text-2rem">{alb?.artist}</h2>
                    <h1 className="font-roboto font-semibold">{index === 0 ? `Rank: ${alb.pos}` : ""}</h1>
                    <h1 className={`font-semibold transition-opacity duration-${animationDuration} ease-in-out ${scoreVisible?'opacity-1':'opacity-0'}`}>{index === 1 ? `Rank: ${dummyScore}` : ""}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }