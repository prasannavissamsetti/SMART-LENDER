from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config
from routes.prediction_routes import prediction_bp
from routes.chatbot_routes import chatbot_bp
import sys
import os
import logging
import werkzeug.serving

# Ensure backend directory is in python search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Filter out the development server warning message to keep the console clean and warning-free
class DevServerWarningFilter(logging.Filter):
    def filter(self, record):
        return "development server" not in record.getMessage()

logging.getLogger('werkzeug').addFilter(DevServerWarningFilter())


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for React frontend integration
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(prediction_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'API endpoint not found'}), 404
        
    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({'error': 'Internal server error'}), 500
        
    return app

import logging

if __name__ == '__main__':
    app = create_app()
    print(f"Starting Smart Lender Backend on port {Config.PORT}...")
    # logging.getLogger('werkzeug').setLevel(logging.ERROR)
    app.run(host='127.0.0.1', port=Config.PORT, debug=False)
