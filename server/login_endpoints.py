from fastapi import HTTPException,Request,Depends
from all_endpoints import app,db,User,LoginUser,key
import jwt
import bcrypt


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


