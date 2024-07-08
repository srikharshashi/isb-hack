from fastapi import FastAPI,HTTPException,Request,Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials,firestore
import jwt
import bcrypt

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

@app.get("/check-cookie")
async def check_cookie(request:Request):
    try:
        token=request.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401,detail="Not a valid user according to cookies")
        decoded_token=jwt.decode(token,key,algorithms=["HS256"])
        id=decoded_token["id"]
        doc=db.collection("users").document(id)
        data=doc.get()
        if data.exists:
            return {"validity":True}
        else:
            return {"validity":False}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,detail="Something went wrong while checking cookies")


@app.post("/login-user")
async def login_user(user:LoginUser):
    try:
        docs=None
        token=""
        validated=False
        if "@" in user.identifier:
            docs=db.collection("users").where("email","==",user.identifier)
        else:
            docs=db.collection("users").where("username","==", user.identifier)
        result=docs.stream()
        for doc in result:
            data=doc.to_dict()
            if(data["password"]==user.password):
                token=jwt.encode({"id":doc.id},key,algorithm="HS256")
                validated = True
                break
        if validated:
            return {"token":token}
        else:
            raise HTTPException(status_code=404,detail="Valid user could not be found")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,detail="Login could not be completed")


@app.post("/create-user")
async def create_user(user:User):
    try:
        if "@" in user.username:
            raise Exception("Username has @ character")
        doc=db.collection('users').document()
        doc.set(user.dict())
        return "User was successfully created"
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="User could not be created")

@app.get("/test")
async def test_endpoint():
    print("Hitting the test endpoint")
    return "This is just a test"
