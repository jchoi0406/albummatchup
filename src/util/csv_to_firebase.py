import firebase_admin
from firebase_admin import credentials, firestore
import csv
cred = credentials.Certificate(r"C:\Users\jiyon\Desktop\Programming_projects\albummatchup\src\util\albummatchup-firebase-adminsdk-dynxq-941af5e015.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

csv_path = r"C:\Users\jiyon\Desktop\Programming_projects\albummatchup\src\util\spotify_data.csv"
with open (csv_path, "r", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        data = {
                'pos': int(row['pos']),
                'album_name': row['album_name'],
                'artist': row['artist'],
                'releasedate': row['releasedate'],
                'avg_rating': float(row['avg_rating']),
                'total_rating': int(row['total_rating']),
                'total_reviews': int(row['total_reviews']),
                'pr_genres': row['pr_genres'],
                'tags': row['tags'],
                'Spotify': row['Spotify'],
                'albumId': row['albumId'],
                'album_imgs': row['album_imgs']
        }
        db.collection("albums").add(data)
        print(f"Added {row['album_name']} By {row['artist']}Rating: {row['avg_rating']}")