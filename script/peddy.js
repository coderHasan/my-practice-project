const cardContainer = document.getElementById("card-container");

// Remove active button
const removeActive = () => {
  const activeRemove = document.getElementsByClassName("active-btn");
  for (const btn of activeRemove) {
    btn.classList.remove("active");
  }
};

// Cetagory Button
const loadCetagory = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  {
    handleCetagory(data.categories);
  }
};
// Cetagory All Card
const loadCard = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  {
    handleCard(data.pets);
  }
};

//Loader
const showLoader = () => {
  const show = document.getElementById("loader");
  show.classList.remove("hidden");
};
const hiddenLoader = () => {
  const show = document.getElementById("loader");
  show.classList.add("hidden");
};

// different Cetagory Card
const loadCetagoryCard = async (cetagory) => {
  showLoader();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${cetagory}`
  );
  const data = await res.json();

  {
    removeActive();

    const activeBtn = document.getElementById(`btn-${cetagory}`);
    activeBtn.classList.add("active");

    cardContainer.classList.add("invisible");
    setTimeout(() => {
      handleCard(data.data);
      hiddenLoader();
      cardContainer.classList.remove("invisible");
    }, 2000);
  }
};

// Details Cetagory
const detailsCetagory = async (peddyId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${peddyId}`
  );
  const data = await res.json();

  {
    loadDetails(data.petData);
  }
};
// sidebar
const addSideBar = async (pedId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${pedId}`
  );
  const data = await res.json();
  loadSideBar(data.petData);
};
const loadSideBar = (side) => {
  const pushCard = document.getElementById("push-card");

  pushCard.innerHTML += `
        <div class="mx-auto w-full">
            <img class="w-full rounded-lg mb-4" src=${side.image}/>
        </div>
`;
};

// Count Modal

const count = document.getElementById("count");
const modal = document.getElementById("modal");

const adopModal = () => {
  modal.classList.add("modal-open");
  let displayCount = 2;
  count.innerText = displayCount;
  const countDown = setInterval(() => {
    displayCount--;
    count.innerText = displayCount;

    if (displayCount <= 0) {
      clearInterval(countDown);
    }
  }, 1000);

  setTimeout(() => {
    modal.classList.remove("modal-open");
  }, 2000);
};

// Display Details
const loadDetails = (details) => {
  const detailContainer = document.getElementById("detail-container");
  detailContainer.innerHTML = `
          <div class="flex flex-col">
                <div class="mx-auto w-full">
                    <img class="w-full rounded-lg mb-4" src=${details.image}/>
                </div>
          <div class="">
              <div class="text-left">
                      <div><h1 class="text-xl font-bold mb-3">${details.pet_name}</h1></div>
                
                
                    <div class="flex gap-5 border-b pb-5 mb-5">

                        <div>
                          <p class="text-gray-500 text-sm"><span><i class="fa-solid fa-border-all"></i></span> Breed: ${details.breed}</p>
                          
                          <p class="text-gray-500 text-sm"><span><i class="fa-solid fa-mars-stroke-up"></i></span> Gender: ${details.gender}</p>
                          <p class="text-gray-500 text-sm"><span><i class="fa-solid fa-mars-stroke-up"></i></span> vaccinated_status: ${details.vaccinated_status}</p>
                        </div>
                    
                        <div>
                            <p class="text-gray-500 text-sm"><span><i class="fa-regular fa-calendar-days"></i></span> Birth: ${details.date_of_birth}</p>
                            <p class="text-gray-500 text-sm  pb-4 mb-4"><span><i class="fa-solid fa-dollar-sign"></i></span> Price: ${details.price}</p>
                        </div>
                    
                    </div>

                    <div>
                          <h1 class="text-xl font-bold mb-3">Details Information</h1>
                          <p class="mb-5 text-sm text-gray-500">${details.pet_details}</p>
                    </div>

              </div>
          </div>
          </div>
      `;
  document.getElementById("cetagoryDetsils").showModal();
};
// Display Cetagory
const handleCetagory = (cetagory) => {
  const cetagorys = document.getElementById("cetagory");

  cetagory.forEach((item) => {
    const cetagoryContainer = document.createElement("div");

    cetagoryContainer.innerHTML = `

            <button 
            onclick="loadCetagoryCard('${item.category}')" 
            id="btn-${item.category}" 
            class="btn active-btn bg-transparent hover:bg-transparent px-10"
            >
                <div class="w-7">
                    <img src=${item.category_icon}/>
                </div>
                <p>${item.category}</p>
            </button>

        `;
    cetagorys.appendChild(cetagoryContainer);
  });
};
// Display Card
const handleCard = (cardPest) => {
  cardContainer.innerHTML = "";
  if (cardPest.length == 0) {
    cardContainer.innerHTML = `
        <div class="text-center ">
            <div>
                <img class="mx-auto" src="./images/error.webp"/>
            </div>

            <h1 class="text-2xl font-extrabold my-4">No Information Available</h1>
            <p class="w-8/12 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
    `;
    cardContainer.classList.remove("grid");
  } else {
    cardContainer.classList.add("grid");
  }

  cardPest.forEach((item) => {
    const { petId, breed, date_of_birth, price, image, gender, pet_name } =
      item;

    const cardDivition = document.createElement("div");
    cardDivition.innerHTML = `
        
       

            <div class="card border">
            <figure>
                <div>
            <img src=${image}/>
        </div>
            </figure>
            <div class="card-body">

            <div>
            <h1 class="text-xl font-bold mb-3">${pet_name || "N/A"}</h1>
            <p class="text-gray-500 text-sm"><span><i class="fa-solid fa-border-all"></i></span> Breed: ${
              breed || "N/A"
            }</p>
            <p class="text-gray-500 text-sm"><span><i class="fa-regular fa-calendar-days"></i></span> Birth: ${
              date_of_birth || "N/A"
            }</p>
            <p class="text-gray-500 text-sm"><span><i class="fa-solid fa-mars-stroke-up"></i></span> Gender: ${
              gender || "N/A"
            }</p>
            <p class="text-gray-500 text-sm border-b border-gray-300 pb-4 mb-4"><span><i class="fa-solid fa-dollar-sign"></i></span> Price: ${
              price || "N/A"
            }</p>
            </div>

              <div class=" flex flex-row justify-between text-[#0E7A81]">
                <button onclick="addSideBar('${petId}')" class="btn badge badge-outline"><i class="fa-solid fa-thumbs-up"></i></button>
                <button onclick="adopModal()" id="adop-btn" class="btn badge badge-outline">Adopt</button>
                <button onclick="detailsCetagory('${petId}')" class="btn badge badge-outline">Details</button>
              </div>
            </div>
            </div>

    `;

    cardContainer.appendChild(cardDivition);
  });
};

//

loadCetagory();
loadCard();
