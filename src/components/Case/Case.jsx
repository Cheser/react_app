import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Case.css';

import { addPiza } from '../../model/model';

import Piza from '../Piza/Piza';
import { addPizaAction } from '../../store/actions';


class Case extends PureComponent {

    onPizaAdd = async () => {
        let pizaName = prompt('Введите название пиццы', '');
        if (!pizaName || !pizaName.trim()) {
            alert('Не правильное название!');
            return;
        }
        pizaName = pizaName.trim();




        const newPizaData = {
            piza: {
                name: pizaName,
            },
            pizaArrId: this.props.pizaArrId
        };

        await addPiza(newPizaData);
        this.props.addPizaDispatch(newPizaData);
    }

    render() {
        const pizaArrId = this.props.pizaArrId;
        const pizaArr = this.props.pizacase[pizaArrId];

        return (
        <div className="pizaarr">
            <header className="pizaarr-name">
                { pizaArr.name }
            </header>
            <div className="pizaarr-pizas">
                {pizaArr.pizas.map((piza, index) => (
                    <Piza key={`piza-${index}`} pizaId={index} pizaArrId={pizaArrId} />
                ))}
            </div>
            <footer className="pizaarr-add-task" onClick={this.onPizaAdd}>
                Добавить пиццу
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ pizacase }) => ({ pizacase });

const mapDispatchToProps = dispatch => ({
    addPizaDispatch: ({ piza, pizaArrId }) => dispatch(addPizaAction({ piza, pizaArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Case);
