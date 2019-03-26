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


const carCount = (agentArray) => {
    let counts = {};

    agentArray.forEach(function(i) {
        counts[i] = (counts[i] || 0) + 1;
    })
    return counts;
}

const mostCarsAgent = (agentsObject) => {
    let higherNumber = 0;
    let agentName = "";
    for(let name in agentsObject){
        if (agentsObject[name] > higherNumber){
            higherNumber = agentsObject[name];
            agentName = name + " sold " + higherNumber;
        }
        if (agentsObject[name] === higherNumber && !agentName.includes(name)){
            agentName += " tied with " + name + " with " + higherNumber;
        }
    }
    return agentName;
}


const combinedProfit = (array) => {
    let newArray = [];
    let copy = array.slice(0);

    array.forEach(agentOne => {
        let profit = agentOne.profit
        let count = 0;

        for(let i = 1; i < copy.length; i++) {
            if(agentOne.name === copy[i].name)
            profit += copy[i].profit
            count++;
        }
        if (count > 0){
            let agentObj = {
                name: agentOne.name,
                profit: parseFloat(profit.toFixed(2))
            }
        newArray.push(agentObj);
        }
    })
    
    newArray = newArray.reduce((unique, o) => {
        if(!unique.some(obj => obj.name === o.name)){
            unique.push(o);
        }
        return unique;
    }, []);
    
    const highestSale = Math.max.apply(null, newArray.map(function(a){return a.profit}));
    console.log(highestSale)
   return newArray.find(agent => agent.profit === highestSale)
}


const soldMostCars = getCars().then(response => response.map(sale => sale.sales_agent.first_name)).then(response => response.sort()).then(response => carCount(response)).then(response => container.innerHTML += `<h2>This agent sold the most cars: ${mostCarsAgent(response)}</h2>`);

const agentsAndProfit = getCars().then(response => response.map(obj => { return {name: obj.sales_agent.first_name, profit: obj.gross_profit}
})).then(response => response.sort(function(a,b){
    let nameA = a.name
    let nameB = b.name
    if(nameA < nameB){
        return -1;
    }
    if(nameA > nameB){
        return 1
    }
    return 0;
})).then(response => combinedProfit(response)).then(response => container.innerHTML += `<h2>${response.name} made the most profit with $${response.profit}`);

const modelList = getCars().then(response => response.map(sale => sale.vehicle.model)).then(response => carCount(response)).then(response => mostCarsAgent(response)).then(response => container.innerHTML += `<h2>${response}</h2>`);

const creditList = getCars().then(response => response.map(bank => bank.credit.credit_provider)).then(response => carCount(response)).then(response => mostCarsAgent(response)).then(response => container.innerHTML += `<h2>${response}</h2>`);


    