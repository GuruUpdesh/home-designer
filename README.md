# Home Designer

**[LIVE DEMO](https://guruupdesh.github.io/Home-Designer/#/)** (tested and developed in **Chrome**)

## The Project

Home designer is the final project of my introduction to databases class. We learned about database design, SQL, database normalization, and much more. The project is a for a theoretical company and is intended to be used without any authentication by an administrator. I worked on this project with my partner [Liheng Yi](https://github.com/Liheng-Yi). I took this project as an opportunity to work on my React and CSS skills, building the frontend from scratch and writing over 3000 lines of CSS. The implementation of the database and backend was far easier than our frontend implementation. Overall this project gave me a good foundation for working with databases as well as practice in React, SCSS, and JavaScript.

Features include:

- Create, read, edit, delete
- Inline table editing
- Responsive design
- Custom context menu (right click menu)
- Custom navbar
- Search and filter functionality
- 404 page
- etc

**[LIVE DEMO](https://guruupdesh.github.io/Home-Designer/#/)**

### Overview

Home Designer is an interior design firm that specializes in interior decoration, remodel planning and project management. Currently, the firm has 100+ clients, 800+ projects, and about 250 employees. This means our system will need to handle roughly 20-200 new client records per year, about 200-2000 projects per year, and an employee turnover of about 50 new employees per year. This is assuming some level of growth in new clients and overall business. Home Designer's website helps employees, managers, and owners of the business to keep a close eye on current projects. The idea is for there to be a single consolidated place for the business to view and manage its operations.

*Note: a small number of sample entries is live in the demo*

## Tech Stack

**FRONT END**

- React
- SCSS
- JavaScript

**BACK END**

- Express (API)
- MySQL (MariaDB)
- JavaScript

## Known Issues

- Sometimes the context menu causes overflow
- Mobile view is hit and miss (some elements are positioned incorrectly inside the table)
- Search by feature displays the key instead of attribute in search input
