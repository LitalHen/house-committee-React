import React from 'react'
import DashboardIssues from '../component/DashboardIssues'
import DashboardMessages from '../component/DashboardMessages'

class HomePage extends React.Component{

    constructor(props){
        super(props);
    }
render(){
    return(
        <div>
          {this.props.children}
        </div>
    )
}
    
}

export default HomePage