function convertTemperature(value, unit) {  
    if (unit === "Celsius") {    
        return value * 9 / 5 + 32;  
    } else if (unit === "Fahrenheit") {  
        return (value - 32) * 5 / 9;         
    }
}

function getResult() {
    const temperature = parseFloat(document.getElementById("temperature-input").value);  
    const unit = document.getElementById("unit-select").value;  
   
    const convertedTemperature = convertTemperature(temperature, unit);  
    const res = document.getElementById("result")
    //alert(convertedTemperature)
    res.value = convertedTemperature.toFixed(2);
}


document.getElementById("temperature-input").addEventListener("change", getResult);
document.getElementById("temperature-input").addEventListener("keyup", getResult);
document.getElementById("unit-select").addEventListener("change", getResult);
