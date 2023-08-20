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
    const randomNum = Math.floor(Math.random()*albumNum) 
    const albumsQuery = query(albumCollectionsRef, where("pos", "==", randomNum),limit(1)); // Limit the query to 1 album
    const data = await getDocs(albumsQuery)
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filteredData
  }

  return (
    <div className="App">
      {/* <Auth/> */}
      <h1>Score: {score?score:0}</h1>
      {<DisplayAlbum albumList={albumList} score={score} setScore={setScore}/>}
    </div>
  );
}

export default App;
