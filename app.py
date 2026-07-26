from flask import Flask, render_template, request, jsonify
import chatbot

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    # user_message = request.json.get("message", "")
    data = request.get_json()
    print(data)
    user_message = data["message"]
    bot_reply = chatbot.get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)