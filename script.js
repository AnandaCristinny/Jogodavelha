let jogadorAtual = "X"; // Define o jogador inicial como "X"
let jogoAtivo = false; // Variável para indicar se o jogo está ativo ou não (inicia como false)
let estadoJogo = ["", "", "", "", "", "", "", "", ""]; // Armazena o estado atual do jogo, inicialmente vazio

const condicoesVitoria = [ // Define as combinações de vitória possíveis
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function alternarjogador(valor) {
    // Alterna o jogador atual com base no valor passado
    jogadorAtual = valor === 1 ? "X" : "O";

    // Atualiza o estado dos radio buttons
    document.getElementById('x').checked = valor === 1;
    document.getElementById('o').checked = valor === 2;

    // Atualiza a mensagem de alerta com o nome do jogador da vez
    document.getElementById('alerta').innerText = `É a vez do jogador ${jogadorAtual}`;
}

function jogar(indice) {
    // Limpa qualquer mensagem anterior
    document.getElementById('alerta').innerText = "";

    // Verifica se o jogo está ativo
    if (!jogoAtivo) {
        document.getElementById('alerta').innerText = `Você precisa clicar em "Iniciar Partida" para começar a jogar!`;
        return;
    }

    // Verifica se a casa já foi marcada
    if (estadoJogo[indice - 1] !== "") {
        document.getElementById('alerta').innerText = `Jogada inválida!`;
        return;
    }

    // Atualiza o estado do jogo e o conteúdo da casa clicada
    estadoJogo[indice - 1] = jogadorAtual;
    document.getElementById(`casa${indice}`).innerText = jogadorAtual;

    // Verifica se houve uma vitória
    if (checarVitoria()) {
        jogoAtivo = false; // Encerra o jogo
        setTimeout(() => {
            document.getElementById('alerta').innerText = `Jogador ${jogadorAtual} venceu!`;
        }, 50);
        setTimeout(iniciarpartida, 2000); // Inicia uma nova partida após 2 segundos
        return;
    }

    // Verifica se houve um empate
    if (checarEmpate()) {
        jogoAtivo = false; // Encerra o jogo
        setTimeout(() => {
            document.getElementById('alerta').innerText = `Empate!`;
        }, 50);
        setTimeout(iniciarpartida, 2000); // Inicia uma nova partida após 2 segundos
        return;
    }

    // Alterna o jogador atual
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    // Atualiza o estado dos radio buttons
    document.getElementById('x').checked = jogadorAtual === "X";
    document.getElementById('o').checked = jogadorAtual === "O";

    // Atualiza a mensagem de alerta com o nome do jogador da vez
    document.getElementById('alerta').innerText = `É a vez do jogador ${jogadorAtual}`;
}

function checarVitoria() {
    // Percorre todas as combinações de vitória possíveis
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
            return true; // Se uma combinação de vitória for encontrada, retorna true
        }
    }
    return false; // Se nenhuma combinação de vitória for encontrada, retorna false
}

function checarEmpate() {
    // Verifica se todas as casas estão preenchidas e não há vencedor
    return estadoJogo.every(casa => casa !== "");
}

function iniciarpartida() {
    // Verifica qual jogador está selecionado para começar a partida
    const jogadorSelecionado = document.getElementById('x').checked ? "X" : "O";
    jogadorAtual = jogadorSelecionado; // Define o jogador inicial com base na seleção
    jogoAtivo = true; // Ativa o jogo
    estadoJogo = ["", "", "", "", "", "", "", "", ""]; // Reseta o estado do jogo
    // Limpa o conteúdo de todas as casas
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`casa${i}`).innerText = "";
    }
    // Atualiza a mensagem de alerta com o nome do jogador da vez
    document.getElementById('alerta').innerText = `É a vez do jogador ${jogadorAtual}`;
}