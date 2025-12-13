from contextlib import asynccontextmanager
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables to cache the model and processor
MODEL = None
PROCESSOR = None

def load_model():
    """Load the BLIP model and processor once at startup"""
    global MODEL, PROCESSOR
    if MODEL is None or PROCESSOR is None:
        logger.info("Loading BLIP model and processor...")
        PROCESSOR = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
        MODEL = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
        logger.info("Model loaded successfully!")
    return MODEL, PROCESSOR

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the model on startup
    load_model()
    yield
    # Clean up if needed

# Initialize FastAPI app with lifespan
app = FastAPI(title="Image Captioning API", version="1.0", lifespan=lifespan)

# Configure CORS to allow requests from your Next.js frontend (usually on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Image Captioning API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/caption")
async def generate_caption(file: UploadFile = File(...)):
    """
    Generate a caption for an uploaded image.
    
    Parameters:
    - file: Image file (JPEG, PNG, etc.)
    
    Returns:
    - JSON object containing the generated caption
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400, 
            detail="File must be an image (JPEG, PNG, etc.)"
        )
    
    try:
        logger.info(f"Processing image: {file.filename}")
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Load model (cached)
        model, processor = load_model()
        
        # Process image and generate caption
        inputs = processor(image, return_tensors="pt")
        output = model.generate(**inputs)
        caption = processor.decode(output[0], skip_special_tokens=True)
        
        logger.info(f"Generated caption: {caption}")
        
        return JSONResponse({
            "success": True,
            "caption": caption,
            "filename": file.filename
        })
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)