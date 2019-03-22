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


//Create a function that makes a copy of the array passed in and compares the values with the original array of dates. If the values are the same, the count variable increases by one. If the count value is greather than one, we create a date object. The date object has two keys: date that accepts the value of the date string, and carsSold that accepts the value of the count variable in order to count how many cars were sold in that month. The object that is created is then pushed into the newArray which now displays the amount of cars sold and the dates. Then we map the newArray to return only the number of cars sold for that month. We find the highest value, which is 8. Then we loop through newArray again to see which objects carsSold value is 8, and we add these objects to highestNumbersArray. I spliced this array to contain only the first two objects because the rest were duplicates.

const compareArrays = (originalArray) => {
    const newArray = [];
    const duplicate = originalArray.slice(0);
    const highestNumbersArray = [];

    originalArray.forEach(dateOne => {
        let count = 0;

        duplicate.forEach(dateTwo => {
            if(dateOne === dateTwo){
                count++;
            }
        })
        if(count > 0){
            let dateObj = {
                date: dateOne,
                carsSold: count
            }
           
            newArray.push(dateObj);
        }
    })
    const justNum = newArray.map(obj => obj.carsSold);
    const highestNum = Math.max.apply(null, justNum);
    newArray.forEach(obj => {
        if(obj.carsSold === highestNum){
            highestNumbersArray.push(obj);
        }
    })
    return highestNumbersArray.slice(0,2);
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

    })).then(response => compareArrays(response))
    .then(response => response.forEach(obj => {
        container.innerHTML += `<h2>Month ${obj.date} sold the most cars: ${obj.carsSold}`
    }));
    