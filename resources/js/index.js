let uniqueId = () => Math.random().toString(36).substring(2, 9);
console.log(uniqueId());

function createAccordian(title, id) {
  return `
  <div class="accordion-item" id= "card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapseOne">
        <i class="fa-solid fa-angle-up me-2"></i> ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse show" aria-labelledby="heading${id}" data-bs-parent="#accordionId">
      
  </div>
  `;
}

function createCarouselOuter(id, innerId) {
  return `
    <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner" id=${innerId}>
        
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon carousel-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon carousel-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}


function createCarouselInner(id, active) {
  return `
    <div class="carousel-item ${active ? "active" : ""}" id=${id}>
          
    </div>
  `
}

function createCard(item) {
  return `
    <div>
      <div class="card">
      <img src=${item.enclosure.link} class="carousel-img img-fluid" alt=${item.author}>
      <div class="card-body mt-3">
        <h5 class="card-title">${item.title}</h5>
        <h5 class="card-subtitle mb-2 text-muted">${item.author}</h5>
        <p class="card-subtitle mb-2 text-secondary">${item.pubDate}</p>
        <p class="card-text">${item.description}</p>
        <a href=${item.link} class="btn btn-primary" target="_blank">${item.author}</a>
      </div>
    </div>
    </<div>
  `;
}


async function addContent() {
  for (let i = 0; i < magazines.length; i++) {
    let url = magazines[i];

    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
    );
    let data = await response.json();
    console.log(data);

    

    // accordian
    let accordianId = uniqueId();
    let accordionTitle = data.feed.title;
    let accordion = createAccordian(accordionTitle, accordianId);
    document.getElementById("accordionId").innerHTML += accordion;
    
    

    

    // carousel
    let carouseld = uniqueId()
    let carouselInnerId = uniqueId()
    let carousel = createCarouselOuter(carouseld, carouselInnerId)
    document.getElementById(`collapse${accordianId}`).innerHTML = carousel

    if (i == 0) {
      document.getElementById(`collapse${accordianId}`).classList.add("show");
    } else {
      document.getElementById(`collapse${accordianId}`).classList.remove("show");
    }

    

    //fetch items from data
    let items = data.items

    for (let j in items) {
      let card = createCard(items[j])
      let innerCarouselCardId = uniqueId()
      let innerCarouselCard = createCarouselInner(innerCarouselCardId, j == 0)
      document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    }
  }
}

addContent();
