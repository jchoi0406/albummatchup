import { useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import { getDocs, collection, query, limit, where} from 'firebase/firestore';
import vinyl from "./images/vinyl.png"
function App() {
  const[albumList, setAlbumList] = useState([]);
  const albumCollectionsRef = collection(db, "albums");
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
  
  async function getRandomRow(){
    const randomNum = Math.floor(Math.random()*2000)
    const albumsQuery = query(albumCollectionsRef, where("pos", "==", randomNum),limit(1)); // Limit the query to 1 album
    const data = await getDocs(albumsQuery)
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filteredData
  }
  const displayAlbum = () =>{
    return(
      
      <div>
            <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
        {albumList.map((alb)=>(
          <div>
            <h1>
              {alb?.album_name}
            </h1>
            <img className="w-[10vw]"src={alb.album_imgs} alt={vinyl}></img>
            <h2>
              {alb?.artist}
            </h2>
            <h3>
              {alb?.avg_rating}
            </h3>

          </div>

        ))}
      </div>

      
    )
  }
  return (
    <div className="App">
      <Auth/>
      <button onClick={getAlbumList}>Matchup!</button>
      {displayAlbum()}
    </div>
  );
}

export default App;
