import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Case from '../Case/Case';

import { getCases, addCase } from '../../model/model';

import { downloadPizasDataAction, addCaseAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const pizacase = await getCases();
        this.props.downloadPizasDataDispatch(pizacase);
    }

    inputCase = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const pizaArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const pizaArr = { name: pizaArrName, pizas: [] };
            await addCase(pizaArr);
            this.props.addCaseDispatch(pizaArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Текущие заказы
                </header>
                <main id="main-container">
                    {this.props.pizacase.map((pizaArr, index) => (
                        <Case key={`pizaarr-${index}`} pizaArrId={index}/>
                    ))}
                    <div className="pizaarr">
                    {isInputActive && <input
                        type="text"
                        id="add-pizaarr-input"
                        placeholder="Имя повара"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="pizaarr-name" onClick={this.inputCase}>
                        Добавить повара
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ pizacase }) => ({ pizacase });

const mapDispatchToProps = dispatch => ({
    addCaseDispatch: (pizaArr) => dispatch(addCaseAction(pizaArr)),
    downloadPizasDataDispatch: (pizacase) => dispatch(downloadPizasDataAction(pizacase)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
