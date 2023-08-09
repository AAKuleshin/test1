const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const place_name = 'Moscow'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

//data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

//
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

function logMapElements(value,key,map) {
    console.log(`map.get('${key}') = ${value}`)
}

function getMedium(ar) {
    var sum = 0;
    ar.forEach((v)=> {
        sum += v
        //console.log(v)
    })
    return sum/ar.length
}


Array.prototype.unique = function () {
    var a = [];
    var l = this.length;

    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (this[i] === this[j]) {
                j = ++i;
            }
        }
        a.push(this[i]);
    }

    return a;
};

const div = document.getElementById('meteo');
const li = document.getElementById('meteo');
//const url = 'https://randomuser.me/api/?results=2'

fetch(API_URL_GEO_DATA)
.then((resp) => resp.json())
.then(function(data) {
    let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    console.log(coordinates)
    
   if(coordinates[0] != undefined && coordinates[1] != undefined) {
        const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`


        fetch(API_OPEN_METEO)
        .then((resp) => resp.json())
        .then(function(data) {
            let coordinates = data //.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            //console.log(data);
            let span = createNode('span')
            let results = data.hourly
            //Map.results.forEach(logMapElements)
            let counts = results.time.length
            //span.innerHTML = `${results.time} время `
            /*return results.map(function(res1) {
                span.innerHTML = `${res1} время : ${data.hourly_units.time} количество частиц pm10 : ${data.hourly_units.pm10} количество частиц pm2_5: ${data.hourly_units.pm2_5}`
            
            })*/
            var pm10array = []
            var pm2_5array = []
            var datesarray = []
            for(let i=0;i<counts;i++) {
                let span = createNode('span')
                let spanText = createNode('span')
                span.innerHTML = `${results.time[i]} ${i}`
                span.innerHTML = `${i+1} время : <b>${results.time[i]}</b> количество частиц pm10 : ${results.pm10[i]} количество частиц pm2_5: ${results.pm2_5[i]} <br>`
                append(li,span)
               
               date = results.time[i].split("T");
               if(pm10array[date[0]] == undefined) {
                    pm10array[date[0]] = []
                    pm2_5array[date[0]] = []
               }
               datesarray.push(date[0])
               pm10array[date[0]].push(results.pm10[i]);
               pm2_5array[date[0]].push(results.pm2_5[i]);

               
            }
                        
            dates = datesarray.unique();
            pm2_5mediums = []
            pm10mediums = []
            dates.forEach((d) => {                
                pm2_5mediums.push(getMedium(pm2_5array[d])) 
                pm10mediums.push(getMedium(pm10array[d]))                
            })


            const ctx = document.getElementById('myChart');

                new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates, //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'pm2_5',
                        data: pm2_5mediums,
                        
                        borderWidth: 1
                    }, {
                        label: 'pm10',
                        data: pm10mediums,
                        
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                }
                });
            //console.log(pm10mediums)
            
        })
            
   }
   
})