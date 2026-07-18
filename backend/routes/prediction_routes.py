from flask import Blueprint
from controllers.prediction_controller import predict, get_history, health_check

prediction_bp = Blueprint('prediction', __name__)

prediction_bp.route('/predict', methods=['POST'])(predict)
prediction_bp.route('/history', methods=['GET'])(get_history)
prediction_bp.route('/health', methods=['GET'])(health_check)
