
from app import app
import os

if __name__ == '__main__':
    # Replit deployment configuration
    port = int(os.environ.get('PORT', 3000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug)
