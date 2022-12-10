async function init(magazines){
    await magazines.forEach(async (magazine, ind)=>{
        let data = await fetchMagazineData(magazine);
        addHeadingsToAccordion(data,ind);
        addCarouselToDOM(data.items, ind);
    })
    }
async function fetchMagazineData(magazineURL) {
    try{
        const response = fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazineURL}`);
        const data =  await (await response).json();
        return data;
    }
    catch(err){
        return null;
    }
}
function addHeadingsToAccordion(dataObj,ind){
    const heading1 = document.getElementById(`accordian-heading-${ind}`);
    heading1.innerHTML = `
        <span class="accordion-header-span">
            ${dataObj.feed.title}
        </span>
    `;
}

function addCarouselToDOM(items, id){
    const carouselInner = document.createElement('div');
    carouselInner.setAttribute('class',"carousel-inner");
    items.forEach((item)=>{
        const carouselItem = document.createElement('div');
        carouselItem.setAttribute("class", "carousel-item");
        const date = new Date(item.pubDate);
        const printDate = date.getDate() +'/'+ (date.getMonth()+1) +'/'+(date.getFullYear() % 100);
        carouselItem.innerHTML = `
        <a href="${item.link}">
            <div class="card">
                <img src="${item.enclosure.link}" class="card-img-top" alt="card Image">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="d-flex cc-container">
                        <span class"cc-author">${item.author}</span>
                        <ul>
                            <li><div class"cc-pubDate">${printDate}</li>
                        </ul>
                    </div>
                    <p class="card-text">${item.content}</p>
                </div>
            </div>
        </a>
        `;
        carouselInner.appendChild(carouselItem);
    })
    carouselInner.firstChild.className += " active";
    const carousel = document.createElement('div');
    carousel.setAttribute('class',"carousel slide");
    carousel.setAttribute('id',`carouselExampleControls-${id}`);
    carousel.setAttribute("data-bs-ride","carousel");

    carousel.innerHTML = `
    ${carouselInner.outerHTML}
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    `;
    const  container = document.getElementById(`panelsStayOpen-collapse-${id}`);
    container.innerHTML = `
    <div class="accordion-body">
        ${carousel.outerHTML}
    </div>
    `;

}
export {init};