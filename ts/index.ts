const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event?.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, 3 letras.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=315493d9bc3fb49116bc2f89e143a48f&lang=pt_br&units=metric`
    );

    const data = await response.json();

    const infos = {
      temperatura: Math.round(data.main.temp),
      local: data.name,
      icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `
    <div class="tempo-data">
            <h2>${infos.local}</h2>
            <span>${infos.temperatura}°C</span>
          </div>
          <img src="${infos.icone}" />`;
  } catch (erro) {
    console.log("Deu um erro na obtenção dos dados da API. ", erro);
  }
});
