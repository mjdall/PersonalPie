FROM python:3.7-alpine

WORKDIR /snow_reporter

RUN apk add --no-cache \
    gcc \
    musl-dev \
    linux-headers \
    libxml2-dev \
    libxslt-dev

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

ENV FLASK_APP snow_report.py
ENV FLASK_ENV production
ENV FLASK_RUN_HOST 0.0.0.0

COPY ./snow_report.py .
COPY ./weather_fetching ./weather_fetching

CMD ["flask", "run"]
