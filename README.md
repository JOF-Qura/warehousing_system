# FastAPI practice
Just started learning/practicing FastAPI

# To Run
1. Create virtual environment
    - `python -m venv venv`
    - `venv\scripts\activate`
2. Install dependencies
    - `pip install -r requirements.txt`
3. Run migration
    - `alembic upgrade head`
4. Run server
    - `uvicorn main:app --reload`

# Routes
|     Path     |   Method   |
|--------------|------------|
| /            |   GET      |
| /users       |   GET      | 
| /users/{id}  |   GET      | 
| /users/{id}  |   POST     | 
| /users/{id}  |   PUT      | 
| /users/{id}  |   DELETE   | 