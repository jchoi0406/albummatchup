import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import { getDocs, collection, query, limit, where} from 'firebase/firestore';
import { DisplayAlbum } from './components/Album';

function App() {
  const[albumList, setAlbumList] = useState([]);
  const albumCollectionsRef = collection(db, "albums");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(null);
  let prevAlbumNum = null;
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 480); // breakpoint width for phones 
  const imgDimension = isPhone ? "w-[100vw] h-[50vh]":"w-[50vw] h-auto"; // heights and widths for images depending on phone or not.
  useEffect(()=>{  // this useEffect is for checking if the user's screen width changes.
    function updateIsPhone(){
      setIsPhone(window.innerWidth<=480);
    }
    window.addEventListener("resize", updateIsPhone);
    return()=>{
      window.removeEventListener("resize", updateIsPhone);
    };

  }, [])
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
          console.log(albumList[1]);
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
      {<DisplayAlbum albumList={albumList} setAlbumList={setAlbumList} score={score} setScore={setScore} setCorrect={setCorrect} imgDimension={imgDimension} isPhone={isPhone}/>}
      <div className='absolute bg-black text-white'>
      {correct !== null ? (correct ? "Correct" : "Incorrect!") : null}
      </div>
    </div>

  );
}

export default App;
