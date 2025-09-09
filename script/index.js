const loadLesson = () =>{
    const url =("https://openapi.programming-hero.com/api/levels/all");
    fetch(url) //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data))
}

const toLoadWord = (id) => {
    
    const url = (`https://openapi.programming-hero.com/api/level/ ${id}`);
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data)) 
}

const displayLevelWord =(words) =>{
    // console.log(words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    
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
        console.log(word)
        const card = document.createElement("div");
        card.innerHTML =`
         <div class="bg-white rounded-lg shadow-sm text-center py-12 px-5 space-y-5">
            <h2 class="font-bold text-xl"> ${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <h1 class="font-bangla font-semibold text-2xl">" ${word.meaning}/ ${word.pronunciation} "</h1>
            <div class="flex justify-between items-center">
                     <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                     <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

         </div>
        `;
        wordContainer.append(card)
    }
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
             <button  onclick="toLoadWord(${lesson.level_no})"  class="btn btn-outline btn-primary">
             <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
             </button>
        `;
        // 4 . appand the child with parent
    levelContainer.appendChild(btnDiv)
    })

    
}
loadLesson()