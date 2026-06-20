from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.business import Business

router = APIRouter()

@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    results = (
        db.query(Business.category, func.count(Business.id).label("total"))
        .group_by(Business.category)
        .order_by(func.count(Business.id).desc())
        .all()
    )
    return [{"category": r.category, "total_ideas": r.total} for r in results]

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return {
        "total_businesses": db.query(Business).count(),
        "total_categories": db.query(Business.category).distinct().count(),
        "easy_count": db.query(Business).filter(Business.difficulty_level == "Easy").count(),
        "hard_count": db.query(Business).filter(Business.difficulty_level == "Hard").count(),
        "micro_investment_count": db.query(Business).filter(Business.investment_scale == "Micro / Low").count(),
    }