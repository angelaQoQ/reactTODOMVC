import React from "react";

// require('./todo.css')
import './todo.css'
import '../assets/font/style.css'

class Todo extends React.Component {

    constructor(props) {
        super()
        this.state = {
            title: "TODOLIST",
            arrow: "icon-arrow-up",
            inp: "",
            todocontent: []
        }
    }


    render() {
        let countKey = 0

        return (
            <div id="TODOLIST">

                {/* 标题 */}
                <h1>{this.state.title}</h1>

                {/* 内容录入 */}
                <div className="todoinput icon-arrow-up">
                    <input type="text"
                        placeholder="enter what to do"
                        value={this.state.inp}
                        onChange={this.getVal.bind(this)}
                    />
                    <button className="commit" onClick={this.record.bind(this)} >记录</button>
                </div>

                {/* 内容展示区 */}
                <div className="todocontent">
                    <ul>
                        {
                            this.state.todocontent.map((item) => {
                                return (
                                    <li key={"key" + countKey++}
                                        className={item.isDone ? "icon-star-full" : "icon-star-empty"}
                                    >
                                        <p className="content-detail">{item.content}</p>

                                        {!item.isDone ?
                                            <button
                                                className="complete"
                                                onClick={this.done.bind(this, countKey - 1)}
                                            >
                                                完成
                                                    </button>
                                            : ""
                                        }
                                        <button className="del" onClick={this.del.bind(this, countKey - 1)}>删除</button>

                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* 整体控制 */}
                <div className="ctrl">
                    <button className="del-all" onClick={this.delAll.bind(this)}>全部删除</button>
                    <button className="complete-all" onClick={this.doneAll.bind(this)}>全部完成</button>
                </div>


            </div>
        )
    }


    // init的时候
    componentWillMount() {
        let todos = JSON.parse(window.localStorage.getItem('tododata'))

        this.setState({
            todocontent: todos ? todos : []
        })
    }

    // 获取输入值
    getVal(e) {
        this.setState({
            inp: e.target.value
        })
    }

    // 添加
    record() {
        if (!this.state.inp || this.beforeSave(this.state.inp)) return
        let temArr = this.state.todocontent
        temArr.push({
            isDone: false,
            content: this.state.inp,
            time: new Date().getUTCDate()
        })
        this.setState({
            todocontent: temArr,
            inp: ""
        })
        this.saveData()
    }

    // 完成
    done(index) {
        let flag = this.state.todocontent[index].isDone
        this.state.todocontent[index].isDone = !flag
        this.saveData()
    }

    del(index) {
        let temArr = this.state.todocontent
        temArr.splice(index, 1)
        this.setState({
            todocontent: temArr
        })
        this.saveData()
    }

    doneAll() {
        this.state.todocontent.map((item) => {
            item.isDone = true
            return {
                ...item
            }
        })
        this.saveData()
    }

    delAll() {
        this.state.todocontent.splice(0)
        this.setState({
            todocontent: this.state.todocontent
        })
        this.saveData()
    }

    beforeSave(val) {
        this.setState({
            inp: ""
        })
        return this.state.todocontent.some((item) => {
            return val == item.content
        })
    }

    saveData() {
        window.localStorage.setItem('tododata', JSON.stringify(this.state.todocontent))
        this.forceUpdate();
    }

}

export default Todo