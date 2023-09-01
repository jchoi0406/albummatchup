import React from "react";
import { Auth } from '../components/auth';
import { db } from '../config/firebase';
import { getDocs, collection, query, limit, where} from 'firebase/firestore';
import { DisplayAlbum } from '../components/Album';
import { useEffect, useState } from 'react';

export default function Play(props){
    const[albumList, setAlbumList] = useState([]);
    const albumCollectionsRef = collection(db, "albums");
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(null);
    let prevAlbumNum = null;
    const imgDimension = props.isPhone ? "w-[100vw]":"w-[50vw] h-auto"; // heights and widths for images depending on phone or not.
    const scoreDimension = props.isPhone ? "w-[15vw] h-[15vw]":"w-[5vw] h-[5vw]"; // heights and widthd for score depending on phone or not.
    const correctColor = correct ? "bg-green-500": "bg-red-500"; // change score background color

    useEffect(()=>{ // for getting albums from the database
      const getAlbumList = async() =>{
        //READ DATA FROM DB
        try {
          let album1;
          let album2;
  
          if (!correct){
            album1 = await getRandomRow();
            album2 = await getRandomRow();
          }
          else{
            album1 = [albumList[1]];
            album2 = await getRandomRow();
          }
          setAlbumList([album1[0], album2[0]])
  
  
        } catch (err) {
          console.log(err);
        }
      };
      getAlbumList();
    }, [score])
    
    async function getRandomRow(){
      const albumNum = 500;
      let randomNum;
      do{
        randomNum = Math.floor(Math.random()*albumNum)+1;
      }while (randomNum == prevAlbumNum);
      prevAlbumNum = randomNum;
      const albumsQuery = query(albumCollectionsRef, where("pos", "==", randomNum),limit(1)); // Limit the query to 1 album
      const data = await getDocs(albumsQuery)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return filteredData
    }
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <Auth/> */}
        {<DisplayAlbum albumList={albumList} setAlbumList={setAlbumList} score={score} setScore={setScore} setCorrect={setCorrect} imgDimension={imgDimension} isPhone={props.isPhone}/>}
        <div className={`${scoreDimension} flex flex-col justify-center text-center rounded-full absolute ${correct === null ? "bg-white": correctColor} text-black text-3xl transition-colors duration-500`}>
          {score === null ? 0:score}
        </div>
      </div>
  
    );
}