from enum import Enum
from . import metservice_scraper


class SkiField(Enum):
    WHAKAPAPA = 'whakapapa'
    TUROA = 'turoa'


def get_weather(ski_field_enum):
    """
    Export from __init__.py so we can change out the api calls.

    :param ski_field_enum: SkiField enum.
    :return: Weather for that skifield.
    """
    if not isinstance(ski_field_enum, SkiField):
        raise TypeError('ski_field_enum must be an instance of SkiField enum.')
    return metservice_scraper.scrape_weather(ski_field_enum.value)
