from pydantic import BaseModel
from typing import Optional, List

class BusinessBase(BaseModel):
    sr_no: Optional[int] = None
    category: Optional[str] = None
    business_idea: Optional[str] = None
    type: Optional[str] = None
    business_sub_type: Optional[str] = None
    investment_scale: Optional[str] = None
    min_capital_required: Optional[str] = None
    min_people_required: Optional[str] = None
    govt_documents_required: Optional[str] = None
    govt_schemes_applicable: Optional[str] = None
    business_model: Optional[str] = None
    tech_knowledge_required: Optional[str] = None
    degree_qualification: Optional[str] = None
    difficulty_level: Optional[str] = None
    market_potential: Optional[str] = None
    profitability_potential: Optional[str] = None
    scalability: Optional[str] = None

class BusinessResponse(BusinessBase):
    id: int
    class Config:
        from_attributes = True

class BusinessListResponse(BaseModel):
    total: int
    page: int
    limit: int
    data: List[BusinessResponse]