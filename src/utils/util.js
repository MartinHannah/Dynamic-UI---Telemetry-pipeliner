const dataTypes = { 
    "cost": "$", 
    "energy": "kWh",
    "co2": "CO2e kg", 
    "realPower": "kW", 
}

export const shortenNumber = (number, decPlaces) => { 
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t" ];
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
             break;
        }
    }
    return number;    
}

export const calculateAverage = (data, key) => {
    let avg = data.reduce((acc, curr) => { 
        return acc + curr[key]
    }, 0) / data.length;
    avg = Math.round(avg * 100) / 100;
    return formatData(avg, key);
}

export const calculateTotal = (data, key) => {
    let total = data.reduce((acc, curr) => { 
        return  acc + curr[key];
    }, 0)
    return formatData(total, key);
}

//Format the data type with the relevant symbol. 
const formatData = (val, key) => { 
    val = Math.round(val * 100) / 100;
    if(key == 'cost') 
        val = dataTypes[key] + ' ' + val;
    else { 
        val = val + ' ' + dataTypes[key];
    }
    return val;
}
  