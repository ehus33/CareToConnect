from app import app
from app import routes
from app.translation import translate_text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
