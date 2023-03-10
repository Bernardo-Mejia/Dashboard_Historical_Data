import DATA from "./keys.js";

addEventListener("DOMContentLoaded", () => {
  const $loader = document.getElementById("loader_1"),
    $container = document.querySelector(".container"),
    $select_emp = document.getElementById("select_emp"),
    $title = document.querySelector("h1"),
    $Result_Request = document.getElementById("Result_Request"),
    $Chars_Content = document.getElementById("charts_content"),
    $getDataBtn = document.getElementById("getDataBtn");

  const getData = async (emp, date_from, date_to) => {
    $title.innerHTML = `Gráficas de Datos históricos del ${date_from} al ${date_to} de ${emp}`;
    try {
      let res = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${emp}&date_from=${date_from}&date_to=${date_to}&limit=${DATA.limit}`
        ),
        json = await res.json();
      $Chars_Content.classList.remove("d-none");

      if (json.data.length > 0) {
        // ! Manejo de excepciones
        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        let open = [],
          high = [],
          low = [],
          close = [],
          date = [];
        $container.classList.remove("d-none");
        const chart2 = echarts.init(document.getElementById("chart2")),
          chart3 = echarts.init(document.getElementById("chart3")),
          chart_bar1 = echarts.init(document.getElementById("chart_bar1")),
          chart_bar2 = echarts.init(document.getElementById("chart_bar2")),
          chart_bar3 = echarts.init(document.getElementById("chart_bar3")),
          chart_bar4 = echarts.init(document.getElementById("chart_bar4")),
          chart4 = echarts.init(document.getElementById("chart4"));

        json.data.forEach((e) => {
          let date_format = e.date.split("T00");
          open.unshift(e.open);
          high.unshift(e.high);
          low.unshift(e.low);
          close.unshift(e.close);
          date.unshift(date_format[0]);
        });
        // ? CHARTS
        // ! Opciones
        const getOptionChart2 = () => {
          return {
            title: {
              text: `Valores de ${emp}`,
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: [
                "Open", // Open -> Email
                "Hight", // Hight -> Union Ads
                "Low", // Low -> Video Ad
                "Close", // Close -> Direct
              ],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "Open",
                type: "line",
                // stack: "Total",
                data: open,
              },
              {
                name: "Hight",
                type: "line",
                // stack: "Total",
                data: high,
              },
              {
                name: "Low",
                type: "line",
                // stack: "Total",
                data: low,
              },
              {
                name: "Close",
                type: "line",
                // stack: "Total",
                data: close,
              },
            ],
          };
        };

        const getOptionChart3 = () => {
          return {
            legend: {},
            tooltip: {
              trigger: "axis",
              showContent: false,
            },
            dataset: {
              source: [
                ["Date", ...date],
                ["Open", ...open],
                ["Hight", ...high],
                ["Low", ...low],
                ["Close", ...close],
              ],
            },
            xAxis: { type: "category" },
            yAxis: { gridIndex: 0 },
            grid: { top: "55%" },
            series: [
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
              },
              {
                type: "pie",
                id: "pie",
                radius: "30%",
                center: ["50%", "25%"],
                emphasis: {
                  focus: "self",
                },
                label: {
                  formatter: "{b}: {@a} ({d}%)",
                },
                /* encode: {
                itemName: "Date",
                value: date,
                tooltip: date,
              }, */
              },
            ],
          };
        };

        const getOptionChartBar1 = () => {
          return {
            title: {
              text: `Open`,
            },
            tooltip: {
              show: true,
              trigger: "axis",
              triggerOn: "mousemove|click",
            },
            xAxis: {
              type: "category",
              data: date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: open,
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(180, 180, 180, 0.2)",
                },
              },
            ],
          };
        };

        const getOptionChartBar2 = () => {
          return {
            title: {
              text: `Hight`,
            },
            tooltip: {
              show: true,
              trigger: "axis",
              triggerOn: "mousemove|click",
            },
            xAxis: {
              type: "category",
              data: date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: high,
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(180, 180, 180, 0.2)",
                },
              },
            ],
          };
        };

        const getOptionChartBar3 = () => {
          return {
            title: {
              text: `Low`,
            },
            tooltip: {
              show: true,
              trigger: "axis",
              triggerOn: "mousemove|click",
            },
            xAxis: {
              type: "category",
              data: date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: low,
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(180, 180, 180, 0.2)",
                },
              },
            ],
          };
        };

        const getOptionChartBar4 = () => {
          return {
            title: {
              text: `Close`,
            },
            tooltip: {
              show: true,
              trigger: "axis",
              triggerOn: "mousemove|click",
            },
            xAxis: {
              type: "category",
              data: date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: close,
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(180, 180, 180, 0.2)",
                },
              },
            ],
          };
        };

        const getOptionChart4 = () => {
          return {
            title: {
              text: `Suma de los valores de ${emp}`,
            },
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category",
              data: ["Open", "High", "Low", "Close"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [
                  {
                    value: open.reduce((sum, item) => sum + item, 0).toFixed(2),
                    itemStyle: {
                      color: "#3321E6",
                    },
                  },
                  {
                    value: high.reduce((sum, item) => sum + item, 0).toFixed(2),
                    itemStyle: {
                      color: "#2AE621",
                    },
                  },
                  {
                    value: low.reduce((sum, item) => sum + item, 0).toFixed(2),
                    itemStyle: {
                      color: "#D7E621",
                    },
                  },
                  {
                    value: close
                      .reduce((sum, item) => sum + item, 0)
                      .toFixed(2),
                    itemStyle: {
                      color: "#C70039",
                    },
                  },
                ],
                type: "bar",
              },
            ],
          };
        };

        chart2.setOption(getOptionChart2());
        chart3.setOption(getOptionChart3());
        chart_bar1.setOption(getOptionChartBar1());
        chart_bar2.setOption(getOptionChartBar2());
        chart_bar3.setOption(getOptionChartBar3());
        chart_bar4.setOption(getOptionChartBar4());
        chart4.setOption(getOptionChart4());
      } else {
        $Result_Request.classList.remove("d-none", "alert-danger");
        $Result_Request.classList.add("alert-warning");
        $Result_Request.innerHTML = `
        <span class="bi-slash-circle"></span> No hay registros para graficar.
      `;
        $container.classList.add("d-none");
      }
    } catch (err) {
      console.error(
        `Ocurrió un error al consultar los datos.\nTipo: ${
          err.status || "HTTP 404 Not Found"
        }\nDescripción: ${err.statusText || "Ocurrió un error"}`
      );
      $Result_Request.classList.remove("d-none");
      let message = err.statusText || "Ocurrió un error";
      $Result_Request.classList.add("alert-danger");
      $Result_Request.innerHTML = `
      <span class="bi-database-exclamation"></span> ERROR ${
        err.status || "HTTP 404 Not Found"
      }: ${message}`;
      $Result_Request.classList.add("text-danger");
    } finally {
      $loader.classList.add("d-none");
    }
  };

  const $contenedor_btn_date = document.getElementById("contenedor_btn_date"),
    $date_from = document.getElementById("date_from"),
    $date_to = document.getElementById("date_to"),
    fecha_Date = new Date();

  let dia = fecha_Date.getDate(),
    mes = fecha_Date.getUTCMonth(),
    anio = fecha_Date.getUTCFullYear();

  const fecha = `${anio}-${
    (mes + 1).toString().length > 1
      ? (mes + 1).toString()
      : "0" + (mes + 1).toString()
  }-${dia.toString().length > 1 ? dia.toString() : "0" + dia.toString()}`;

  $date_to.setAttribute("value", fecha);

  $getDataBtn.addEventListener("click", () => {
    $loader.classList.remove("d-none");
    $Chars_Content.classList.add("d-none");
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
