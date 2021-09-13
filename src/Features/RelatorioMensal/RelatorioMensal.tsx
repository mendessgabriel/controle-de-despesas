import Transacao from '../../Transacao/Transacao';
import './RelatorioMensal.css';
import '../../App.css';

const RelatorioMensal = (relatorios: Transacao[], geraData: () => string, valoresOcultosRelatorio: boolean, formatPercentValue: (str?: string) => string) => {
    return (
        <div>
            {relatorios && relatorios.length > 0 ? relatorios.map((rel, index) => {
                return (
                    <div className="relatorio" key={index}>
                        <div>
                            <div className="dataevalor">
                                <span>{geraData()}</span>
                                <span>R$ {valoresOcultosRelatorio ? '***' : rel.valor}</span>
                            </div>
                        </div>

                        <div className="valoresDIV">
                            <span>{valoresOcultosRelatorio ? '***' : rel.nome}</span>
                            <div></div>
                            <div className="lucroEIcon">
                                lucro: <span className={rel.porcentagemSobSaldoAtual.includes('-') ? 'despesa' : 'lucro'}>
                                    {formatPercentValue(rel.porcentagemSobSaldoAtual)}
                                </span>
                                <div className={!rel.valor.toString().includes('-') ? "arrow-up" : "arrow-down"}></div>
                            </div>
                        </div>

                        <div className="badge"></div>
                    </div>
                )
            }) : <p>sem atividades</p>}
        </div>
    );
}

export default RelatorioMensal;