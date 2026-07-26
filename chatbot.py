
import datetime
import random
import requests
import calendar

# Dictionary responses
responses = {
    "hello": "Hi, Welcome. How can I help you?",
    "hi": "Hello! How can I help you?",
    "how are you": "I am very fine. Thank you!",
    "who are you": "I am a Smart AI Chatbot.",
    "motivate me": "Keep going. Every bug in your project makes you better.",
    "happy": "Great to hear that!",
    "what is your name": "My name is Python ChatBot.",
    "sad": "Don't worry. Everything will be okay.",
    "thank you": "You're welcome!",
    "thanks": "My pleasure.",
    "bye": "Goodbye! Have a nice day.",
    "python": "Python is a simple and powerful programming language.",
    "ai": "Artificial Intelligence enables machines to perform tasks that normally require human intelligence.",
    "college": "Study regularly and practice coding every day.",
    "help": "You can ask about date, time, joke, weather, age calculator and more."
}


def get_bot_response(user_message):
    print(user_message)
    user_message = user_message.lower().strip()
    print(user_message)

    # Date
    if user_message == "date":
        return "Current Date: " + datetime.datetime.now().strftime("%d-%m-%Y")

    # Time
    elif user_message == "time":
        return "Current Time: " + datetime.datetime.now().strftime("%H:%M:%S")

    # Joke
    elif user_message == "joke":
        jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "Why was the computer cold? It forgot to close Windows.",
            "Why don't robots get tired? Because they recharge!",
            "Why did the Python programmer wear glasses? Because he couldn't C."
        ]
        return random.choice(jokes)

    # Age Calculator
    elif user_message.startswith("age "):
        try:
            birth_year = int(user_message.split()[1])
            current_year = datetime.datetime.now().year
            age = current_year - birth_year
            return f"Your age is {age} years."
        except:
            return "Example: age 2008"

    # Weather
    elif user_message.startswith("weather "):
        city = user_message.replace("weather ", "")

        api_key = "2eb5eb7f87260a178f2fa2edec3a5c32"

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

        try:
            data = requests.get(url).json()

            if data["cod"] == 200:
                temp = data["main"]["temp"]
                weather = data["weather"][0]["description"]

                return f"{city.title()} : {temp}°C, {weather}"

            else:
                return "City not found."

        except:
            return "Weather service unavailable."

    
    
    # Calculator
    elif user_message.startswith("calculate") or any(op in user_message for op in ["+", "-", "*", "/"]):

        try:

            if user_message.startswith("calculate"):
                expression = user_message.replace("calculate", "").strip()
            else:
                expression = user_message.strip()

            result = eval(expression)

            return f"🧮 Answer = {result}"

        except:
            return "❌ Example:\ncalculate 25+50\n25+50"
    
    # Stopwatch
    elif user_message.startswith("stop "):

        try:
            seconds = int(user_message.split()[1])

            return f"STOPWATCH:{seconds}"

        except:
            return "Example: stop 12"

    # Calendar
    elif user_message == "calendar":

        now = datetime.datetime.now()

        cal = calendar.month(now.year, now.month)

        return f"📅 Calendar\n\n{cal}"

    # Dictionary responses
    else:
        for key in responses:
            if key in user_message:
                return responses[key]

    return "Sorry, I don't understand. Please try another question."
  
       

    
 
      

    
 
