"""
FitFlow Computer Vision Microservice
Handles meal photo recognition, segmentation, and nutritional estimation.
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(
    title="FitFlow Computer Vision Service",
    description="Microservice for meal image recognition and nutritional decomposition",
    version="1.0.0"
)

class NutritionEstimate(BaseModel):
    dish_name: str
    confidence: float
    calories: int
    protein_grams: float
    carbs_grams: float
    fat_grams: float
    fiber_grams: float

class RecognitionResponse(BaseModel):
    image_id: str
    status: str
    inference_time_ms: float
    detected_items: List[NutritionEstimate]
    total_calories: int
    total_protein: float
    total_carbs: float
    total_fat: float

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "cv-food-recognition-service",
        "model": "Food101-ResNet50-Quantized",
        "version": "1.0.0"
    }

@app.post("/api/v1/vision/analyze-plate", response_model=RecognitionResponse)
def analyze_plate(image_url: Optional[str] = None):
    # Simulated CV inference pipeline
    start = time.time()
    
    items = [
        NutritionEstimate(
            dish_name="Grilled Atlantic Salmon Fillet",
            confidence=0.964,
            calories=280,
            protein_grams=34.0,
            carbs_grams=0.0,
            fat_grams=15.0,
            fiber_grams=0.0
        ),
        NutritionEstimate(
            dish_name="Steamed Organic Quinoa",
            confidence=0.912,
            calories=160,
            protein_grams=5.5,
            carbs_grams=30.0,
            fat_grams=2.5,
            fiber_grams=4.0
        ),
        NutritionEstimate(
            dish_name="Mixed Garden Salad with Avocado",
            confidence=0.885,
            calories=80,
            protein_grams=2.5,
            carbs_grams=8.0,
            fat_grams=4.5,
            fiber_grams=3.0
        )
    ]

    total_cals = sum(item.calories for item in items)
    total_p = sum(item.protein_grams for item in items)
    total_c = sum(item.carbs_grams for item in items)
    total_f = sum(item.fat_grams for item in items)

    elapsed_ms = (time.time() - start) * 1000

    return RecognitionResponse(
        image_id=f"img_{int(time.time())}",
        status="recognized",
        inference_time_ms=round(elapsed_ms, 2),
        detected_items=items,
        total_calories=total_cals,
        total_protein=total_p,
        total_carbs=total_c,
        total_fat=total_f
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
