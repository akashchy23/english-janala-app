const loadLesson = () =>{
    const url =("https://openapi.programming-hero.com/api/levels/all");
    fetch(url) //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data))
}

const displayLesson = (lessons) => {
    //   console.log(lessons)
    //   1 . GEt the container and make it empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2.Get into everylessons
    lessons.forEach( lesson => {
        console.log(lesson)
        // 3. Create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
             <button  class="btn btn-outline btn-primary">
             <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
             </button>
        `;
        // 4 . appand the child with parent
    levelContainer.appendChild(btnDiv)
    })

    
}
loadLesson()