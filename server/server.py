import uvicorn
from socket_comm import socket_app
if __name__ == "__main__":
    uvicorn.run("socket_comm:socket_app", host="127.0.0.1", port=8080, reload=True)