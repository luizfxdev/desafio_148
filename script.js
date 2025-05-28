// Função principal que calcula o poder das frutas
function calculateFruitPower(fruits) {
    // Conta a ocorrência de cada fruta
    const fruitCounts = {};
    const totalFruits = fruits.length;

    fruits.forEach(fruit => {
        const normalizedFruit = fruit.trim().toLowerCase();
        fruitCounts[normalizedFruit] = (fruitCounts[normalizedFruit] || 0) + 1;
    });

    // Calcula o poder (porcentagem) para cada fruta
    const fruitPowers = [];
    for (const fruit in fruitCounts) {
        const power = (fruitCounts[fruit] / totalFruits) * 100;
        fruitPowers.push({
            name: fruit,
            power: power.toFixed(1) // Arredonda para 1 casa decimal
        });
    }

    // Ordena as frutas por poder (decrescente)
    fruitPowers.sort((a, b) => b.power - a.power);

    return fruitPowers;
}

// Função para formatar o resultado para exibição
function formatResult(fruitPowers) {
    return fruitPowers.map(item => {
        // Adiciona emoji correspondente a cada fruta
        const emojiMap = {
            'maçã': '🍎',
            'banana': '🍌',
            'cereja': '🍒',
            'pera': '🍐'
        };
        const emoji = emojiMap[item.name] || '';
        return `${emoji} ${item.name}: ${item.power}%`;
    });
}

// Função para processar a entrada do usuário
function processInput() {
    const input = document.getElementById('fruits-input').value;

    if (!input.trim()) {
        alert('Por favor, digite algumas frutas!');
        return;
    }

    // Divide a entrada em um array de frutas
    const fruits = input.split(',').filter(fruit => fruit.trim() !== '');

    // Calcula o poder das frutas
    const fruitPowers = calculateFruitPower(fruits);

    // Formata o resultado
    const formattedResult = formatResult(fruitPowers);

    // Exibe o resultado
    displayResult(formattedResult);
}

// Função para exibir o resultado na página
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    result.forEach(item => {
        const fruitElement = document.createElement('div');
        fruitElement.className = 'fruit-item';
        fruitElement.textContent = item;
        resultDiv.appendChild(fruitElement);
    });
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('fruits-input').value = '';
    document.getElementById('result').innerHTML = '';
}

// Event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Botão de contar
    document.getElementById('count-btn').addEventListener('click', processInput);

    // Botão de voltar
    document.getElementById('back-btn').addEventListener('click', clearForm);

    // Permite pressionar Enter para contar
    document.getElementById('fruits-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processInput();
        }
    });
});