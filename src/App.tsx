import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import RelatorioMensal from './Features/RelatorioMensal/RelatorioMensal';
import Feature from './Interface/Feature';
import Transacao from './Transacao/Transacao';

const App = () => {

  const [saldo, setSaldo] = useState<number>(0);
  const [receita, setReceita] = useState<number>(0);
  const [gasto, setgasto] = useState<number>(0);
  const [relatorio, setRelatorio] = useState<Transacao[]>([]);
  const [valoresOcultos, setValoresOcultos] = useState<boolean>(false);
  const [valoresOcultosRelatorio, setValoresOcultosRelatorio] = useState<boolean>(false);
  const [transacao, setTransacao] = useState<Transacao>(new Transacao());
  const [addTransacao, setAddTransacao] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<Boolean>(false);

  const [screen, setScreen] = useState<number>(0);

  const clickEvent = async (func: string) => {
    switch (func) {
      case 'relatório mensal':
        setScreen(1)
        criaRelatorio(1);
        break;
      case 'últimas atividades':
        setScreen(0);
        criaRelatorio(0);
        break;
      default:
        setScreen(0);
        criaRelatorio(0);
        break;
    }
  }

  const [features, setFeatures] = useState<Feature[]>([{ nome: 'últimas atividades', clickEvent }, { nome: 'relatório mensal', clickEvent }]);

  const handleScroll = () => {
    if (window.pageYOffset < 200) {
      setIsScrolled(false);
      return;
    }
    setIsScrolled(true);
  };

  window.addEventListener('scroll', handleScroll, true);

  const setTransacaoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;

    setTransacao({ ...transacao, nome: e.target.value.toUpperCase() });
  }

  const setTransacaoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;

    setTransacao({ ...transacao, valor: Number(e.target.value) });
  }

  const adicionaTransacao = async () => {
    if (transacao.nome.length === 0 && transacao.valor === 0) return;

    setTransacao({ ...transacao, data: new Date() });

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
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }

  const criaVisaoSaldo = (estilo: string): JSX.Element => {
    return (
      <div className={estilo}>
        <div className="valores">
          <div className="saldo">
            <div className="saldoOcultar">
              <label>saldo atual </label>
              <div className="ocultar" onClick={() => setValoresOcultos(!valoresOcultos)}>ocultar saldo</div>
            </div>

            <label>R$ {valoresOcultos ? '***' : saldo}</label>
          </div>
        </div>
      </div>
    );
  }

  const criaRelatorio = (screen?: number): JSX.Element => {
    if (screen === 0) {
      return (
        <div className="relatorios">
          <div className="saldoOcultar">
            <label>últimas atividades</label>
            <div className="ocultar" onClick={() => setValoresOcultosRelatorio(!valoresOcultosRelatorio)}>ocultar relatório</div>
          </div>
          {relatorio && relatorio.length > 0 ? relatorio.map((rel, index) => {
            return (
              <div className="relatorio" key={index}>
                <div>{geraData()}</div>
                <div className="valoresDIV">
                  <span>{valoresOcultosRelatorio ? '***' : rel.nome}</span>
                  <span>R$ {valoresOcultosRelatorio ? '***' : rel.valor}</span>
                </div>

                <div className="badge"></div>
              </div>
            )
          }) : <p>sem atividades</p>}
        </div>
      )
    } else {
      return RelatorioMensal(relatorio, geraData);
    }

  }

  const criaTransacao = (): JSX.Element => {
    return (
      <div className="transacoes grow">
        <header>
          <h4>Adicionar transação</h4>
          <div className="closeTransacao" onClick={() => setAddTransacao(!addTransacao)}>-</div>
        </header>
        {isScrolled && criaVisaoSaldo('visaoSaldoFixa')}
        <div className="btns">
          <input type="text" onChange={setTransacaoName} name="nome" placeholder="nome da transação" />
          <input type="number" onChange={setTransacaoValue} name="valor" placeholder="valor da transação" />

        </div>

        <button onClick={adicionaTransacao}>adicionar transação</button>
      </div>
    );
  }

  const criaAddBtn = (): JSX.Element => {
    return (
      <div className="addBtn" onClick={() => setAddTransacao(!addTransacao)}>
        +
        <span className="tooltiptext">adicione uma nova transação</span>
      </div>
    );
  }

  const criaFeatures = () => {
    return (
      features.map((ft, index) => {
        return (
          <div className="feature" key={index} onClick={() => ft.clickEvent(ft.nome)}>
            {ft.nome}
          </div>
        );
      })
    )
  }

  useEffect(() => {
    clickEvent('');
  }, []);

  return (
    <div className="App">
      {criaVisaoSaldo('valores')}

      <div className="saldoOcultar">
        {criaFeatures()}
      </div>

      {criaRelatorio(screen)}

      {addTransacao ? criaTransacao() : criaAddBtn()}
    </div>
  );
}

export default App;
