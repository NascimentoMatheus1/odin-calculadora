const telaAtual = document.getElementById('tela-atual');
const telaAnterior = document.getElementById('tela-anterior');
const calculator = document.getElementById('calculadora');

calculator.addEventListener('click', (e) =>{
    e.preventDefault();

    if(e.target.classList.contains('clean')){
        limparTela(e.target.innerText);
    }
    if(e.target.classList.contains('num')){
        atualizarTela(e.target.innerText);
    }
});

const atualizarTela = (num) => {
    telaAtual.innerText += num;
}

const limparTela = (limpar) => {
    if(limpar === 'CE'){
        telaAtual.innerText = '';
    }
    else if(limpar === 'C'){
        telaAtual.innerText = '';
        telaAnterior.innerText = '';
    }
    else if(limpar === 'DEL'){
        let texto = telaAtual.innerText;
        texto = texto.slice(0, -1);
        telaAtual.innerText = texto;
    }
}
