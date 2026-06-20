from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    sr_no = Column(Integer)
    category = Column(String(255), index=True)
    business_idea = Column(String(500), index=True)
    type = Column(String(100))
    business_sub_type = Column(String(100))
    investment_scale = Column(String(100))
    min_capital_required = Column(String(200))
    min_people_required = Column(String(100))
    govt_documents_required = Column(Text)
    govt_schemes_applicable = Column(Text)
    business_model = Column(String(200))
    tech_knowledge_required = Column(String(100))
    degree_qualification = Column(String(200))
    difficulty_level = Column(String(50), index=True)
    market_potential = Column(String(100), index=True)
    profitability_potential = Column(String(100))
    scalability = Column(String(100))