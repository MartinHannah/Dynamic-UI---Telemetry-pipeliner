import Immutable from 'immutable'; 

const dataTypes = { 
    "cost": "$", 
    "energy": "kWh",
    "co2": "CO2e kg", 
    "realPower": "kW", 
}

const isImmutableLoaded = () => typeof Immutable !== 'undefined';

export const isColumnsImmutable = (columns) => {
  return isImmutableLoaded() && columns instanceof Immutable.List;
};

export const isImmutableCollection = objToVerify => {
  return isImmutableLoaded() && Immutable.Iterable.isIterable(objToVerify);
};

export const isImmutableMap = isImmutableLoaded() ? Immutable.Map.isMap : () => false;

export const getMixedTypeValueRetriever = (isImmutable) => {
  const retObj = {};
  const retriever = (item, key) => { return item[key]; };
  const immutableRetriever = (immutable, key) => { return immutable.get(key); };

  retObj.getValue = isImmutable ? immutableRetriever : retriever;

  return retObj;
};

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


export const objectToForm = (obj) => { 
    console.log(obj);
}

const exportToCSV = (data, colDelimiter = ',', lineDelimiter = '\n') => { 
    console.log('export csv', data);
    if(data == null || !data.length) { 
        return null;
    }

    const keys = Object.keys(data[0]);
    console.log(keys);
    let result;
    //Add headers
    result = keys.flatMap((key) => { return key; }) + lineDelimiter;

    data.forEach(function(item) {
        let ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += colDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    console.log(result);
    return result;
}

export const downloadCSV = (data, filename = 'export.csv') => { 
    
    let csv = exportToCSV(data);
    if(csv == null) return;

    if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        const link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
}

export const hasValue = (obj, value) => {
    const values = Object.values(obj); //Array of object values
    return values.some((val) => { 
        if(val === null) return false;
        const regex = new RegExp(value, "i");
        const stringVal = val.toString();
        return regex.test(stringVal); 
    })
}

export const hasValues = (obj, filters) => {
    return filters.every((filter) => {
        return hasValue(obj, filter);
    })
}

export const getObjectByProp = (array, property, value) => {
    return array.find(obj => {
        return obj[property] === value;
    })
}

export const isEmptyArray = (arr) => { 
    return Array.isArray(arr) && arr.length === 0;
}

export const castValue = (val, type) => { 
    switch(type) { 
      case 'BOOLEAN': 
      val = Boolean(parseInt(val));
      return val;
      case 'ARRAY': 
      val = JSON.parse(val.replace(/'/g, '"'));
      return val;
      default:
        return val;
    }
}

export const transformValue = (val) => { 
    const type = typeof val;
    console.log(type);
    switch (type) { 
        case 'boolean': 
        console.log((+val).toString());
        return (+val).toString();
        case 'object':
        return JSON.stringify(val);
        default: 
            return val;
    }
}