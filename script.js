const telaAtual = document.getElementById('tela-atual');
const telaHistorico = document.getElementById('tela-anterior');
const calculator = document.getElementById('calculadora');

let num1 = 0;
let num2 = 0;
let resultado = 0;

calculator.addEventListener('click', (e) =>{
    e.preventDefault();

    if(e.target.classList.contains('clean')){
        limparTela(e.target.innerText);
    }
    if(e.target.classList.contains('num')){
        telaAtual.innerText += e.target.innerText;
    }
    if(e.target.classList.contains('operator')){
        verificarOperacoes(e.target.innerText);
    }
});


const limparTela = (limpar) => {
    if(limpar === 'CE'){
        telaAtual.innerText = '';
    }
    else if(limpar === 'C'){
        telaAtual.innerText = '';
        telaHistorico.innerText = '';
    }
    else if(limpar === 'DEL'){
        let texto = telaAtual.innerText;
        texto = texto.slice(0, -1);
        telaAtual.innerText = texto;
    } 
}

const verificarOperacoes = (operator) => {
   if(operator === '.'){
        if(!telaAtual.innerText.includes('.')){
            const num1 = telaAtual.innerText;
            telaAtual.innerText = `${num1}.`
        }else{
            const num1 = telaAtual.innerText.replace('.', '');
            telaAtual.innerText = num1;
        }
   }
   else if(operator === '+/-'){
        if(!telaAtual.innerText.includes('-')){
            const num1 = telaAtual.innerText;
            telaAtual.innerText = `-${num1}`
        }else{
            const num1 = telaAtual.innerText.replace('-', '');
            telaAtual.innerText = num1;
        }
   }
    else if(telaAtual.innerText === '' && telaHistorico.innerText === ''){
        return
   }
   else if(operator === '='){
        if(!telaHistorico.innerText || !telaAtual.innerText){
            return
        }
        else if(telaHistorico.innerText.includes('=')){
            const resultado = telaHistorico.innerText.split('=')[1];
            telaAtual.innerText = resultado;
        }
        else{
            const num1 = Number(telaHistorico.innerText.slice(0, -1));
            const num2 = Number(telaAtual.innerText);
            const operadorAnterior = telaHistorico.innerText.slice(-1);
            calcular(num1, num2, operadorAnterior);
        }
   }
   else if(telaAtual.innerText === '' && telaHistorico.innerText !== ''){
        const num1 = Number(telaHistorico.innerText.slice(0, -1));
        telaHistorico.innerText = `${num1} ${operator}`;
   }
   else{
        if(!telaHistorico.innerText){
            telaHistorico.innerText = `${telaAtual.innerText} ${operator}`;
            telaAtual.innerText = '';
        }
        else if(telaHistorico.innerText.includes('=')){
            const resultado = telaHistorico.innerText.split('=')[1];
            telaHistorico.innerText = `${resultado} ${operator}`;
            telaAtual.innerText = '';
        }
        else{
            const num1 = Number(telaHistorico.innerText.slice(0, -1));
            const operadorAnterior = telaHistorico.innerText.slice(-1);
            const num2 = Number(telaAtual.innerText);
            const resultado = calcular(num1, num2, operadorAnterior);
            if(operadorAnterior !== operator){
                telaHistorico.innerText = `${resultado} ${operator}`;
                telaAtual.innerText = '';
            } 
        }
   }
}

const calcular = (num1, num2, op) => {
    let equacao = '';
    let resultado = 0;
    if(op === '+'){
        resultado = Number(num1) + Number(num2);
        equacao = `${num1} ${op} ${num2} = ${resultado}`;
    }
    else if(op === '-'){
        resultado = Number(num1) - Number(num2);
        equacao = `${num1} ${op} ${num2} = ${resultado}`;
    }
    else if(op === 'x'){
        resultado = Number(num1) * Number(num2);
        equacao = `${num1} ${op} ${num2} = ${resultado}`;
    }
    else if(op === '/'){
        if(Number(num2) === 0){
            window.alert('não é possivel dividir por zero!');
            return
        }
        resultado = Number(num1) / Number(num2);
        equacao = `${num1} ${op} ${num2} = ${resultado}`;
    }
    telaHistorico.innerText = equacao;
    return resultado;
}