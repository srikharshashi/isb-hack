from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials,firestore


#chat-app-b8618-firebase-adminsdk-7cy3e-977d7ed2f2

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


key = "ThiscannotBecracked01651651JustKidding!!!!!"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    username: str
    password: str

class LoginUser(BaseModel):
    identifier: str
    password: str

import login_endpoints