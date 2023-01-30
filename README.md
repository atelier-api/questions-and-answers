# 👋 Welcome to `Atelier API - Q&A`

**_A scalable, optimized microservice providing questions and answers feature to an e-commerce website._**

## Description
This is a backend solution for the Atelier webstore's questions and answers feature. Initially able to handle 400 RPS, the monolithic backend was redisgned with microservice architecture and scaled to handle 3000+ RPS with two EC2 T2 instances load balanced with an NGINX server. An avergae response time of 16 ms and 0% error rate was recorded at 3000 RPS.  

## Technologies
* [Express](https://expressjs.com/)
* [NodeJS](https://nodejs.dev/)
* [PostgreSQL](https://www.postgresql.org/)
* [NGINX](https://www.nginx.com/)
* [k6 Load Testing](https://k6.io/)
* [Loader.io](https://loader.io/)
* [Amazon EC2](https://aws.amazon.com/ec2/)

## Performance Analysis
A detailed report can be found [here](https://pewter-polyanthus-44c.notion.site/11-11-2022-Performance-Analysis-cf8495b1fae64cb2b842996b1c09e42a).

## Contributor
* This microservice was built by [Hasan Uchchas](https://github.com/huchchas).
