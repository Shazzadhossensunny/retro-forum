let count = 0;

const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  const categories = data.posts;
  const categoryPostContainer = document.getElementById(
    "category-post-container"
  );
  categoryPostContainer.innerText = "";
  categories.forEach((category) => {
    const divCard = document.createElement("div");
    divCard.className =
      "card border border-[#797DFC] rounded-3xl bg-[#F3F3F5] p-5 lg:p-10 flex flex-col lg:flex-row gap-6";

    let badge = "";
    if (category.isActive === true) {
      badge = `<div class="notification w-4 h-4 rounded-full bg-[#10B981] border-2 border-white absolute right-0 -top-1"
            ></div>`;
    } else {
      badge = `<div class="notification w-4 h-4 rounded-full bg-red-600 border-2 border-white absolute right-0 -top-1"
            ></div>`;
    }

    divCard.innerHTML = `
            <!-- profile pic -->
            <div class="w-20 h-20 rounded-2xl bg-white relative">
              ${badge}
              <img
                class="w-full h-full object-cover object-center rounded-2xl"
                src="${category.image}"
                alt=""
              />
            </div>
            <!-- details -->
            <div class="w-full">
              <!-- category & author -->
              <div
                class="flex gap-5 font-[inter] text-sm font-medium text-[#12132DCC] mb-3"
              >
                <div><span>#</span><span>${category.category}</span></div>
                <div><span>Author</span> : <span>${category.author.name}</span></div>
              </div>
              <!-- title -->
              <h3 class="cat-title text-[#12132D] text-xl font-bold mb-4">${category.title}</h3>
              <!-- para -->
              <p
                class="text-[#12132D99] font-[inter] text-base font-normal w-full lg:w-3/4">${category.description}</p>
              <div class="border border-[#12132D40] border-dashed my-5"></div>
              <!-- bottom -->
              <div class="flex justify-between items-center">
                <div class="flex gap-4 lg:gap-6">
                  <div
                    class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                  >
                    <i class="fa-regular fa-message"></i>
                    <span>${category.comment_count}</span>
                  </div>
                  <div
                    class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                  >
                    <i class="fa-regular fa-eye"></i>
                    <span id="cat-view">${category.view_count}</span>
                  </div>
                  <div
                    class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                  >
                    <i class="fa-regular fa-clock"></i>
                    <span>${category.posted_time}</span>
                  </div>
                </div>
                <div>
                  <button class="catBtn btn btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_57_457)">
                        <path
                          d="M13.9998 0C6.26805 0 9.15527e-05 6.26814 9.15527e-05 13.9999C9.15527e-05 21.7314 6.26805 28 13.9998 28C21.7315 28 27.9999 21.7314 27.9999 13.9999C27.9999 6.26814 21.7315 0 13.9998 0ZM14 4.91741L22.2847 10.0835H5.71542L14 4.91741ZM22.3879 18.333H22.3871C22.3871 19.1616 21.7155 19.8331 20.887 19.8331H7.1131C6.28447 19.8331 5.61303 19.1615 5.61303 18.333V10.4122C5.61303 10.3245 5.62199 10.2393 5.63655 10.1556L13.552 15.0914C13.5617 15.0975 13.5721 15.1016 13.5821 15.1072C13.5925 15.113 13.6032 15.1186 13.6138 15.1239C13.6697 15.1527 13.7273 15.176 13.7862 15.1912C13.7923 15.1929 13.7983 15.1936 13.8044 15.195C13.869 15.2102 13.9344 15.2197 13.9998 15.2197H14.0002C14.0007 15.2197 14.0012 15.2197 14.0012 15.2197C14.0665 15.2197 14.1319 15.2105 14.1965 15.195C14.2026 15.1935 14.2086 15.1929 14.2147 15.1912C14.2735 15.176 14.3309 15.1527 14.3871 15.1239C14.3977 15.1186 14.4084 15.113 14.4188 15.1072C14.4287 15.1016 14.4392 15.0975 14.4489 15.0914L22.3644 10.1556C22.3789 10.2393 22.3879 10.3244 22.3879 10.4122V18.333Z"
                          fill="#10B981"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_57_457">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
        `;
    categoryPostContainer.appendChild(divCard);
  });

  const catBtns = document.querySelectorAll(".catBtn");
  const showCatView = document.getElementById("show-cat-view");
  const showCount = document.getElementById("count-cat-post");
  const cards = document.querySelectorAll(".card");
  let previousCardIndex = null;
  catBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      if (previousCardIndex !== null) {
        cards[previousCardIndex].style.backgroundColor = "";
      }

      count = count + 1;
      showCount.innerText = count;
      const singleCard = cards[index];
      singleCard.style.backgroundColor = "#797DFC1A";
      const category = categories[index];
      const div = document.createElement("div");
      div.className =
        "rounded-2xl bg-white p-4 flex items-center justify-between";
      div.innerHTML = `
                <h3 class="text-[#12132D] text-base font-semibold w-3/4">${category.title}</h3>
                <p class="flex items-center gap-3 text-[#12132D99] text-base font-normal">
                    <i class="fa-regular fa-eye"></i>
                    <span>${category.view_count}</span>
                </p>
            `;

      showCatView.appendChild(div);
      previousCardIndex = index;
    });
  });
};

const loadPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const postContainer = document.getElementById("posts-container");
  data.forEach((post) => {
    const divCard = document.createElement("div");
    divCard.className =
      "card border border-[#12132D26] rounded-3xl bg-white p-4 lg:p-6";
    divCard.innerHTML = `
        <figure>
          <img
            src="${post.cover_image}"
            alt=""
            class="rounded-2xl"
          />
        </figure>
        <div class="card-body p-0">
          <div
            class="flex gap-2 items-center text-[#12132D99] text-base font-normal mt-6"
          >
            <i class="fa-regular fa-calendar"></i>
            <p>${post.author?.posted_date || "No Publish Date"} </p>
          </div>

          <h2 class="text-[#12132D] text-lg font-extrabold mt-4">
          ${post.title}
          </h2>
          <p class="text-[#12132D99] text-base font-normal mt-3">
          ${post.description}
          </p>
          <div class="flex gap-4 mt-4">
            <div class="w-11 h-11">
              <img
                class="rounded-full w-full h-full object-cover object-center"
                src="${post.profile_image}"
                alt=""
              />
            </div>
            <div class="space-y-1">
              <h3 class="text-[#12132D] text-base font-bold">
              ${post.author?.name}
              </h3>
              <h4 class="text-[#12132D99] text-sm font-normal">
              ${post.author?.designation || "Unknown"}
              </h4>
            </div>
          </div>
        </div>

        `;
    postContainer.appendChild(divCard);
  });
};

const loadCategorySearch = async (searchPost) => {
  const loader = document.getElementById("loader");
  const showCatView = document.getElementById("show-cat-view");
  const showCount = document.getElementById("count-cat-post");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchPost}`
  );
  const data = await res.json();
  const categories = data.posts;
  const categoryPostContainer = document.getElementById(
    "category-post-container"
  );
  categoryPostContainer.innerText = "";
  showCatView.innerText = "";
  showCount.innerText = 0;
  categories.forEach((category) => {
    setTimeout(() => {
      loader.classList.add("hidden");
      const divCard = document.createElement("div");
      divCard.className =
        "border border-[#797DFC] rounded-3xl bg-[#F3F3F5] p-5 lg:p-10 flex flex-col lg:flex-row gap-6";
      let badge = "";
      if (category.isActive === true) {
        badge = `<div class="notification w-4 h-4 rounded-full bg-[#10B981] border-2 border-white absolute right-0 -top-1"
              ></div>`;
      } else {
        badge = `<div class="notification w-4 h-4 rounded-full bg-red-600 border-2 border-white absolute right-0 -top-1"
              ></div>`;
      }

      divCard.innerHTML = `
              <!-- profile pic -->
              <div class="w-20 h-20 rounded-2xl bg-white relative">
                ${badge}
                <img
                  class="w-full h-full object-cover object-center rounded-2xl"
                  src="${category.image}"
                  alt=""
                />
              </div>
              <!-- details -->
              <div class="w-full">
                <!-- category & author -->
                <div
                  class="flex gap-5 font-[inter] text-sm font-medium text-[#12132DCC] mb-3"
                >
                  <div><span>#</span><span>${category.category}</span></div>
                  <div><span>Author</span> : <span>${category.author.name}</span></div>
                </div>
                <!-- title -->
                <h3 class="cat-title text-[#12132D] text-xl font-bold mb-4">${category.title}</h3>
                <!-- para -->
                <p
                  class="text-[#12132D99] font-[inter] text-base font-normal w-full lg:w-3/4">${category.description}</p>
                <div class="border border-[#12132D40] border-dashed my-5"></div>
                <!-- bottom -->
                <div class="flex justify-between items-center">
                  <div class="flex gap-4 lg:gap-6">
                    <div
                      class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                    >
                      <i class="fa-regular fa-message"></i>
                      <span>${category.comment_count}</span>
                    </div>
                    <div
                      class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                    >
                      <i class="fa-regular fa-eye"></i>
                      <span id="cat-view">${category.view_count}</span>
                    </div>
                    <div
                      class="flex items-center gap-3 text-[#12132D99] text-base font-normal"
                    >
                      <i class="fa-regular fa-clock"></i>
                      <span>${category.posted_time}</span>
                    </div>
                  </div>
                  <div>
                    <button class="catBtn btn btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_57_457)">
                          <path
                            d="M13.9998 0C6.26805 0 9.15527e-05 6.26814 9.15527e-05 13.9999C9.15527e-05 21.7314 6.26805 28 13.9998 28C21.7315 28 27.9999 21.7314 27.9999 13.9999C27.9999 6.26814 21.7315 0 13.9998 0ZM14 4.91741L22.2847 10.0835H5.71542L14 4.91741ZM22.3879 18.333H22.3871C22.3871 19.1616 21.7155 19.8331 20.887 19.8331H7.1131C6.28447 19.8331 5.61303 19.1615 5.61303 18.333V10.4122C5.61303 10.3245 5.62199 10.2393 5.63655 10.1556L13.552 15.0914C13.5617 15.0975 13.5721 15.1016 13.5821 15.1072C13.5925 15.113 13.6032 15.1186 13.6138 15.1239C13.6697 15.1527 13.7273 15.176 13.7862 15.1912C13.7923 15.1929 13.7983 15.1936 13.8044 15.195C13.869 15.2102 13.9344 15.2197 13.9998 15.2197H14.0002C14.0007 15.2197 14.0012 15.2197 14.0012 15.2197C14.0665 15.2197 14.1319 15.2105 14.1965 15.195C14.2026 15.1935 14.2086 15.1929 14.2147 15.1912C14.2735 15.176 14.3309 15.1527 14.3871 15.1239C14.3977 15.1186 14.4084 15.113 14.4188 15.1072C14.4287 15.1016 14.4392 15.0975 14.4489 15.0914L22.3644 10.1556C22.3789 10.2393 22.3879 10.3244 22.3879 10.4122V18.333Z"
                            fill="#10B981"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_57_457">
                            <rect width="28" height="28" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          `;
      categoryPostContainer.appendChild(divCard);
    }, 2000);
  });
};

const searchPost = async () => {
  const inputField = document.getElementById("input-field").value;

  if (document.getElementById("input-field").value !== "") {
    loader.classList.remove("hidden");
  }
  if(document.getElementById("input-field").value == ""){
    alert('Please Input Correct Category')
    return;
  }
  loadCategorySearch(inputField);

};
loadPosts();
loadCategory();
