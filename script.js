//Altera o display do botão "Reiniciar" para "none"
var botaoReiniciar = document.getElementById('reiniciar');
botaoReiniciar.style.display = 'none';

//Variável para indicar a troca do botão
let trocarBotão = false;

// Define o jogador inicial como "X"
let jogadorAtual = "X";

// Variável para indicar se o jogo está ativo ou não (inicia como false)
let jogoAtivo = false;

// Armazena o estado atual do jogo, inicialmente vazio
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

// Define as combinações de vitória possíveis
const condicoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Armazena os nomes dos jogadores
let nomeJogador1 = "";
let nomeJogador2 = "";

// Função para alternar o jogador atual
function alternarjogador(valor) {
    // Define o jogador atual com base no valor passado
    jogadorAtual = valor === 1 ? "X" : "O";

    // Atualiza o estado dos radio buttons
    document.getElementById('x').checked = valor === 1;
    document.getElementById('o').checked = valor === 2;

    // Atualiza a mensagem de alerta com o nome do jogador da vez
    if(jogoAtivo){
        document.getElementById('alerta').innerText = `É a vez de ${jogadorAtual === "X" ? nomeJogador1 : nomeJogador2}`;
    }
}

// Função para registrar uma jogada
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
        document.getElementById('alerta').innerText = `Essa casa está ocupada, jogue em outra!`;
        return;
    }

    // Atualiza o estado do jogo e o conteúdo da casa clicada
    estadoJogo[indice - 1] = jogadorAtual;
    document.getElementById(`casa${indice}`).innerText = jogadorAtual;

    // Verifica se houve uma vitória
    if (checarVitoria()) {
        jogoAtivo = false; // Encerra o jogo
        document.getElementById('alerta').innerText = `${jogadorAtual === "X" ? nomeJogador1 : nomeJogador2} venceu!`;
        setTimeout(iniciarpartida, 2000); // Inicia uma nova partida após 2 segundos
        return;
    }

    // Verifica se houve um empate
    if (checarEmpate()) {
        jogoAtivo = false; // Encerra o jogo
        document.getElementById('alerta').innerText = `Empate!`;
        setTimeout(iniciarpartida, 2000); // Inicia uma nova partida após 2 segundos
        return;
    }

    // Alterna o jogador atual
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    // Atualiza o estado dos radio buttons
    document.getElementById('x').checked = jogadorAtual === "X";
    document.getElementById('o').checked = jogadorAtual === "O";

    // Atualiza a mensagem de alerta com o nome do jogador da vez
    if(jogoAtivo){
        document.getElementById('alerta').innerText = `É a vez de ${jogadorAtual === "X" ? nomeJogador1 : nomeJogador2}`;
    }
}

// Função para verificar se houve uma vitória
function checarVitoria() {
    // Percorre todas as combinações de vitória possíveis
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
            // Destaca a linha vencedora
            document.getElementById(`casa${a + 1}`).style.backgroundColor = '#ada38e';
            document.getElementById(`casa${b + 1}`).style.backgroundColor = '#ada38e';
            document.getElementById(`casa${c + 1}`).style.backgroundColor = '#ada38e';
            return true;
        }
    }
    return false;
}

// Função para verificar se houve um empate
function checarEmpate() {
    // Verifica se todas as casas estão preenchidas e não há vencedor
    return estadoJogo.every(casa => casa !== "");
}

// Função para iniciar uma nova partida
function iniciarpartida() {
    // Obtém os nomes dos jogadores dos campos de entrada
    nomeJogador1 = document.getElementById('nomeJogador1').value + " (X)" || "Jogador(a) X";
    nomeJogador2 = document.getElementById('nomeJogador2').value + " (O)" || "Jogador(a) O";

    // Define o jogador inicial com base na seleção
    jogadorAtual = document.getElementById('x').checked ? "X" : "O";
    jogoAtivo = true; // Ativa o jogo
    estadoJogo = ["", "", "", "", "", "", "", "", ""]; // Reseta o estado do jogo

    // Altera o botão de iniciar pelo botão de reiniciar
    trocarBotão = true;
    alterarBotoes(trocarBotão)

    // Desabilita os botões de seleção do jogador
    document.getElementById('x').disabled = true;
    document.getElementById('o').disabled = true;
    document.getElementById('nomeJogador1').disabled = true;
    document.getElementById('nomeJogador2').disabled = true;

    // Limpa o conteúdo de todas as casas e reseta a cor de fundo
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`casa${i}`).innerText = "";
        document.getElementById(`casa${i}`).style.backgroundColor = '#f5e5d5';
    }

    // Atualiza a mensagem de alerta com o nome do jogador da vez
    if(jogoAtivo){
        document.getElementById('alerta').innerText = `É a vez de ${jogadorAtual === "X" ? nomeJogador1 : nomeJogador2}`;
    }
}

// Habilita a seção de seleção
function selecao() {
    document.getElementById('x').disabled = false;
    document.getElementById('o').disabled = false;
    document.getElementById('nomeJogador1').disabled = false;
    document.getElementById('nomeJogador2').disabled = false;
}

//função para reiniciar o jogo
function reiniciarJogo(){
    estadoJogo = 
    [   document.getElementById('casa1').innerText = '1', 
        document.getElementById('casa2').innerText = '2', 
        document.getElementById('casa3').innerText = '3', 
        document.getElementById('casa4').innerText = '4', 
        document.getElementById('casa5').innerText = '5', 
        document.getElementById('casa6').innerText = '6', 
        document.getElementById('casa7').innerText = '7', 
        document.getElementById('casa8').innerText = '8', 
        document.getElementById('casa9').innerText = '9']; // Reseta o estado do jogo
        trocarBotão = false
    alterarBotoes(trocarBotão);
    selecao();
    document.getElementById('alerta').innerText = ``;
    jogoAtivo = false;
}

// Alterna entre o botão iniciar e o botão reiniciar
function alterarBotoes(Trocar) {
    var botaoIniciar = document.getElementById('iniciar');
    var botaoReiniciar = document.getElementById('reiniciar');
    if(Trocar){
        botaoIniciar.style.display = 'none';
        botaoReiniciar.style.display = '';
    }
    else{
        botaoIniciar.style.display = '';
        botaoReiniciar.style.display = 'none';
    }
};
