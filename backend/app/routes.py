from flask import Flask, request, jsonify
from app.scheduler import schedule_appointment
from app.translation import translate_text
from app.telehealth import start_telehealth_session

app = Flask(__name__)

@app.route('/api/schedule', methods=['POST'])
def schedule():
    data = request.json
    response = schedule_appointment(data)
    return jsonify(response)

@app.route('/api/translate', methods=['POST'])
def translate():
    text = request.json['text']
    target_language = request.json['target_language']
    translated_text = translate_text(text, target_language)
    return jsonify({'translated_text': translated_text})

@app.route('/api/telehealth', methods=['POST'])
def telehealth():
    session_data = request.json
    session_url = start_telehealth_session(session_data)
    return jsonify({'session_url': session_url})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
