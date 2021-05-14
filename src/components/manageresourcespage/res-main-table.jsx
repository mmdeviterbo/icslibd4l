import React from 'react';
import Table from 'react-bootstrap/Table'

class MainResourceTable extends React.Component{
    render(){
        return(
            <Table bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Classification</th>
                    <th>Title</th>
                    <th>Author</th>
                    </tr>
                </thead>
            </Table>
        )
    }
}

export default MainResourceTable;