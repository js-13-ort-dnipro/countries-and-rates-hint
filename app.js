
    const ratesURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    const countriesURL = "https://restcountries.com/v3.1/all";

    let rates = await fetch(ratesURL);
        rates = await rates.json();

    let countries = await fetch(countriesURL);
        countries = await countries.json();

    countries = countries
                    .filter(item => item.currencies)
                    .map(item => ({
                        title: item.name.common,
                        flag: item.flags.png,
                        cc: Object.keys(item.currencies)
                    }));

    console.log(countries); //К этому моменту в countries у нас массив с данными о странах, в котором каждый элемент - объект с полями: Название, Флаг, Перечень используемых валют (массив). Стоит обратить внимание в некоторых странах больше чем одна оффициальная валюта.

    for(let rate of rates){
        rate.countries = countries.filter(item => item.cc.includes(rate.cc));
    }
  
    console.log(rates); //Тут массив курсов с вложенными массивами стран-пользователей валюты.
