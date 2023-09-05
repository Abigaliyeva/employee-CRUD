import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import Employeeslist from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 15000, increase: false, rise: true, id: 3}
            ],
            term: '',
            filter: 'all',
            maxID: 4
        }
        
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary, e) => {
        e.preventDefault();
        if(name.length > 3 & salary > 0) {
            this.setState(({data, maxID}) => {
                const inputData = {
                    name: name,
                    salary: salary,
                    increase: false,
                    rise: false,
                    id: maxID
                };
                return {
                    data: [...data, inputData],
                    maxID: maxID + 1
                }
            })
        }
    }

    onToggleProp = (id, prop) => { 
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    countOfIncreasedEmp = () => {
        let i = 0;
        this.state.data.forEach(item => {
            if (item.increase === true) i++;
        })
        return i;
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1 
        })
    }

    onSendSearchTerm = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => {
                    return item.rise === true; 
                });
            case 'salaryMore':
                return items.filter(item => {
                    return item.salary > 1000;
                });
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); 
        const amount = data.length;

        return (
            <div className="app">
                <AppInfo
                    amount={amount}
                    countOfIncreasedEmp={this.countOfIncreasedEmp}/>
                <div className="search-panel">
                    <SearchPanel onSendSearchTerm={this.onSendSearchTerm}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <Employeeslist 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;