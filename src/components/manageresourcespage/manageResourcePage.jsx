import React from 'react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../../styles/manageresources/manage-resources-style.css';

import ManageItemsHeader from './manageItemsHeader';
import FieldsContainerRes from './filterFieldsResources';
import ResTableContainer from './resourceTableContainer';

const ManageResPage = ({ resourceList }) => {
  return (
    <div className="manage-resources-page-container">
      {/* <TempNavbar/> */}
      {/* <Link to='/view-sp-thesis' className="btn btn-warning">View SP/Thesis</Link> */}
      <ManageItemsHeader />
      <FieldsContainerRes />
      {/* <ResTableContainer resourceList={resourceList} /> */}
      <ResTableContainer />
    </div>
  );
};

export default ManageResPage;
