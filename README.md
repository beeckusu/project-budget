# Project: Show Me The Money


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The goal of the project is to visualize the trends in the user's spending by allowing them to categorize their spending and to show the month-to-month
changes, along with where they are spending their money.

## 1. Usage

### 1.1. File Upload

Users can load the app with data with one of two methods:\
1. Uploading a CSV file
    * Input files must contain the required fields: transaction date, transaction description, withdrawn amount, and deposited amount
    * Column naming and order is not necessary (order is customized in-app)
2. Uploading a previous save
    * A separate feature allows users to save their progress from the app into a JSON file, which can be re-uploaded here

### 1.2. Data Customization

Users can sift through their transaction data to:
    * Create new categories (and colour them to make each transaction visually distinct)
    * Choose which categories, transaction sources, or individual transactions to visualize in the display

### 1.3. Data Visualization

Data is visualized in a medium controlled by the user:
    * Chart vs. Table: Show the data in chart form or table form (the latter's customization is limited to restrict unwanted behaviour)
    * Date interval: Group data by day, week, month, or year
    * Category: Group data by nothing (homogenizing the data into one group to see the month-to-month trend), transaction source, or user-defined categories
    * Chart style: (Chart-only) Display bars for the same group in parallel or stacked on top
