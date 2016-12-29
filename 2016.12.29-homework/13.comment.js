let Board = React.createClass({
    getInitialState(){
        return {lists:[]}
    },
    handleClick(){

        this.state.lists.push(this.refs.myTxt.value);
        this.refs.myTxt.value = '';
        this.setState({lists:this.state.lists});
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言板</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.lists.map(function (item,index) {
                                return <li className="list-group-item" key={index}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input ref="myTxt" type="text" className="form-control"/>
                    <button onClick={this.handleClick} className="btn btn-primary">留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));