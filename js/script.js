const countryCodes = {
    'India': 'in',
    'USA': 'us',
    'England': 'gb',
    'Canada': 'ca'
}

console.log('This is news website');
const api = '009105e07e7a4e588b98abf393a48bf3';
const accordianList = document.getElementById('news-highlights');
let countryName = 'India';

function changeCountry(id) {
    let clickedEle = document.getElementById(id);
    let countryName = clickedEle.innerText;
    console.log(clickedEle.innerText);
    let allCountries = document.querySelector('.nav-pills').children;
    for (let i=0; i< allCountries.length; i++) {
        console.log(allCountries[i].firstElementChild);
        allCountries[i].firstElementChild.classList.remove('active');
    }
    clickedEle.classList.add('active');
    loadData(countryName);
}

function loadData(countryName) {
    let countryCode = countryCodes[countryName];
    let accordian = '';
    // const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${api}`;
    const url = `${countryCode}.json`;
    console.log(url);
    let xml = new XMLHttpRequest();
    xml.open('GET',url, true);
    xml.onprogress = function () {
        console.log('Loading...');
    }
    xml.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(this.response);
            console.log(data);
            data.articles.forEach((news, index) => {
                if (index < 5) {
                    accordian += `<div class="accordion-item">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                        ${news.title}
                                    </button>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#news-highlights">
                                    <div class="accordion-body">
                                        ${news.description}
                                        - <strong>${news.author}</strong> 
                                    </div>
                                </div>
                            </div>`;
                } 
            });
            accordianList.innerHTML = accordian;
        } else {
            console.log('Some error occurred');
        }
    }
    xml.send();
}

loadData(countryName);
