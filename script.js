document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const resultDiv = document.getElementById("result");
    const convertButton = document.getElementById("convert");

    const apiURL = "https://api.exchangerate-api.com/v4/latest/USD"; // API para obtener las tasas de cambio

    
    // Alternar tema oscuro y claro

    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelector("button").classList.toggle("dark-mode");
});
    
    
    // Función para cargar las monedas en los selectores
    async function loadCurrencies() {
        const response = await fetch(apiURL);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option = document.createElement("option");
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        });
    }

    // Función para convertir el monto
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (!amount || !fromCurrency || !toCurrency) {
            resultDiv.textContent = "Por favor ingresa todos los datos.";
            return;
        }

        const response = await fetch(apiURL);
        const data = await response.json();
        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];
        const result = (amount / fromRate) * toRate;

        resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    }


    // Carga de las monedas en la página
    loadCurrencies();

    // Manejar la conversión al hacer clic en el botón "Convertir"
    convertButton.addEventListener("click", convertCurrency);
});
