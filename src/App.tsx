import React, { useState, useEffect } from 'react';
import './App.css';
import Transacao from './Transacao/Transacao';

const App = () => {

  const [saldo, setSaldo] = useState<number>(0);
  const [receita, setReceita] = useState<number>(0);
  const [gasto, setgasto] = useState<number>(0);
  const [relatorio, setRelatorio] = useState<Transacao[]>([]);
  const [valoresOcultos, setValoresOcultos] = useState<boolean>(false);
  const [transacao, setTransacao] = useState<Transacao>(new Transacao());

  const setTransacaoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;

    setTransacao({ ...transacao, nome: e.target.value.toUpperCase() });
  }

  const setTransacaoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;

    setTransacao({ ...transacao, valor: Number(e.target.value) });
  }

  const adicionaTransacao = () => {
    if (transacao.nome.length === 0 && transacao.valor === 0) return;

    let novoSaldo: number = 0;

    if (transacao.valor > 0) {
      let novaReceita: number = receita + transacao.valor;
      novoSaldo = saldo + transacao.valor;

      setReceita(novaReceita);
    } else {
      let gastoNegativo: number = gasto + transacao.valor;
      novoSaldo = saldo + transacao.valor;

      setgasto(gastoNegativo);
    }

    setSaldo(novoSaldo);
    setRelatorio([...relatorio, transacao]);
  }

  const geraData = () => {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }


  return (
    <div className="App">

      <div className="valores">
        <div className="saldo">
          <div className="saldoOcultar">
            <label>saldo atual </label>
            <div className="ocultar" onClick={() => setValoresOcultos(!valoresOcultos)}>ocultar</div>
          </div>

          <label>R$ {valoresOcultos ? '***' : saldo}</label>
        </div>
      </div>

      <div className="relatorios">
        <label>últimas atividades</label>
        {relatorio && relatorio.length > 0 && relatorio.map((rel, index) => {
          return (
            <div className="relatorio" key={index}>
              <div>{geraData()}</div>
              <div className="valoresDIV">
                <span>{valoresOcultos ? '***' : rel.nome}</span>
                <span>R$ {valoresOcultos ? '***' : rel.valor}</span>
              </div>


              <div className="badge"></div>
            </div>
          )
        })}
      </div>

      <div className="transacoes">
        <div className="btns">
          <input type="text" onChange={setTransacaoName} name="nome" placeholder="nome da transação" />
          <input type="number" onChange={setTransacaoValue} name="valor" placeholder="valor da transação" />
        </div>

        <button onClick={adicionaTransacao}>adicionar transação</button>
      </div>

    </div>
  );
}

export default App;
