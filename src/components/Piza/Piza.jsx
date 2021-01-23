import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Piza.css';

import { editPiza, removePiza, movePiza } from '../../model/model';

import { 
    editPizaNameAction,
    removePizaAction,
    movePizaLeftAction,
    movePizaRightAction
} from '../../store/actions';


class Piza extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            pizaId: this.props.pizaId,
            pizaArrId: this.props.pizaArrId
        };
        await movePiza({
            ...moveData,
            destShelfId: moveData.pizaArrId - 1
        });
        this.props.movePizaLeftDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            pizaId: this.props.pizaId,
            pizaArrId: this.props.pizaArrId
        };
        await movePiza({
            ...moveData,
            destShelfId: moveData.pizaArrId + 1
        });
        this.props.movePizaRightDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить пиццу?');
        if (!ok) {
            return;
        }

        const removeData = {
            pizaId: this.props.pizaId,
            pizaArrId: this.props.pizaArrId
        };
        await removePiza(removeData);
        this.props.removePizaDispatch(removeData);
    }

   

    onNameEdit = async () => {
        let newName = prompt('Введите новоe название пиццы');
        if (!newName || !newName.trim()) {
            alert('Невалидное название');
            return;
        }
        
        newName = newName.trim();

        const piza = this.props.pizacase[this.props.pizaArrId].pizas[this.props.pizaId];
        const pizaEditData = {
            pizaId: this.props.pizaId,
            pizaArrId: this.props.pizaArrId,
            newName: newName,
        };
        await editPiza({
            ...pizaEditData,
        });
        this.props.editPizaNameDispatch(pizaEditData);
    }

    render() {
        const { pizaId, pizaArrId } = this.props;
        const piza = this.props.pizacase[pizaArrId].pizas[pizaId];

        return (
            <div className="pizaarr-piza">
                <div className="pizaarr-piza-description">
                <div className="pizaarr-piza-name">
                    { piza.name }
                </div>
                </div>
                
                <div className="pizaarr-piza-controls">
                <div className="pizaarr-piza-controls-row">
                    <div className="pizaarr-piza-controls-icon left-arrow-icon" onClick={this.moveLeft}></div>
                    <div className="pizaarr-piza-controls-icon right-arrow-icon" onClick={this.moveRight}></div>
                </div>
                <div className="pizaarr-piza-controls-row">
                    <div className="pizaarr-piza-controls-icon delete-icon" onClick={this.onRemove}></div>
                </div>
                <div className="pizaarr-piza-controls-row">
                    <div className="pizaarr-piza-controls-icon editdesc-icon" onClick={this.onNameEdit}></div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ pizacase }) => ({ pizacase });

const mapDispatchToProps = dispatch => ({
    editPizaNameDispatch: ({ pizaId, pizaArrId, newName }) => dispatch(editPizaNameAction({ pizaId, pizaArrId, newName })),
    removePizaDispatch: ({ pizaId, pizaArrId }) => dispatch(removePizaAction({ pizaId, pizaArrId })),
    movePizaLeftDispatch: ({ pizaId, pizaArrId }) => dispatch(movePizaLeftAction({ pizaId, pizaArrId })),
    movePizaRightDispatch: ({ pizaId, pizaArrId }) => dispatch(movePizaRightAction({ pizaId, pizaArrId })),
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Piza);
