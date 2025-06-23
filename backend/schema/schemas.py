from pydantic import BaseModel


class TodoCreate(BaseModel):
    title: str
    description: str

class TodoUpdate(BaseModel):
    title: str
    description: str

class TodoResponse(BaseModel):
    id: int
    title: str
    description: str
    completed: bool

    class Config:
        orm_mode = True

## Register User Schemas

class UserCreate(BaseModel):  
    representative : str
    company : str
    department : str
    postalCode : str  
    address : str
    building : str
    email : str 
    phone : str   
    password : str 
    agree : bool

class UserUpdate(BaseModel):
    representative : str
    company : str
    department : str
    postalCode : str  
    address : str
    building : str
    email : str 
    phone : str   
    password : str 

class UserResponse(BaseModel):
    id: int
    representative : str
    company : str
    department : str
    postalCode : str  
    address : str
    building : str
    email : str 
    phone : str   
    password : str

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: str
    password: str

class LgoinResponse(BaseModel):
    id: int
    email: str
    class Config:
        orm_mode = True