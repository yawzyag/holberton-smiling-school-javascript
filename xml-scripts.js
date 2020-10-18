const carrouselLoading = (element, loading, color) => {
  if (!element) return;
  if (loading) {
    element.innerHTML = `<div class="w-100 d-flex justify-content-center align-items-center" id="loader"><div class="spinner-border ${color}" role="status">
    <span class="sr-only">Loading...</span></div></div>`;
  } else {
    element.parentNode.removeChild(element);
  }
};

const createCarrousel = (controls, type) => {
  const carrousel = document
    .getElementById(type)
    .getElementsByClassName("carousel")[0];
  const div = document.createElement("div");
  div.classList.add("carousel-inner");
  div.classList.add("container");
  div.classList.add("carrousel-content");

  const aPrev = document.createElement("a");
  aPrev.classList.add("carousel-control-prev");
  aPrev.setAttribute("href", controls);
  aPrev.setAttribute("role", "button");
  aPrev.setAttribute("data-slide", "prev");
  aPrev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>`;

  const aNext = document.createElement("a");
  aNext.classList.add("carousel-control-next");
  aNext.setAttribute("href", controls);
  aNext.setAttribute("role", "button");
  aNext.setAttribute("data-slide", "next");
  aNext.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>`;

  carrousel.appendChild(div);
  carrousel.appendChild(aPrev);
  carrousel.appendChild(aNext);
};

const createCarrouselPopular = (controls, type) => {
  const carrousel = document
    .getElementById(type)
    .getElementsByClassName("carousel")[0];
  const div = document.createElement("div");
  div.classList.add("carousel-inner");
  div.classList.add("container");
  div.classList.add("carrousel-content");

  const text = document.createElement("div");
  text.classList.add("text-center");
  text.innerHTML = `
  ${
    type === "popular"
      ? `<h2>
          Most <span class="text-primary">popular</span> tutorials
        </h2>`
      : `<h2><span class="text-primary">Latest</span> videos</h2>`
  }
  `;
  carrousel.appendChild(text);

  const divCards = document.createElement("div");
  divCards.classList.add("container");
  divCards.setAttribute("id", `cards-carrousel-${type}`);
  carrousel.appendChild(divCards);

  const aPrev = document.createElement("a");
  aPrev.classList.add("carousel-control-prev");
  aPrev.setAttribute("href", controls);
  aPrev.setAttribute("role", "button");
  aPrev.setAttribute("data-slide", "prev");
  aPrev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>`;

  const aNext = document.createElement("a");
  aNext.classList.add("carousel-control-next");
  aNext.setAttribute("href", controls);
  aNext.setAttribute("role", "button");
  aNext.setAttribute("data-slide", "next");
  aNext.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>`;

  carrousel.appendChild(div);
  carrousel.appendChild(aPrev);
  carrousel.appendChild(aNext);
};

const addQuote = (data, first) => {
  const targetDiv = document
    .getElementById("quotes")
    .getElementsByClassName("carousel-inner")[0];
  const innerElement = document.createElement("div");

  innerElement.setAttribute("class", "carousel-item");
  if (!first) {
    innerElement.classList.add("active");
  }

  innerElement.innerHTML = `
  <blockquote>
    <div class="row">
      <div class="col-sm-3 text-center">
        <img
          class="rounded-circle"
          src="${data.pic_url}"
          style="width: 100px; height: 100px"
        />
      </div>
      <div class="col-sm-9">
        <p class="text-white">
          « ${data.text}
        </p>
        <div class="row flex-column">
          <strong class="col text-white">${data.name}</strong>
          <em class="col text-white">${data.title}</em>
        </div>
      </div>
    </div>
  </blockquote>`;
  targetDiv.appendChild(innerElement);
};

const getStar = (starNumber) => {
  let starRating = ``;
  let i = 0;
  for (; i < starNumber; i++) {
    starRating += '<img src="images/star_on.png" alt="" class="stars" />';
  }
  for (; i < 5; i++) {
    starRating += '<img src="images/star_off.png" alt="" class="stars" />';
  }
  return starRating;
};

const popularContent = (data) => {
  const { author_pic_url, title, thumb_url, author, star, duration } = data;

  const content = document.createElement("div");
  content.classList.add("card");
  content.classList.add("w-50");
  content.classList.add("m-auto");
  content.innerHTML = `<div class="card-body">
  <div
    class="button-play-container row justify-content-center"
  >
    <img
      src="${thumb_url}"
      alt=""
      class="img-fluid"
    />
    <img class="play-button" src="images/play.png" alt="" />
  </div>
  <h4>${title}</h4>
  <p class="text-muted">
    ${data["sub-title"]}
  </p>
  <div class="row align-items-center">
    <div class="col-4">
      <img
        src="${author_pic_url}"
        alt=""
        class="small-profile-img"
      />
    </div>
    <div class="col text-primary">${author}</div>
  </div>
  <div class="row justify-content-between pt-3">
    <div class="col stars">
      ${getStar(star)}
    </div>
    <div class="col-6">
      <p class="text-primary text-right">${duration}</p>
    </div>
  </div>
</div>`;
  return content;
};

const addPopular = (data, first, type) => {
  const targetDiv = document.getElementById(`cards-carrousel-${type}`);
  const innerElement = document.createElement("div");

  innerElement.setAttribute("class", "carousel-item");
  if (!first) {
    innerElement.classList.add("active");
  }

  innerElement.appendChild(popularContent(data));
  targetDiv.appendChild(innerElement);
};

const getData = async (url) => {
  // promise
  const httpPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Please verify...something went wrong!");
    };

    xhr.send();
  });

  return httpPromise;
};

const getQuotes = async () => {
  if (!document.getElementById("quotes")) return;
  try {
    carrouselLoading(
      document.getElementById("quotes").getElementsByClassName("carousel")[0],
      true,
      "text-light"
    );
    const result = await getData("https://smileschool-api.hbtn.info/quotes");
    createCarrousel("#carouselExampleControls", "quotes");
    result.forEach((element, i) => {
      addQuote(element, i);
    });
  } catch (error) {
    console.error(error);
  } finally {
    carrouselLoading(
      document.getElementById("quotes").querySelector("#loader"),
      false
    );
  }
};

const getVideos = async (type, url, controls) => {
  if (!document.getElementById(type)) return;
  try {
    carrouselLoading(
      document.getElementById(type).getElementsByClassName("carousel")[0],
      true,
      "text-primary"
    );
    const result = await getData(url);
    createCarrouselPopular(controls, type);
    result.forEach((element, i) => {
      addPopular(element, i, type);
    });
  } catch (error) {
    console.error(error);
  } finally {
    carrouselLoading(
      document.getElementById(type).querySelector("#loader"),
      false
    );
  }
};

const addVideoToSearch = (element) => {
  const { title, duration, author_pic_url, author, thumb_url, star } = element;
  const parent = document.getElementById("queriesRow");
  const div = document.createElement("div");
  div.classList.add("col-md-6", "col-lg-3", "p-3");
  div.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <div class="button-play-container row justify-content-center">
                    <img
                      src="${thumb_url}"
                      alt=""
                      class="img-fluid"
                    />
                    <img class="play-button" src="images/play.png" alt="" />
                  </div>
                  <h4 class="py-2">${title}</h4>
                  <p class="text-muted">
                   ${element["sub-title"]}
                  </p>
                  <div class="row align-items-center">
                    <div class="col-4">
                      <img
                        src="${author_pic_url}"
                        alt=""
                        class="small-profile-img"
                      />
                    </div>
                    <div class="col text-primary">${author}</div>
                  </div>
                  <div class="row justify-content-between pt-3">
                    <div class="col stars">
                    ${getStar(star)}
                    </div>
                    <div class="col-6">
                      <p class="text-primary text-right">8 min</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
  parent.appendChild(div);
};

const addTotalCount = (element, count) => {
  const smallTotal = document.createElement("small");
  smallTotal.classList.add("text-muted");
  smallTotal.innerHTML = `<small class="text-muted">${count} videos</small>`;
  element.appendChild(smallTotal);
};

const addRow = (element) => {
  const row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("py-4");
  row.setAttribute("id", "queriesRow");
  element.appendChild(row);
};

const getQueryVideos = async (url, query = "", topic = "", sort = "") => {
  if (!document.getElementById("videosSearch")) return;
  try {
    carrouselLoading(
      document.getElementById("videosSearch"),
      true,
      "text-primary"
    );
    const result = await getData(
      `${url}?q=${query}${topic ? `&topic=${topic}` : ""}${
        sort ? `&sort=${sort}` : ""
      }`
    );
    addTotalCount(
      document.getElementById("videosSearch"),
      result.courses.length
    );
    if (result.courses.length) addRow(document.getElementById("videosSearch"));
    result.courses.forEach((element, i) => {
      addVideoToSearch(element, i);
    });
  } catch (error) {
    console.error(error);
  } finally {
    carrouselLoading(
      document.getElementById("videosSearch").querySelector("#loader"),
      false
    );
  }
};

const debounce = (callback, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

const listenersQuerys = () => {
  if (!document.getElementById("querySearch")) return;
  let data = {};
  if (sessionStorage.getItem("data"))
    data = JSON.parse(sessionStorage.getItem("data"));
  let lupa = document.getElementById("lupa");

  document.getElementById("querySearch").addEventListener(
    "input",
    debounce(() => {
      const e = document.getElementById("querySearch");
      if (e.value) lupa.style.display = "none";
      else lupa.style.display = "block";
      data.query = e.value;

      sessionStorage.setItem("data", JSON.stringify(data));

      getQueryVideos(
        "https://smileschool-api.hbtn.info/courses",
        e.value,
        data.topic,
        data.sort
      );
    }, 600)
  );

  $(".sort > a").click(function (e) {
    $("#sort").text(this.innerHTML);
    data.sort = this.innerHTML;
    console.log("listenersQuerys -> data.sort", data.sort);

    sessionStorage.setItem("data", JSON.stringify(data));
    getQueryVideos(
      "https://smileschool-api.hbtn.info/courses",
      data.query,
      data.topic,
      data.sort
    );
  });

  $(".topic > a").click(function (e) {
    $("#topic").text(this.innerHTML);
    data.topic = this.innerHTML;

    sessionStorage.setItem("data", JSON.stringify(data));
    getQueryVideos(
      "https://smileschool-api.hbtn.info/courses",
      data.query,
      data.topic,
      data.sort
    );
  });
};

const docReady = (fn) => {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

docReady(() => {
  sessionStorage.setItem("data", JSON.stringify({}));
  getQuotes();
  getVideos(
    "popular",
    "https://smileschool-api.hbtn.info/popular-tutorials",
    "#carouselExampleControls2"
  );
  getVideos(
    "lastest",
    "https://smileschool-api.hbtn.info/latest-videos",
    "#carouselExampleControls3"
  );
  getQueryVideos("https://smileschool-api.hbtn.info/courses");
  listenersQuerys();
});
