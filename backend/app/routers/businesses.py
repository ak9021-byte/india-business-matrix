from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from app.database import get_db
from app.models.business import Business
from app.schemas.business import BusinessListResponse, BusinessResponse

router = APIRouter()

@router.get("/", response_model=BusinessListResponse)
def get_businesses(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    category: Optional[str] = None,
    difficulty_level: Optional[str] = None,
    investment_scale: Optional[str] = None,
    market_potential: Optional[str] = None,
):
    query = db.query(Business)
    if search:
        query = query.filter(
            or_(
                Business.business_idea.ilike(f"%{search}%"),
                Business.category.ilike(f"%{search}%"),
            )
        )
    if category:
        query = query.filter(Business.category == category)
    if difficulty_level:
        query = query.filter(Business.difficulty_level == difficulty_level)
    if investment_scale:
        query = query.filter(Business.investment_scale == investment_scale)
    if market_potential:
        query = query.filter(Business.market_potential == market_potential)

    total = query.count()
    businesses = query.offset((page - 1) * limit).limit(limit).all()
    return {"total": total, "page": page, "limit": limit, "data": businesses}

@router.get("/{business_id}", response_model=BusinessResponse)
def get_business(business_id: int, db: Session = Depends(get_db)):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business