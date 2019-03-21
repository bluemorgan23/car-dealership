// Your job is to produce the following reports for the dealership based on their total 2017 sales.

// Total profit for 2017
// In which month did they sell the most cars?
// Which salesperson sold the most cars?
// Which salesperson made the most profit?
// Which model was the most popular?
// Which bank provided the most loans to our customers?
const container = document.querySelector("#display-container");
const getCars = () => {
    return fetch("http://www.localhost:8088/cars")
        .then(response => response.json())
}

// const getDateSold = (array) => {
//     array.map(item => {
//         return item.purchase_date;
//     })
// }
const totalProfitIn2017 =
    getCars().then(response => response.filter(car => {
        let is2017 = false;

        if (car.purchase_date.includes("2017")) {
            is2017 = true;
        }
        return is2017;
    })).then(response => response.map(car => {
        return car.gross_profit;
    })).then(response => response.reduce((currentTotal, nextTotal) => currentTotal += nextTotal).toFixed(2)).then(response => container.innerHTML = `<h2>Total Profit in 2017: ${response}</h2>`);

console.log(totalProfitIn2017);

const buildMonthObj = (month) => {
    return {
        month: month,
        carsSold: 0
    }
}

const bestMonth =
    getCars().then(response => response.filter(car => {
        let is2017 = false;

        if (car.purchase_date.includes("2017")) {
            is2017 = true;
        }
        return is2017;
    })).then(response => response.map(car => {
        return car.purchase_date.slice(5, 7);
        debugger;

    })).then(response => response.forEach(car => {
        switch (car) {
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("02"):
                monthObj.month = "February";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
            case ("01"):
                monthObj.month = "January";
                monthObj.carsSold += 1;
                break;
        }
    }));