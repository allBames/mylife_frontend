import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {addObjective, getObjective} from "../../reducer/objective_reducer";
import {DateLocal} from "../../common/DateLocal";
import {getLabel} from "../../reducer/label_reducer";
import {Modal} from "../../common/modal/Modal";
import ModalForm from "./ModalForm";



export const ObjectiveAddForm = (props) => {
    const [modal, setModal] = useState({
        modal: false
    })
    return <div> {
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className='ToDo'>
                    <div className='body'>
                        <Field type="text" name={'title'} component={'input'} placeholder='Введите название задачи'/>
                        <Field type='text' component={'select'} name={'main_id'}>
                            <option value="">Выбрать главную задачу:</option>
                            {props.objectives.map(o => (
                                o.main_id == null && <option value={o.id} key={o.id}>{o.title}</option>
                            ))}
                        </Field>
                        <Field type='text' component={'select'} name={'label'}>
                            <option value="">Выбрать метку:</option>
                            {props.labels.map(l => (
                                <option value={l.title} key={l.id}>
                                    {l.title}
                                </option>
                            ))}
                        </Field>
                        <div onClick={() => setModal({...modal, modal: true})}>+</div>
                        <Field id='date_start' onKeyDown={(e) => e.preventDefault()} type='date' component={'input'}
                               name={'date_start'} min={DateLocal()}
                               max={DateLocal(document.getElementById('date_end'), 'max')}/>
                        <Field id='date_end' onKeyDown={(e) => e.preventDefault()} type='date' component={'input'}
                               name={'date_end'} min={DateLocal(document.getElementById('date_start'), 'min')}/>
                        <button>Добавить</button>
                    </div>
                </div>
            </form>
            <Modal
                onModalClose={() => setModal({...modal, modal: false})}
                title={'Добавить новую метку'}
                isOpened={ modal.modal }>
                <ModalForm/>
            </Modal>
        </div>


    }
    </div>
}

const ObjectiveReduxAddForm = reduxForm({
    form: 'addObjective',
    enableReinitialize: true,
})(ObjectiveAddForm)

class ToDo extends React.Component {

    componentDidMount() {
        this.props.getLabel()
    }

    render() {
        const onSubmit = (values) => {
            this.props.addObjective(values)
        }

        return <div>
            <ObjectiveReduxAddForm objectives={this.props.objectives} labels={this.props.labels}
                                   initialValues={this.props.initialValues} onSubmit={onSubmit}/>
        </div>
    }
}

const mapStateToProps = (state) => ({
    initialValues: {
        title: state.objectivePage.objectiveData.title,
        date_start: state.objectivePage.objectiveData.date_start,
        date_end: state.objectivePage.objectiveData.date_end,
        label: state.objectivePage.objectiveData.label,
        main_id: state.objectivePage.objectiveData.main_id
    },
    labels: state.labelPage.labelData,
    objectives: state.objectivePage.objectiveData
})

export default compose(
    withRouter,
    connect(mapStateToProps, {addObjective, getLabel, getObjective})
)
(ToDo)