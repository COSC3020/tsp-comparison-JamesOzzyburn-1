function tsp_hk(distance_matrix) {
    var numberOfCities = distance_matrix.length; // Get the number of cities

    if (numberOfCities == 0 || distance_matrix[0].length == 0) { //Check for empty matrix or a matrix with no cities (this gets test 1 and 2 to pass)
        return 0;
    }

    //The code right below is pretty much identical to the code in the else block far below (lines 98-114) as we are doing the same
    //thing but in the else block we are finding the shortest tour for this perticular start and for
    //the code below we are looking at finding the the shortest tour out of all of the possible starts
    var shortestLengthTour = Infinity; //Use this to find the overall shortest path
    var cache = []; //Make our cache for memoization

    for (var startCity = 0; startCity < numberOfCities; startCity++) { //This code iterates through all possible start cities and find the shortest path out of them
        var cities = []; //Make a list of our cities to visit
        for (var i = 0; i < numberOfCities; i++) { //Push the cities we want to visit to it
            cities.push(i);
        }
        var currentTourLength = tsp_hk_rec(cities, startCity); //Find the tour length for this specific start city
        var shortestLengthTour = Math.min(shortestLengthTour, currentTourLength); //Find the shortest tour out of all of the possible cities
        //console.log('Working on city: ' + startCity);
    }

    //Nested the function in here so I dont have to pass as many paremeters
    function tsp_hk_rec(cities, start) { // Recurvsive part of hk 
        if (cities.length == 1) { //If there is only one city left
            return distance_matrix[start][cities[0]]; //We return the distance from the start to that city
        } 

        else { //If there more than one we need to make a list of cities we need to visit and find the shortest path
            var key = JSON.stringify(cities) + start; //Make a key
            //console.log(key);
            if (cache[key] != undefined) { //Check our cache first
                //console.log("Hit the cache");
                return cache[key];
            }

            var minLengthTour = Infinity; //Make a variable to hold the minimum distance
            const newCities = []; //Make our new list of cities to visit

            for (var i = 0; i < cities.length; i++) { //Add all of the cities except start to our new list of cities
                if (cities[i] != start) {
                    newCities.push(cities[i]);
                }
            }

            for (var i = 0; i < newCities.length; i++) { //Iterate through our list of new cities to find the shortest path
                var currentTourLength = tsp_hk_rec(newCities, newCities[i], cache) + distance_matrix[start][newCities[i]]; //Recursivly call our function to find the minimum length and then add the distance from the start to get the total length
                var minLengthTour = Math.min(minLengthTour, currentTourLength); //Set the overall minimum length tour
            }

            cache[key] = minLengthTour; //Add to our cache
            return minLengthTour; //Return the smallest tour
        }
    }
    return shortestLengthTour; //Return our overall shortest tour
}


/* Sources:
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array //easy way to randomize an array
*/

function tsp_ls(distance_matrix) {
    var numberOfCities = distance_matrix.length; //Make number of cities

    if (numberOfCities == 0 || numberOfCities == 1) { //Return 0 if there are no cities or only one city
        return 0; 
    }

    //Make our random route
    var currentRoute = []; //Make our array
    for (var i = 0; i < numberOfCities; i++) { //Add all of the cities to our new array
        currentRoute.push(i);
    }
    //console.log(currentRoute);
    for (var i = 0; i < numberOfCities; i++) { //Randomize it 
        var j = Math.floor(Math.random() * i);
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]]; //This actually does the swapping
    }
    //console.log(currentRoute);

    var incumbent = currentRoute; //Make our incumbant
    var incumbentLength = 0; //Make our incumbant length
    for (var i = 0; i < currentRoute.length - 1; i++) { //Calculate the length of our current route
        incumbentLength += distance_matrix[currentRoute[i]][currentRoute[i + 1]];
    }
    incumbentLength += distance_matrix[currentRoute[currentRoute.length - 1]][currentRoute[0]]; //We also have to add the length from the last to the start

    var iteration = 0 //Number of overall iterations to try
    var moreImprovement = 0; //Number of iterations after it doesnt improve to keep trying counter
    var maxIteration = calcFact(numberOfCities);
    //console.log(maxIteration);
    while (iteration < maxIteration) { //Run n! times.
        var improved = false; //This is to help stop

        //Make i and k random then run until they are not the same anymore
        var i = Math.floor(Math.random() * numberOfCities - 1);
        var k = Math.floor(Math.random() * numberOfCities - 1);
        while(k == i) {
            i = Math.floor(Math.random() * numberOfCities - 1);
            k = Math.floor(Math.random() * numberOfCities - 1);
        }

        var newRoute = twoOptSwap(currentRoute, i, k); //Get our new route using twoOptSwap
        var newRouteLength = 0; //Get the length of our new route

        for (var i = 0; i < newRoute.length - 1; i++) { //Calculate the length of our new route
            newRouteLength += distance_matrix[newRoute[i]][newRoute[i + 1]];
        }
        newRouteLength += distance_matrix[newRoute[newRoute.length - 1]][newRoute[0]]; //We also have to add the length from the last to the start

        // If the new route is shorter, update incumbent
        if (newRouteLength < incumbentLength) { //If the new route is shorter we update our incumbant and its length and reset our stopping criteria
            incumbent = newRoute; //Update incumbant
            incumbentLength = newRouteLength; //Update incumbant length
            currentRoute = newRoute; //Update this so we run our new route
            improved = true; //It has improved
            moreImprovement = 0; //Reset our more improvement counter
        }

        //Here is my stopping criteria.
        if (!improved) { 
            moreImprovement++; 
            if(moreImprovement > 101) { //If it hasnt improved, run 100 more times and if it still hasnt improved after that then exit. There really isnt no logic behind 100 I just feel like thats enough chances.
                break;
            }
        }
    }
    return incumbentLength; //Return the length
}

//This just the pseudo code but in js
function twoOptSwap(route, i, k) { 
    var newRoute = route.slice(0, i);
    newRoute.push(...route.slice(i, k + 1).reverse()); 
    newRoute.push(...route.slice(k + 1));
    return newRoute;
}

//Calculate factorial
function calcFact(n) {
    if (n <= 1) {
        return 1;
    }
    else {
        return n * calcFact(n - 1);
    }
}


//Used chatGPT to create a matrix generator
function generateDistanceMatrix(numCities, maxDistance = 100) {
    const distanceMatrix = new Array(numCities).fill(0).map(() => new Array(numCities).fill(0));
    
    for (let i = 0; i < numCities; i++) {
        for (let j = 0; j < numCities; j++) {
            if (i !== j) {
                distanceMatrix[i][j] = Math.floor(Math.random() * maxDistance) + 1;
            }
        }
    }
    
    return distanceMatrix;
}


function timing() {
    console.log('Running Held Karp')
    //Time held karp first at 10 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(10);
    var answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('10 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp first at 11 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(11);
    answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('11 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp first at 12 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(12);
    answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('12 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp first at 13 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(13);
    answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('13 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp first at 14 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(14);
    var answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('14 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 15 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(15);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('15 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 16 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(16);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('16 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 17 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(17);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('17 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 18 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(18);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('18 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 19 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(19);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('19 cities in ' + (endHK - startHK)/1000 + ' seconds');

    
    //Time held karp at 20 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(20);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('20 cities in ' + (endHK - startHK)/1000 + ' seconds');

    /*
    //Time held karp at 30 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(30);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('30 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 40 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(40);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('40 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 50 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(50);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('50 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time held karp at 100 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(100);
    answer = tsp_hk(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('100 cities in ' + (endHK - startHK)/1000 + ' seconds');
*/
    /////////////////////////
    /////////////////////////
    //Timing Local Search Now
    /////////////////////////
    /////////////////////////

    console.log('Running Local Search')

    //Time local search first at 10 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(10);
    var answer = tsp_ls(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('10 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search first at 11 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(11);
    answer = tsp_ls(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('11 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search first at 12 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(12);
    answer = tsp_hk(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('12 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search first at 13 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(13);
    answer = tsp_ls(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('13 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search first at 14 cities
    var startHK = performance.now();
    var matrix = generateDistanceMatrix(14);
    var answer = tsp_ls(matrix);
    //console.log(answer);
    var endHK = performance.now();
    console.log('14 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 15 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(15);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('15 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 16 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(16);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('16 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 17 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(17);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('17 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 18 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(18);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('18 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 19 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(19);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('19 cities in ' + (endHK - startHK)/1000 + ' seconds');

    
    //Time local search at 20 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(20);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('20 cities in ' + (endHK - startHK)/1000 + ' seconds');

    /*
    //Time local search at 30 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(30);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('30 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 40 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(40);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('40 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 50 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(50);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('50 cities in ' + (endHK - startHK)/1000 + ' seconds');

    //Time local search at 100 cities
    startHK = performance.now(); 
    matrix = generateDistanceMatrix(100);
    answer = tsp_ls(matrix);
    //console.log(answer);
    endHK = performance.now();
    console.log('100 cities in ' + (endHK - startHK)/1000 + ' seconds');
    */
}


timing();
