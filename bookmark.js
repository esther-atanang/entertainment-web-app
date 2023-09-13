const showpage = document.querySelector(".the-shows")
const shows = document.querySelector(".shows-block")
const tvShow = document.querySelector(".tvShow-series")

//Switching between categories
   const categories = document.querySelectorAll(".categories path")
   const bookMarkedIcon = document.querySelector(".bookmarked")
    bookMarkedIcon.parentElement.classList.add("change")

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

//Searching for movies
const searchForm = document.querySelector(".search-movies")
const movieName = document.querySelector(".movie-name")
const searchMovieBtn = document.querySelector(".submit-movie")

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
        if(data.toLowerCase().includes(movieTitle.toLowerCase(),0) && movie.isBookmarked === true){
            num++
            searchSection.innerHTML += `<div class="search-results">
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
        showpage.innerHTML = `<h2 class="searchTitle">Found ${num} result${num > 1 ? 's' :''} for '${movieTitle}'</h2>`
       showpage.appendChild(searchSection)
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

const getData = async()=>{
    const response = await fetch("./data.json")
    const data = await response.json()
    data.forEach((value)=>{
        if(value.isBookmarked){
             displayShow(value)
        }
    })

    data.forEach((value)=>{
        if(value.isBookmarked){
             displayTvShow(value)
        }
    })
   
   
}

getData()


const displayShow = (value)=>{
    if(value.category === "Movie"){
    const show = document.createElement("div")
    const att = document.createAttribute("class")
    att.value = "show"
    show.setAttributeNode(att);
   show.innerHTML += `<div class="block">
                        <img class="thumbnail" src=${value.thumbnail.regular.small} alt="">
                        <a href="#" class="bookmark"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill=${value.isBookmarked ? "#FFF" : "none"} /></svg></a>
                         <div class="play"> 
                            <button class="btn" type="button"><img src="/assets/icon-play.svg" alt="" srcset=""></button>
                            <p>Play</p>
                        </div>
                        </div>
                    <div class="info">
                        <div class="first">
                            <div>
                                <p class="year">${value.year}</p>
                            </div>
                            <div class="dot"></div>
                            <div class="inner-first">
                                <img src="/assets/icon-category-movie.svg" alt="">
                                <p class="category">${value.category}</p>
                            </div>
                            <div class="dot"></div>
                            <div>
                                <p class="rating">${value.rating}</p>
                            </div>
                        </div>
                        <div class="second">
                            <h3 class="title">${value.title}</h3>
                        </div>`
    
    shows.appendChild(show)
    }
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

const displayTvShow = (value)=>{
    if(value.category === "TV Series"){
    const tvseriesShow = document.createElement("div")
    const att = document.createAttribute("class")
    att.value = "tv-show"
    tvseriesShow.setAttributeNode(att);
    tvseriesShow.innerHTML += `<div class="block">
                        <img class="thumbnail" src=${value.thumbnail.regular.small} alt="">
                        <a href="#" class="bookmark"><img class="book-img" src="/assets/icon-bookmark-${value.isBookmarked ? "full" : "empty"}.svg" alt=""></a>
                         <div class="play"> 
                            <button class="btn" type="button"><img src="/assets/icon-play.svg" alt="" srcset=""></button>
                            <p>Play</p>
                        </div>
                        </div>
                    <div class="info">
                        <div class="first">
                            <div>
                                <p class="year">${value.year}</p>
                            </div>
                            <div class="dot"></div>
                            <div class="inner-first">
                                <img src="/assets/icon-category-tv.svg" alt="">
                                <p class="category">${value.category}</p>
                            </div>
                            <div class="dot"></div>
                            <div>
                                <p class="rating">${value.rating}</p>
                            </div>
                        </div>
                        <div class="second">
                            <h3 class="title">${value.title}</h3>
                        </div>`
    
    tvShow.appendChild(tvseriesShow)
    }
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

