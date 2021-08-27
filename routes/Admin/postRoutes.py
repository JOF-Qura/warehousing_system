from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from schemas.Admin.postSchema import CreatePost
from models.Admin.postModel import Post
from database import get_db
from datatables import DataTable

router = APIRouter(
    prefix='/posts',
    tags=['posts']
)

@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        table = DataTable(dict(request.query_params), Post, db.query(Post), [
            'id',
            'title',
            'body'
        ])
    
        return table.json()
    except Exception as e:
        print(e)

