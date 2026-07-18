from flask import Blueprint, request, jsonify
from services.chatbot_service import ChatbotService
import json

chatbot_bp = Blueprint('chatbot', __name__)
chatbot_service = ChatbotService()

@chatbot_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json() or {}
        prediction = data.get('prediction_result')
        applicant_data = data.get('applicant_data')
        question = data.get('question', '')
        history = data.get('history', [])
        language = data.get('selectedLanguage', 'English')

        if not question:
            return jsonify({'error': 'Question parameter is required.'}), 400

        # Process the question in the requested language
        response_text = chatbot_service.process_query(question, prediction, applicant_data, history, language)
        explanation = chatbot_service.explain_prediction(prediction, applicant_data, language)
        suggestions = chatbot_service.generate_suggestions(prediction, applicant_data, language)
        report = chatbot_service.generate_report(prediction, applicant_data, language)

        return jsonify({
            'response': response_text,
            'explanation': explanation,
            'suggestions': suggestions,
            'report': report,
            'language': language
        }), 200

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@chatbot_bp.route('/voice', methods=['POST'])
def voice():
    try:
        data = request.get_json() or {}
        prediction = data.get('prediction_result')
        applicant_data = data.get('applicant_data')
        question = data.get('question', '')
        history = data.get('history', [])
        language = data.get('selectedLanguage', 'English')

        if not question:
            return jsonify({'error': 'Voice question parameter is required.'}), 400

        response_text = chatbot_service.process_query(question, prediction, applicant_data, history, language)
        explanation = chatbot_service.explain_prediction(prediction, applicant_data, language)
        suggestions = chatbot_service.generate_suggestions(prediction, applicant_data, language)
        report = chatbot_service.generate_report(prediction, applicant_data, language)

        return jsonify({
            'response': response_text,
            'explanation': explanation,
            'suggestions': suggestions,
            'report': report,
            'language': language
        }), 200

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@chatbot_bp.route('/faqs', methods=['GET'])
def faqs():
    try:
        language = request.args.get('selectedLanguage') or request.args.get('lang') or 'English'
        faq_list = chatbot_service.get_faqs(language)
        return jsonify(faq_list), 200
    except Exception as e:
        return jsonify({'error': f'Could not load FAQs: {str(e)}'}), 500

@chatbot_bp.route('/report', methods=['GET'])
def report():
    try:
        prediction = None
        applicant_data = None
        language = 'English'

        # Try parsing JSON string from 'data' parameter
        data_param = request.args.get('data')
        if data_param:
            try:
                parsed_data = json.loads(data_param)
                prediction = parsed_data.get('prediction_result')
                applicant_data = parsed_data.get('applicant_data')
                language = parsed_data.get('selectedLanguage', 'English')
            except json.JSONDecodeError:
                pass

        # If not parsed, check individual parameters
        if not applicant_data:
            language = request.args.get('selectedLanguage') or request.args.get('lang') or 'English'
            applicant_data = {
                'Credit History': request.args.get('credit_history', '1.0'),
                'Applicant Income': request.args.get('applicant_income', '5000'),
                'Coapplicant Income': request.args.get('coapplicant_income', '0'),
                'Loan Amount': request.args.get('loan_amount', '150'),
                'Loan Amount Term': request.args.get('loan_amount_term', '360')
            }
        
        if not prediction:
            prediction = {
                'prediction': request.args.get('prediction', 'Rejected'),
                'risk_level': request.args.get('risk_level', 'High'),
                'confidence': float(request.args.get('confidence', '75.0'))
            }

        report_data = chatbot_service.generate_report(prediction, applicant_data, language)
        explanation = chatbot_service.explain_prediction(prediction, applicant_data, language)
        suggestions = chatbot_service.generate_suggestions(prediction, applicant_data, language)

        return jsonify({
            'report': report_data,
            'explanation': explanation,
            'suggestions': suggestions,
            'language': language
        }), 200

    except Exception as e:
        return jsonify({'error': f'Could not generate report: {str(e)}'}), 500
