import pandas as pd
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.database import SessionLocal, engine, Base
from app.models.business import Business

Base.metadata.create_all(bind=engine)

EXCEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "India_Business_Strategy_Matrix_v2__1_.xlsx")

COL_MAP = {
    "Sr.No": "sr_no", "Category": "category", "Business Idea": "business_idea",
    "Type": "type", "Business Sub-Type": "business_sub_type",
    "Investment Scale": "investment_scale", "Min Capital Required": "min_capital_required",
    "Min People Required": "min_people_required", "Govt Documents Required": "govt_documents_required",
    "Govt Schemes Applicable": "govt_schemes_applicable", "Business Model": "business_model",
    "Tech Knowledge Required": "tech_knowledge_required", "Degree / Qualification": "degree_qualification",
    "Difficulty Level": "difficulty_level", "Market Potential": "market_potential",
    "Profitability Potential": "profitability_potential", "Scalability": "scalability",
}

def seed():
    print(f"Reading: {EXCEL_PATH}")
    df = pd.read_excel(EXCEL_PATH, sheet_name="📊 Strategy Matrix")
    df.columns = [c.strip() for c in df.columns]
    df = df.fillna("")

    db = SessionLocal()
    try:
        db.query(Business).delete()
        db.commit()
        records = []
        for _, row in df.iterrows():
            obj = Business()
            for excel_col, db_col in COL_MAP.items():
                val = row.get(excel_col, "")
                if db_col == "sr_no":
                    try:
                        setattr(obj, db_col, int(val) if val != "" else None)
                    except:
                        setattr(obj, db_col, None)
                else:
                    setattr(obj, db_col, str(val).strip() if val != "" else None)
            records.append(obj)
        db.bulk_save_objects(records)
        db.commit()
        print(f"✅ Seeded {len(records)} records!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()