import './app-info.css';

const AppInfo = (props) => {
    const {amount, countOfIncreasedEmp} = props;
    const i = countOfIncreasedEmp();
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании Paramount</h1>
            <h2>Общее число сотрудников {amount}</h2>
            <h2>Премию получат: {i}</h2>
        </div>
    )
}

export default AppInfo;