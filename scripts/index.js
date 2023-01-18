import DATA from "./keys.js";
addEventListener("DOMContentLoaded", () => {
  console.log(DATA);
  const $container = document.querySelector(".container"),
    $loader = document.getElementById("loader_1"),
    $datos = document.getElementById("datos"),
    $h1 = document.querySelector(".title"),
    $Result_Request = document.getElementById("Result_Request"),
    $fragment = document.createDocumentFragment();

  const getData = async (emp, date_from, date_to) => {
    try {
      $h1.textContent = `Datos históricos de ${emp}`;
      // * `http://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${emp}&date_from=${date_from}&date_to=${date_to}&limit=${DATA.limit}`

      let res = await fetch(
          `http://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${emp}&date_from=${date_from}&date_to=${date_to}&limit=${DATA.limit}`
        ),
        json = await res.json();

      // ! Manejo de error
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      //   TODO: HTML
      $loader.classList.add("d-none");
      // * json.data
      json.data.forEach((el) => {
        $container.textContent = "";
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
        let date = el.date.split("T00");
        $h5_date.innerHTML = `
          <span class="bi-calendar2-date"></span> ${date[0]}
        `; // ! date <- website

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

      $Result_Requestdatos.innerHTML = `ERROR ${
        err.status || "HTTP 404 Not Found"
      }: ${message}`;
      $datos.classList.add("text-danger");
    }
  };

  const $contenedor_btn_date = document.getElementById("contenedor_btn_date"),
    $date_from = document.getElementById("date_from"),
    $date_to = document.getElementById("date_to"),
    $select_emp = document.getElementById("select_emp"),
    $getDataBtn = document.getElementById("getDataBtn");

  $getDataBtn.addEventListener("click", () => {
    $loader.classList.remove("d-none");
    getData($select_emp.value, $date_from.value, $date_to.value);
  });

  document.addEventListener("change", (e) => {
    if (e.target === $select_emp) {
      $contenedor_btn_date.classList.remove("d-none");
    }

    if (e.target === $date_from) {
      const $containet_date_to = document.getElementById("containet_date_to");
      $containet_date_to.classList.remove("d-none");
      ValidateDateTo_Date();
    }

    if (e.target === $date_to) {
      ValidateDateTo_Date();
    }
  });

  // TODO: Función para validar que la fecha de inicio no sea mayor a la fecha final.
  const ValidateDateTo_Date = () => {
    if ($date_from.value > $date_to.value) {
      $getDataBtn.classList.add("d-none");
      $Result_Request.classList.remove("d-none");
      $Result_Request.innerHTML = `
      <span><span class="bi-exclamation-triangle"></span> ERROR: La fecha de inicio no debe ser mayor a la fecha final.</span>
      `;
      $Result_Request.classList.add("text-danger");
      $loader.classList.add("d-none");
    } else {
      $Result_Request.classList.add("d-none");
      $getDataBtn.classList.remove("d-none");
    }
  };
});

/*
  ! symbol: name
  ! open: username
  ! high: email
  ! low: id
  ! close: phone 
  ! date: website
*/
