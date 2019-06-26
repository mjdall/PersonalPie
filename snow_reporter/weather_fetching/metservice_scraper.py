"""
Currently going to just scrape from the ruapehu
site.
The plan is to standardise the output so I can
change my method of data retrieval down the
line.
I.e. if I can get an api link from met service.
"""

import requests
from lxml import html
import datetime

# Consts
WEATHER_URL = 'https://www.mtruapehu.com/%s/report'
KNOWN_WEATHER = ['Bluebird', 'Sunny', 'Partly Cloudy']
FORECASTS_DIV = 'forecast_'
SUBTEXT_DIV = 'forecastSubtitle_'


def scrape_weather(ski_field):
    """
    Scrapes the weather for turoa or whakapapa from here:
        https://www.mtruapehu.com/turoa/report
    Returns ... (update once scraped)

    :param skifield_enum: SkiField enum, currently will only be turoa or whakapapa
    :return: The scraped weather
    """
    # make sure this only gets enums
    if ski_field not in ['turoa', 'whakapapa']:
        raise TypeError('ski_field must be either "whakapapa" or "turoa"')

    weather_url = WEATHER_URL % ski_field
    page_text = get_url_text_as_etree(weather_url)
    return get_weather_from_etree(page_text)


def get_url_text_as_etree(url):
    """
    Requests a url, then parses the page text
    into an etree object if respone was 200.

    :param url: url to request.
    :return: Etree object of the page.
    """
    page_resp = requests.get(url)
    if page_resp.status_code != 200:
        raise ValueError('Non 200 status code returned from url')
    return html.fromstring(page_resp.text)


def get_weather_from_etree(page_text):
    """
    Looks for the weather part from an etree object
    of the Ruapehu weather report site.
    This is quite sloppy.

    i.e. https://www.mtruapehu.com/turoa/report.
    :param page_text: Etree object of the above url.
    :return: The weather from the page.
    """
    # get the weather values - should shorten this line
    weather = page_text.xpath(
        './/main//div[contains(@class, weather_)]/div[contains(@class, forecastWrapper_)]/div[contains(@class, forecast_)]/div[contains(@class, forecastSubtitle_)]')
    retrieved_weather = _get_all_children_text(weather)[-5:]

    # match them with the date atm
    today = datetime.datetime.now()
    for i in range(5):
        retrieved_weather[i] = {
            'day': _get_weekday_for_date(today + datetime.timedelta(days=i)),
            'weather': retrieved_weather[i]
        }
    return retrieved_weather


def _get_weekday_for_date(date):
    """
    Gets the weekday name of a date
    :param date: A datetime object.
    :return: The weekday for that datetime.
    """
    # make sure it's a date
    if not isinstance(date, datetime.datetime):
        raise ValueError('input value is not a date')

    week_days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]
    return week_days[date.weekday()]


def _get_all_children_text(etree):
    """
    Gets all children text nodes from an etree object.
    :param etree: An etree object.
    :return: A list of all the text nodes.
    """
    text = []
    for child in etree:
        if len(child):
            for sub_child in child:
                if sub_child.text is None:
                    continue
                text.append(sub_child.text)
        else:
            if child.text is None:
                continue
            text.append(child.text)
    return text


if __name__ == '__main__':
    """For local testing, just scrape Turoa"""
    scrape_weather('turoa')
