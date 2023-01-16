import DATA from "./keys.js";

addEventListener("DOMContentLoaded", () => {
  // console.log(DATA);
  const $loadrer = document.getElementById("loader_1"),
    $select_emp = document.getElementById("select_emp"),
    $title = document.querySelector("h1"),
    $Result_Request = document.getElementById("Result_Request"),
    $Chars_Content = document.getElementById("charts_content");
  const getData = async (emp) => {
    $title.innerHTML = `Datos de ${emp}`;
    try {
      // * `http://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${emp}&date_from=${DATA.date_from}&date_to=${DATA.date_to}&limit=255`
      let res = await fetch(`../API/app.json`),
        json = await res.json();
      $Chars_Content.classList.remove("d-none");
      // console.log(res);
      /* 
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
      */
      // console.log(json);
      // console.log(json.data);
      // console.log(json.data[0]);

      // ! Manejo de error
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      //   TODO: HTML
      // * json.data
      let open = [],
        high = [],
        low = [],
        close = [],
        date = [];
      json.data.forEach((e) => {
        // console.log("Datos CONSULTADOS");
        open.unshift(e.open);
        high.unshift(e.high);
        low.unshift(e.low);
        close.unshift(e.close);
        date.unshift(e.date);
        // console.log(series);
        // console.log(e.open);
        // console.log(getOptionChart1().series[0].data);
        // console.log(getOptionChart1().xAxis.data[cont]);

        // getOptionChart1().xAxis.data[cont] = e.close
        // getOptionChart1().series[0].data[cont] = e.open
        // getOptionChart1().series[0].data = getOptionChart1().series[0].data.push(e.open)
        // ? CHARTS
        //   !opciones
        const getOptionChart1 = () => {
          return {
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
                type: "line",
              },
            ],
          };
        };

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

        const initCharts = () => {
          const chart1 = echarts.init(document.getElementById("chart1")),
            chart2 = echarts.init(document.getElementById("chart2")),
            chart3 = echarts.init(document.getElementById("chart3"));

          // ? Asignar opción al Chart
          chart1.setOption(getOptionChart1());
          chart2.setOption(getOptionChart2());
          chart3.setOption(getOptionChart3());
        };
        // ?

        //   console.log(getOptionChart1().series[0].data);
        //   console.log(getOptionChart1().xAxis.data);
        // console.log(getOptionChart1().series[0].data[cont] = e.open);
        initCharts();
      });
      $Result_Request.classList.add("d-none");
    } catch (err) {
      console.log(
        `Ocurrió un error al consultar los datos.\nTipo: ${err.status}\nDescripción: ${err.statusText}`
      );
      $Result_Request.classList.remove("d-none");
      //   console.log(err);
      let message = err.statusText || "Ocurrió un error";

      $Result_Request.innerHTML = `ERROR ${
        err.status || "HTTP 404 Not Found"
      }: ${message}`;
      $Result_Request.classList.add("text-danger");
    } finally {
      $loadrer.classList.add("d-none");
    }
  };

  // getData("SONY");

  $select_emp.addEventListener("change", (e) => {
    // console.log(e.target.value);
    $loadrer.classList.remove("d-none");
    $Chars_Content.classList.add("d-none");
    getData(e.target.value);
  });
  // });
});
