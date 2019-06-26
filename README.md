# PersonalPie
## Overview
I no longer need my raspberry pi for it's original purpose, I have some free time so I want to make something with it.
The idea is to report on Ruapehu weather so I know when it's a good time to go snowboarding, as well as have basic dash features like a clock etc.
I'll probably link this to my google calender as well. If I think of anything else I'll add it in.

## Structure
I want an excuse to write some python code, so I'll do my api fetching via a backend flask server.
I could have instead just did it all client side but eh. Might have the deploy script ssh into my dev machine to host the backend.
Anddddd of course I'll do a react frontend, probably go with a single page, so create-react-app then bootstrap for styling.

## Drafting
* Fetching weather
    * I think plain weather apis won't quite cut it.
    * I'll try find some metservice api that might have specific snow conditions.
    * Otherwise I'll just scrape and use lxml metservice + ruapehu site to get my data.
        * Emailed metservice to see if they have a datasource.
        * For now I'll scrape [this page](https://www.metservice.com/skifields/turoa)
