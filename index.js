import DATA from "./keys.js";
addEventListener("DOMContentLoaded", () => {
  console.log(DATA);
  const $container = document.querySelector(".container"),
    $datos = document.getElementById("datos"),
    $h1 = document.querySelector(".title"),
    $fragment = document.createDocumentFragment();

  $h1.textContent = `Datos de ${DATA.symbols}`;

  const getData = async () => {
    try {
      // http://api.marketstack.com/v1/eod?access_key=c0a81cfdae174c044ab61c1aaa42018d&symbols=SONY&date_from=2019-01-03&date_to=2023-01-13
      // * `http://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${DATA.symbols}&date_from=${DATA.date_from}&date_to=${DATA.date_to}&limit=255`
      // https://jsonplaceholder.typicode.com/users
      let res = await fetch(`./API/app.json`),
        json = await res.json();
      /*
      console.log(res);
      console.log(res.ok);
      console.log(res.status);
      console.log(json);
      console.log(json.data);
      //   console.log(json.data[0]);
      */
     console.log("ola");

      // ! Manejo de error
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      //   TODO: HTML
      // * json.data
      json.data.forEach((el) => {
        // ? div.col-4 card
        const $div_col_4_card = document.createElement("div");
        $div_col_4_card.classList.add(
          "card",
          "mb-3",
          "mx-5",
          "col-lg-3",
          "col-sm-12"
        );

        // ? div.card-body
        const $div_card_body = document.createElement("div");
        $div_card_body.classList.add("card-body");

        // ? h5.card-title
        const $h5_card_title = document.createElement("h5");
        $h5_card_title.classList.add("card-title", "text-center");
        $h5_card_title.innerHTML = el.symbol; // ! symbol <- name

        // ? h4.card-title
        const $h5_date = document.createElement("h5");
        $h5_date.classList.add("card-title", "text-center");
        $h5_date.innerHTML = el.date; // ! date <- website

        // ? ul.list-group list-group-flush
        const $ul_list_group = document.createElement("ul");
        $ul_list_group.classList.add("list-group", "list-group-flush");

        // ? li.list-group-item
        const $li_open = document.createElement("li");
        $li_open.classList.add("list-group-item", "text-primary");
        $li_open.innerHTML = `<span class="bi-door-open-fill"></span> Open: $${el.open}`; // ! open <- username
        const $li_high = document.createElement("li");
        $li_high.classList.add("list-group-item", "text-success");
        $li_high.innerHTML = `<span class="bi-graph-up-arrow"></span> High: $${el.high}`; // ! high <- email
        const $li_low = document.createElement("li");
        $li_low.classList.add("list-group-item", "text-danger");
        $li_low.innerHTML = `<span class="bi-graph-down-arrow"></span> Low: $${el.low}`; // ! low <- id
        const $li_close = document.createElement("li");
        $li_close.classList.add("list-group-item", "text-warning");
        $li_close.innerHTML = `<span class="bi-door-closed-fill"></span> Close: $${el.close}`; // ! close <- phone

        // ? Añadir elementos hijos a los padres

        $ul_list_group.appendChild($li_open);
        $ul_list_group.appendChild($li_high);
        $ul_list_group.appendChild($li_low);
        $ul_list_group.appendChild($li_close);

        $div_card_body.appendChild($h5_card_title);
        $div_card_body.appendChild($ul_list_group);
        $div_card_body.appendChild($h5_date);

        $div_col_4_card.appendChild($div_card_body);

        $fragment.appendChild($div_col_4_card);
      });
      $container.appendChild($fragment);
    } catch (err) {
      console.log(
        `Ocurrió un error al consultar los datos.\nTipo: ${err.status}\nDescripción: ${err.statusText}`
      );
      //   console.log(err);
      let message = err.statusText || "Ocurrió un error";

      $datos.innerHTML = `ERROR ${
        err.status || "HTTP 404 Not Found"
      }: ${message}`;
      $datos.classList.add("text-danger");
    }
  };

  getData();
  setInterval(() => {
    getData();
  }, 10000);
});

/*
  ! symbol: name
  ! open: username
  ! high: email
  ! low: id
  ! close: phone 
  ! date: website
*/
