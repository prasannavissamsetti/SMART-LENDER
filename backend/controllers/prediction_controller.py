from flask import request, jsonify
from services.prediction_service import PredictionService
import logging
import os
from werkzeug.utils import secure_filename

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

prediction_service = PredictionService()

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def predict():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
            uploaded_file = request.files.get('photo')
            if uploaded_file and uploaded_file.filename:
                filename = secure_filename(uploaded_file.filename)
                save_path = os.path.join(UPLOAD_FOLDER, filename)
                uploaded_file.save(save_path)
                data['photo_path'] = save_path

        if not data:
            return jsonify({'error': 'No input data provided. Request body must be JSON or form data.'}), 400

        logger.info(f"Received prediction request: {data}")

        result = prediction_service.predict_and_save(data)

        return jsonify(result), 200

    except FileNotFoundError as fnf_err:
        logger.error(f"Prediction error: {str(fnf_err)}")
        return jsonify({'error': 'Prediction service is currently unavailable. Model files are missing.'}), 503
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'An unexpected error occurred during prediction: {str(e)}'}), 500

def get_history():
    try:
        limit = request.args.get('limit', default=100, type=int)
        history = prediction_service.get_history(limit=limit)
        return jsonify(history), 200
    except Exception as e:
        logger.error(f"History retrieval error: {str(e)}")
        return jsonify({'error': f'Could not retrieve prediction history: {str(e)}'}), 500

def health_check():
    # Return health status of the services
    try:
        prediction_service.predictor._load_artifacts()
        model_status = 'loaded'
    except Exception:
        model_status = 'missing_or_error'
        
    return jsonify({
        'status': 'healthy',
        'database': 'connected',
        'model': model_status
    }), 200
