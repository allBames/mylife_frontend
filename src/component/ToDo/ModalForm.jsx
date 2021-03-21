import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {addLabel, getLabel, deleteLabel} from "../../reducer/label_reducer";

export const ModalAddForm = (props) => {

    const deleteLabel = (labelID) => {
        props.deleteLabel(labelID)
    }

    return <div> {
        <form onSubmit={props.handleSubmit}>
            {props.labelList.map(l => <div>{l.title}<span onClick={(e) => { deleteLabel(l.id, l) } }> X</span></div>)}
            <Field type={'text'} name={'title'} component={'input'} placeholder={'Введеите название'}/>
            <button>Создать метку</button>
        </form>

    }
    </div>
}

const LabelReduxAddForm = reduxForm({
    form: 'addLabel'
})(ModalAddForm)

class ModalForm extends React.Component {

    render() {
        const onSubmit = (values) => {
            this.props.addLabel(values)
        }

        return <div>
            <LabelReduxAddForm deleteLabel={this.props.deleteLabel} labelList={this.props.labelList} onSubmit={onSubmit}/>
        </div>
    }
}

const mapStateToProps = (state) => ({
labelList: state.labelPage.labelData
})

export default compose(
    withRouter,
    connect(mapStateToProps, {addLabel, getLabel, deleteLabel})
)
(ModalForm)