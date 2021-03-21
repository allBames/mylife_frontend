import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getObjective} from "../../reducer/objective_reducer";

const ModalForm = (props) => {

    return <div> {
        <form onSubmit={props.handleSubmit}>
            <Field type={'date'} name={'date_start'} component={'input'}/>
            <Field type={'date'} name={'date_end'} component={'input'}/>
            <button>ОК</button>
        </form>

    }
    </div>
}

const SelectDateReduxForm = reduxForm({
    form: 'selectDate'
})(ModalForm)

class ModalSelectDateForm extends React.Component {

    render() {
        const onSubmit = (values) => {
            let date = ([values.date_start, values.date_end])
            return this.props.getObjective(date[0], date[1])
        }

        return <div>
            <SelectDateReduxForm onSubmit={onSubmit}/>
        </div>
    }
}

const mapStateToProps = (state) => ({
})

export default compose(
    withRouter,
    connect(mapStateToProps, {})
)
(ModalSelectDateForm)