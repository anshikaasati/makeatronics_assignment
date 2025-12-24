from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Maketronics Intelligence"
    DATABASE_URL: str = "sqlite:///./database.db"
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
