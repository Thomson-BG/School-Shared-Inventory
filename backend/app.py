from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory database
items = [
    {"id": 1, "name": "Laptop", "description": "A used laptop"},
    {"id": 2, "name": "Desk Chair", "description": "A comfortable chair"},
]

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

@app.route('/items', methods=['POST'])
def add_item():
    item = request.get_json()
    items.append(item)
    return jsonify(item), 201

if __name__ == '__main__':
    app.run(debug=True, port=5001)
