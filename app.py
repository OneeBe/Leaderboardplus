import os
import logging
from flask import Flask, request, g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_compress import Compress
import time

# Configure logging
logging.basicConfig(level=logging.WARNING)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-replit-2024")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Performance optimizations
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 31536000  # 1 year for static files
app.config['COMPRESS_MIMETYPES'] = [
    'text/html', 'text/css', 'text/javascript', 'application/javascript',
    'application/json', 'application/xml', 'text/xml', 'text/plain'
]
app.config['COMPRESS_LEVEL'] = 6
app.config['COMPRESS_MIN_SIZE'] = 500

# Initialize compression
Compress(app)

# Configure the database for Railway
database_url = os.environ.get('DATABASE_URL')
if database_url and database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

# Ensure instance directory exists for SQLite
instance_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance')
os.makedirs(instance_dir, exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url or f'sqlite:///{os.path.join(instance_dir, "bedwars_leaderboard.db")}'
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_size": 3,
    "max_overflow": 0,
    "pool_timeout": 10,
    "pool_recycle": 280,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Custom Jinja2 filters
@app.template_filter('unique')
def unique_filter(lst):
    """Remove duplicates from list while preserving order"""
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

@app.template_filter('hex_to_rgb')
def hex_to_rgb_filter(hex_color):
    """Convert hex color to RGB values"""
    if not hex_color or not hex_color.startswith('#'):
        return "0, 0, 0"

    hex_color = hex_color.lstrip('#')
    if len(hex_color) != 6:
        return "0, 0, 0"

    try:
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        return f"{r}, {g}, {b}"
    except ValueError:
        return "0, 0, 0"

# Initialize the app with the extension
db.init_app(app)

# Register translation filter
from translations import register_translation_filter
register_translation_filter(app)

# Performance monitoring and optimization middleware
@app.before_request
def start_request_timer():
    g.start_time = time.time()

@app.after_request
def add_performance_headers(response):
    """Add performance and security headers"""
    # Performance timing
    if hasattr(g, 'start_time'):
        response.headers['X-Response-Time'] = f"{(time.time() - g.start_time) * 1000:.2f}ms"
    
    # Caching headers for static content
    if request.endpoint == 'static':
        response.headers['Cache-Control'] = 'public, max-age=31536000'  # 1 year
        response.headers['Expires'] = 'Thu, 31 Dec 2025 23:59:59 GMT'
    elif request.endpoint in ['index', 'statistics', 'shop']:
        response.headers['Cache-Control'] = 'public, max-age=300'  # 5 minutes
    
    # Compression headers
    if 'gzip' in request.headers.get('Accept-Encoding', ''):
        if response.content_type.startswith(('text/', 'application/json', 'application/javascript')):
            response.headers['Content-Encoding'] = 'gzip'
    
    # Security headers
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    return response

# Flask-Compress handles compression automatically

# Import routes first
import routes
try:
    import api_routes
except ImportError:
    pass  # API routes are optional

with app.app_context():
    # Import models to ensure tables are created
    from models import Player, Quest, PlayerQuest, Achievement, PlayerAchievement, CustomTitle, PlayerTitle, GradientTheme, PlayerGradientSetting, SiteTheme, ShopItem, ShopPurchase, CursorTheme, Clan, ClanMember, Tournament, TournamentParticipant, PlayerActiveBooster, AdminCustomRole, PlayerAdminRole, Badge, PlayerBadge

    try:
        # Always recreate tables to ensure schema is up to date
        app.logger.info("Updating database schema...")
        db.drop_all()
        db.create_all()
        
        # Test database connection
        db.session.execute(db.text('SELECT 1')).fetchone()
        
        # Initialize default data
        try:
            if SiteTheme.query.count() == 0:
                SiteTheme.create_default_themes()
        except:
            pass
            
        try:
            if Quest.query.count() == 0:
                Quest.create_default_quests()
        except:
            pass
            
        try:
            if Achievement.query.count() == 0:
                Achievement.create_default_achievements()
        except:
            pass
            
        try:
            if CustomTitle.query.count() == 0:
                CustomTitle.create_default_titles()
        except:
            pass
            
        try:
            if GradientTheme.query.count() == 0:
                GradientTheme.create_default_themes()
        except:
            pass
            
        try:
            if CursorTheme.query.count() == 0:
                CursorTheme.create_default_cursors()
        except:
            pass
            
        try:
            if ShopItem.query.count() == 0:
                ShopItem.create_default_items()
        except:
            pass

        try:
            if Badge.query.count() == 0:
                Badge.create_default_badges()
        except:
            pass

        app.logger.info("Database initialized successfully!")
        
    except Exception as e:
        app.logger.error(f"Database initialization error: {e}")
        # Continue anyway - errors will be handled in routes

# Application factory pattern - no direct run call