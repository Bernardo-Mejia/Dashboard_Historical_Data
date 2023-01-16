import DATA from "./keys.js";

const getOptionChart2 = () => {
  return {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
};

// addEventListener("DOMContentLoaded", () => {

/*   addEventListener("DOMContentLoaded", () => {
          initCharts();
        }); */

const getData = async () => {
  try {
    // * `http://api.marketstack.com/v1/eod?access_key=${DATA.access_key}&symbols=${DATA.symbols}&date_from=${DATA.date_from}&date_to=${DATA.date_to}&limit=255`
    let res = await fetch(`./API/app.json`),
      json = await res.json();
    console.log(res);
    console.log(res.ok);
    console.log(res.status);
    // console.log(json);
    console.log(json.data);
    //   console.log(json.data[0]);

    // ! Manejo de error
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    //   TODO: HTML
    // * json.data
    let cont = 0;
    let series = [],
        xAxis = []
    json.data.forEach((e) => {
      console.log("Datos CONSULTADOS");
      series.unshift(e.open)
      xAxis.unshift(e.date)
    //   console.log(series);
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
          xAxis: {
            type: "category",
            data: xAxis,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: series,
              type: "line",
            },
          ],
        };
      };

      const initCharts = () => {
        const chart1 = echarts.init(document.getElementById("chart1")),
          chart2 = echarts.init(document.getElementById("chart2"));

        // ? Asignar opción al Chart
        chart1.setOption(getOptionChart1());
        chart2.setOption(getOptionChart2());
      };
      // ?

    //   console.log(getOptionChart1().series[0].data);
    //   console.log(getOptionChart1().xAxis.data);
      // console.log(getOptionChart1().series[0].data[cont] = e.open);
      cont++;
      initCharts();
    });
  } catch (err) {
    console.log(
      `Ocurrió un error al consultar los datos.\nTipo: ${err.status}\nDescripción: ${err.statusText}`
    );
    //   console.log(err);
    let message = err.statusText || "Ocurrió un error";

    /* $datos.innerHTML = `ERROR ${
            err.status || "HTTP 404 Not Found"
          }: ${message}`;
          $datos.classList.add("text-danger"); */
  }
};

getData();
// });
