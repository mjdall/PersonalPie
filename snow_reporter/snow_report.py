"""
=================================================
Flask Server for fetching Ruapehu weather reports
=================================================
"""

from weather_fetching import get_weather, SkiField
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/weather/whakapapa')
def get_weather_whakapapa():
    """
    Fetches the weather for whakapapa.
    :return: The weather for whakapapa.
    """
    # todo: handle errors before returning
    return jsonify(get_weather(SkiField.WHAKAPAPA))


@app.route('/weather/turoa')
def get_weather_turoa():
    """
    Fetches the weather for turoa.
    :return: The weather for turoa.
    """
    # todo: handle errors before returning
    return jsonify(get_weather(SkiField.TUROA))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3890)
