//I have to store it in a local Storage
//I feel like i need to get dirty with backend technology, I sorta like it
const categories = document.querySelectorAll(".categories path")
   const homeIcon = document.querySelector(".home")
   homeIcon.parentElement.classList.add("change")
   
   categories.forEach((btn)=>{
     btn.addEventListener("click", (e)=>{
        if(e.target.matches(".home")){
            location.assign("./index.html")

        }
        if(e.target.matches(".movies")){
            location.assign("./movies.html")
        }
        if(e.target.matches(".tv")){
            location.assign("./tv-series.html")
        }
        if(e.target.matches(".bookmarked")){
            location.assign("./bookmarked.html")
        }
     })
   })

   

const searchForm = document.querySelector(".search-movies")
const movieName = document.querySelector(".movie-name")
const searchMovieBtn = document.querySelector(".submit-movie")
const content = document.querySelector(".content")
//Main site
const trend = document.querySelector(".trend");
const recommended = document.querySelector(".recommend-movies")
const getData = async () =>{
  const response = await fetch("./data.json");
  const data = await response.json();
  
  data.forEach(element => {
    if(element.isTrending)
    {
      displayTrendingData(element)
    }
    
      displayRecommended(element,element.isBookmarked)
    
  });

  
}

getData()


//Searching for movies
 searchForm.addEventListener("submit",async(e)=>{
    e.preventDefault()
    let num = 0
     const response = await fetch("./data.json");
     const data = await response.json();
     let movieTitle = movieName.value
     const searchSection = document.createElement("div")
     const att = document.createAttribute("class")
     att.value = "search-content"
     searchSection.setAttributeNode(att);
     data.forEach((movie)=>{
        let data = movie.title
        if(data.toLowerCase().includes(movieTitle.toLowerCase(),0)){
            num++
            searchSection.innerHTML += `<div class="search-results">
                <div class="block">
                        <img class="thumbnail" src=${movie.thumbnail.regular.small} alt="">
                        <a href="#" class="bookmark"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill="none"/></svg></a>
                         <div class="play"> 
                            <button class="btn" type="button"><img src="/assets/icon-play.svg" alt="" srcset=""></button>
                            <p>Play</p>
                        </div>
                        </div>
                    <div class="info">
                        <div class="first">
                            <div>
                                <p class="year">${movie.year}</p>
                            </div>
                            <div class="dot"></div>
                            <div class="inner-first">
                                <img src="/assets/icon-category-movie.svg" alt="">
                                <p class="category">${movie.category}</p>
                            </div>
                            <div class="dot"></div>
                            <div>
                                <p class="rating">${movie.rating}</p>
                            </div>
                        </div>
                        <div class="second">
                            <h3 class="title">${movie.title}</h3>
                        </div>
        </div>`
        }
        content.innerHTML = `<h2 class="searchTitle">Found ${num} result${num > 1 ? 's' :''} for '${movieTitle}'</h2>`
       content.appendChild(searchSection)
     })
    const Movie = document.querySelectorAll(".block")
Movie.forEach(value=>{
  value.addEventListener("mouseover", (e)=>{
    if(value.classList.contains("active") === false)
        value.classList.add("active")
  })
  value.addEventListener("mouseout", ()=>{
     value.classList.remove("active")
  })
})
  })






const category = (value) =>{
   let url;
   if(value === "TV Series"){
      url = "/assets/icon-category-tv.svg"
   }else{
      url = "/assets/icon-category-movie.svg"
   }
   return url;
}
const displayTrendingData = (data) =>{
  const trendingMovie = document.createElement('div');
  const att = document.createAttribute('class')
  att.value = "movie";
  trendingMovie.setAttributeNode(att);
  trendingMovie.innerHTML += `<div class="block">
                    <img class="thumbnail" src=${data.thumbnail.trending.small} alt="">
                    <a href="#" class="bookmark"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill=${data.isBookmarked ? "#FFF" : "none"} /></svg></a>
                    <div class="info">
                        <div class="first">
                            <div>
                                <p class="year">${data.year}</p>
                            </div>
                            <div class="dot"></div>
                            <div class="inner-first">
                                <img src=${category(data.category)} alt="">
                                <p class="category">${data.category}</p>
                            </div>
                            <div class="dot"></div>
                            <div>
                                <p class="rating">${data.rating}</p>
                            </div>
                        </div>
                        <div class="second">
                            <h3 class="title">${data.title}</h3>
                        </div>
                    </div>
                    <div class="play"> 
                            <button class="btn" type="button"><img src="/assets/icon-play.svg" alt="" srcset=""></button>
                            <p>Play</p>
                        </div>
                </div>`
  trend.appendChild(trendingMovie)
const Movie = document.querySelectorAll(".block")
Movie.forEach(value=>{
  value.addEventListener("mouseover", (e)=>{
    if(value.classList.contains("active") === false)
        value.classList.add("active")
  })
  value.addEventListener("mouseout", ()=>{
     value.classList.remove("active")
  })
})

const bookmarkedBtn = document.querySelectorAll(".bookmark path")
bookmarkedBtn.forEach((value)=>{
    value.addEventListener("click", ()=>{
         const parent = value.parentElement.parentElement.parentElement
         const title = parent.querySelector(".title")
        if(data.title === title.textContent){
           if(data.isBookmarked){
            //i HAVE TO GET into the database and change the value and then return that to the dataBase
             data.isBookmarked = false
           }else{
              data.isBookmarked = true
           }
        }
    })
})
}

const displayRecommended = (movie,checkbookMark)=>{
  const recMovie = document.createElement("div")
  const att = document.createAttribute("class")
  att.value = "movies"
  recMovie.setAttributeNode(att)
  recMovie.innerHTML += `
                <div class="movie">
                    <div class="block">
                        <img class="thumbnail" src=${movie.thumbnail.regular.small} alt="">
                        <a href="#" class="bookmark"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill=${movie.isBookmarked ? "#FFF" : "none"} /></svg></a>
                         <div class="play"> 
                            <button class="btn" type="button"><img src="/assets/icon-play.svg" alt="" srcset=""></button>
                            <p>Play</p>
                        </div>
                        </div>
                    <div class="info">
                        <div class="first">
                            <div>
                                <p class="year">${movie.year}</p>
                            </div>
                            <div class="dot"></div>
                            <div class="inner-first">
                                <img src=${category(movie.category)} alt="">
                                <p class="category">${movie.category}</p>
                            </div>
                            <div class="dot"></div>
                            <div>
                                <p class="rating">${movie.rating}</p>
                            </div>
                        </div>
                        <div class="second">
                            <h3 class="title">${movie.title}</h3>
                        </div>
                    </div>`
recommended.appendChild(recMovie)
const Movie = document.querySelectorAll(".block")
Movie.forEach(value=>{
  value.addEventListener("mouseover", (e)=>{
    if(value.classList.contains("active") === false)
        value.classList.add("active")
  })
  value.addEventListener("mouseout", ()=>{
     value.classList.remove("active")
  })
})


}



