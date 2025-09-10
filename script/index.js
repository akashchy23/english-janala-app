const createElements = (arr) =>{
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));
}

const manageSpinner =(status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else{
         document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

const loadLesson = () =>{
    const url =("https://openapi.programming-hero.com/api/levels/all");
    fetch(url) //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data))
}

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}

const toLoadWord = (id) => {
    manageSpinner(true);
    const url = (`https://openapi.programming-hero.com/api/level/ ${id}`);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive() //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)

        clickBtn.classList.add("active") // add active class
        displayLevelWord(data.data)
    }) 
}

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/ ${id}`
    console.log(url);
    const res = await fetch(url) ;
    const details = await res.json();
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    // console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
         <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms</h2>
            <div class=""> ${createElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById("word_modal").showModal()

}
const displayLevelWord =(words) =>{
    // console.log(words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if(words.length == 0){
        alert("there  is no keyword")
         wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-5">
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</h2>
          </div>
         `;
         manageSpinner(false);
         return;

    }
    
    /*
    {
    "id": 105,
    "level": 2,
    "word": "Rain",
    "meaning": "বৃষ্টি",
    "pronunciation": "রেইন"
}
    */
    for(const word of words){
        // console.log(word)
        const card = document.createElement("div");
        card.innerHTML =`
         <div class="bg-white rounded-lg shadow-sm text-center py-12 px-5 space-y-5">
            <h2 class="font-bold text-xl"> ${word.word? word.word : "শব্দ পাওয়া যায় নাই"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <h1 class="font-bangla font-semibold text-2xl">" ${word.meaning? word.meaning : "অর্থ পাওয়া যায় নি"}/ ${word.pronunciation? word.pronunciation :"pronunciation পাওয়া যায় নাই"} "</h1>
            <div class="flex justify-between items-center">
                     <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                     <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

         </div>
        `;
        wordContainer.append(card)
    }
    manageSpinner(false);
};

const displayLesson = (lessons) => {
    //   console.log(lessons)
    //   1 . GEt the container and make it empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2.Get into everylessons
    lessons.forEach( lesson => {
        // console.log(lesson)
        // 3. Create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
             <button id="lesson-btn-${lesson.level_no}" onclick="toLoadWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
             <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
             </button>
        `;
        // 4 . appand the child with parent
    levelContainer.appendChild(btnDiv)
    })

    
}
loadLesson()