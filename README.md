## Competitive gamer analyzer on the popular game League of Legends

Utilizing Riot's robust API, I wanted to use their API to analyze competitive players (specifically Challenger division) against the average player stats in the same division/tier in a given region.

Given limitations of the API calls, I used node-cron as a scheduler to collect challenger player stats at fixed time intervals.

Backend: Node, Express, Sequelize, ElasticSearch

Frontend: - React, Redux, React HighCharts


