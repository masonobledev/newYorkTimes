const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'TqsG3oJ405s3UPrABKugqdxXgJXHPV7O'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';
let pageNumber = 0;
console.log('PageNumber:', pageNumber);
let displayNav = false;

        //1                     //2   
    searchForm.addEventListener('submit', fetchResults); 
    nextBtn.addEventListener('click', nextPage); //3
    previousBtn.addEventListener('click', previousPage); //3

                    //1
    function fetchResults(e){
        e.preventDefault();  //2
          // Assemble the full URL
        //   url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
        url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=TqsG3oJ405s3UPrABKugqdxXgJXHPV7O&page='
        
        if(startDate.value !== '') {
            console.log(startDate.value)
          url += '&begin_date=' + startDate.value;
        };
      
        if(endDate.value !== '') {
          url += '&end_date=' + endDate.value;
        };

         //1
        fetch(url)
        .then(function(result) {
        console.log(result)
        return result.json(); //2
        }).then(function(json) {
            displayResults(json); //3
        });
        
        function displayResults(json) {
            let articles = json.response.docs;
            
            while (section.firstChild) {
                section.removeChild(section.firstChild);
            }

            if(articles.length === 0) {
                console.log("No results");
              } else {
                for(let i = 0; i < articles.length; i++) {
                    let article = document.createElement('article'); //1
                    let heading = document.createElement('h2'); //2
                    let link = document.createElement('a');
                    let img = document.createElement('img');
                    let para = document.createElement('p');   //1
                    let clearfix = document.createElement('div'); //2 

                    let current = articles[i];
                    console.log("Current:", current);

                    link.href = current.web_url; //4
                    link.textContent = current.headline.main; //5

                    para.textContent = 'Keywords: ';

                    for(let j = 0; j < current.keywords.length; j++) {
                        //5
                        let span = document.createElement('span');   
                        //6
                        span.textContent += current.keywords[j].value + ' ';   
                        //7
                        para.appendChild(span);
                      }

                      if(current.multimedia.length > 0) {
                        //3
                        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                        //4
                        img.alt = current.headline.main;
                      }
                    
                    clearfix.setAttribute('class','clearfix');

                    article.appendChild(heading); //3
                    heading.appendChild(link);
                    article.appendChild(img);
                    article.appendChild(para);
                    article.appendChild(clearfix);
                    section.appendChild(article); //4
                

                    if(articles.length >= 10) {
                        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
                    } else {
                        nav.style.display = 'none'; //hides the nav display if less than 10 items are in the array
                        }
                }
            }  

             
        };
        
    };

            function nextPage(e){
                pageNumber++; //1
                fetchResults(e);  //2
                console.log("Page number:", pageNumber);
            } //5
      
            function previousPage(e){
                if(pageNumber > 0) { //1
                    pageNumber--; //2
                  } else {
                    return; //3
                  }
                  fetchResults(e); //4
                  console.log("Page:", pageNumber); //5
            } //5

