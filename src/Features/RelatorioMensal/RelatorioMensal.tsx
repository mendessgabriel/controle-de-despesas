import Transacao from '../../Transacao/Transacao';
import './RelatorioMensal.css';
import '../../App.css';

const RelatorioMensal = (relatorios: Transacao[], geraData: () => string, valoresOcultosRelatorio: boolean) => {
    return (
        <div>
            {relatorios.map((rel, index) => {
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
                        </div>

                        <div className="badge"></div>
                    </div>
                )
            })}
        </div>
    );
}

export default RelatorioMensal;