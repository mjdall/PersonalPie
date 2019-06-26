"""
Using some sloppy means to get mountain weather data
so these are some tests to ensure we know when
anything begins to change.
"""

from weather_fetching.metservice_scraper import get_url_text_as_etree, get_weather_from_etree

WEATHER = 'weather'
DAY = 'day'


def test_weather_scrape():
    """
    Scraping https://www.mtruapehu.com/turoa/report is done
    in a fashion that can easily change by an update to their
    site. This just makes sure we know when that happens.
    """
    known_weather = {'Bluebird', 'Sunny', 'Partly Cloudy'}
    turoa_url = 'https://www.mtruapehu.com/turoa/report'
    whakapapa_url = 'https://www.mtruapehu.com/whakapapa/report'

    for url in [turoa_url, whakapapa_url]:
        page_text = get_url_text_as_etree(url)
        weather_reports = get_weather_from_etree(page_text)
        week_days = {
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        }

        # make sure we know this is weather and a correct weekday
        for forecast in weather_reports:
            weather = forecast[WEATHER]
            day = forecast[DAY]
            assert weather in known_weather, 'Unknown weather type: ' + str(weather)
            assert day in week_days, 'Unknown week day: ' + str(day)
