import requests
import base64
import pandas as pd
client_id = "4597701f735a44b88f24809035b0f080"
client_secret = "d6a92546ce3c4af5b5e85f2cc3b4c83e"

spotify_url = "https://accounts.spotify.com/api/token"
auth_str = f"{client_id}:{client_secret}"
base64_auth_str = base64.b64encode(auth_str.encode()).decode()

headers = {
    "Authorization": f"Basic {base64_auth_str}",
}
def getToken():
    # Set the data for the POST request
    data = {
        "grant_type": "client_credentials",
    }

    res = requests.post(spotify_url, headers=headers, data=data).json()
    return res.get("access_token")


def getAlbumImg(token, album):
    res = requests.get(f"https://api.spotify.com/v1/albums/{album}", headers={
        "Authorization": f"Bearer {token}"
    })
    print(res.json()['images'][0]['url'])



getAlbumImg(getToken(), "7dxKtc08dYeRVHt3p9CZJn")