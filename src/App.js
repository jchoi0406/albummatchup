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
  let randomAlbumNum = null;

  useEffect(()=>{
    const getAlbumList = async() =>{
      //READ DATA FROM DB
      try {
        const album1 = await getRandomRow();
        const album2 = await getRandomRow();
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
      randomNum = Math.floor(Math.random()*albumNum);

    }while (randomAlbumNum == randomNum);
    randomAlbumNum = randomNum;
    const albumsQuery = query(albumCollectionsRef, where("pos", "==", randomNum),limit(1)); // Limit the query to 1 album
    const data = await getDocs(albumsQuery)
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filteredData
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <Auth/> */}
      {<DisplayAlbum albumList={albumList} score={score} setScore={setScore} setCorrect={setCorrect}/>}
      <div className='absolute bg-black text-white'>
      {correct !== null ? (correct ? "Correct" : "Incorrect!") : null}
      </div>
    </div>

  );
}

export default App;
