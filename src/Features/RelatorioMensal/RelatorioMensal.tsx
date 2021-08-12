import Transacao from '../../Transacao/Transacao';
import './RelatorioMensal.css';
import '../../App.css';

const RelatorioMensal = (relatorios: Transacao[], geraData: () => string) => {
    var Xmas95 = new Date();
    var monthNumber = Xmas95.getMonth() + 1;
    const months = [1,2,3,4,5,6,7,8,9,10,11,12];

    let monthChosen: number = 0;

    const changeMonth = (event: React.ChangeEvent<{ value: any }>) => {
        monthChosen = parseInt(event.target.value);
    }

    const geraRel = (tr: Transacao) => {
        if (tr.data.getMonth() + 1 != monthNumber) return null;

        let relatorios: JSX.Element = (
            <div className='relatorio'>
                <div>{geraData()}</div>
                <div className="valoresDIV">
                    <span>{tr.nome}</span>
                    <span>R$ {tr.valor}</span>
                </div>
            </div>
        )

        return relatorios;
    }

    return (
        <div className="relatorios">
            <div className="saldoOcultar">
                <label>relatorio mensal</label>
            </div>
            <div>
                <span>selecione o mês desejado:</span>
                <select name="cars" id="cars" onChange={changeMonth}>
                    {months.map((mt, i) => {
                        return (
                            <option key={i}>
                                {mt}
                            </option>
                        )
                    })}
                </select>
            </div>
            {monthChosen != 0 && relatorios.map((rel, index) => {
                return (
                    <div key={index}>
                        {geraRel(rel)}
                    </div>
                )
            })}
        </div>
    );
}

export default RelatorioMensal;