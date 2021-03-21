import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {editObjective, getObjective, getObjectiveByID} from "../../reducer/objective_reducer";
import {DateLocal} from "../../common/DateLocal";

export const ModalAddForm = (props) => {

    return <div> {
        <form onSubmit={props.handleSubmit}>
            { props.objectiveList
                .filter(o => o.id === props.modal.id)
                .map(o => <div>
                    <Field type={'text'} name={'title'} component={'input'} placeholder={o.title}/>
                    <Field type='text' component={'select'} name={'main_id'}>
                        <option value="">Выбрать главную задачу:</option>
                        {props.objectiveList.map(o => (
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
                    <Field id='date_start' onKeyDown={(e) => e.preventDefault()} type='date' component={'input'}
                           name={'date_start'} min={DateLocal()}
                           max={DateLocal(document.getElementById('date_end'), 'max')}/>
                    <Field id='date_end' onKeyDown={(e) => e.preventDefault()} type='date' component={'input'}
                           name={'date_end'} min={DateLocal(document.getElementById('date_start'), 'min')}/>
                    <button>Добавить</button>
                </div>)
            }
        </form>

    }
    </div>
}

const ObjectiveReduxAddForm = reduxForm({
    form: 'editObjective',
    enableReinitialize: true
})(ModalAddForm)

class ModalEditObjectiveForm extends React.Component {

    render() {

        const onSubmit = (values) => {
            this.props.editObjective(this.props.modal.id, values)
        }

        return <div>
            <ObjectiveReduxAddForm
                initialValues={this.props.initialValues} labels={this.props.labels}
                                   modal={this.props.modal} objectiveList={this.props.objectiveList}
                                   onSubmit={onSubmit}/>
        </div>
    }
}

const mapStateToProps = (state) => ({
    initialValues: {
        title: state.objectivePage.objective.title,
        main_id: state.objectivePage.objective.main_id,
        label: state.objectivePage.objective.label,
        date_start: state.objectivePage.objective.date_start,
        date_end: state.objectivePage.objective.date_end
    },
    objectiveList: state.objectivePage.objectiveData,
    modal: state.headerBlock.modal,
    labels: state.labelPage.labelData
})

export default compose(
    withRouter,
    connect(mapStateToProps, {getObjective, editObjective})
)
(ModalEditObjectiveForm)