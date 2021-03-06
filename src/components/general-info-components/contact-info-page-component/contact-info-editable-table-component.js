import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TableBody from 'material-table';
import ContactInfoService from '../../../services/contact-info-service';
import Box from '@material-ui/core/Box';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Axios from 'axios';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function ContactInfoEditableTableComponent() {
  const [entries, setEntries] = useState({
    data: [
      {
        personid: 0,
        birthdate: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
      }
    ]
  });

  const [state] = React.useState({
    columns: [
      { title: 'Person ID No:', field: 'personid', hidden: true,  headerStyle: { backgroundColor: '#CCD6DD' } },
      { title: 'Firstname', field: 'firstname', headerStyle: { backgroundColor: '#CCD6DD' } },
      { title: 'Lastname', field: 'lastname', headerStyle: { backgroundColor: '#CCD6DD' } },
      { title: 'Birth Date', field: 'birthdate', headerStyle: { backgroundColor: '#CCD6DD' } },
      { title: 'Email', field: 'email', headerStyle: { backgroundColor: '#CCD6DD' } },
      { title: 'Phone', field: 'phone', headerStyle: { backgroundColor: '#CCD6DD' }, }
    ]
  });

  useEffect(() => {
    ContactInfoService.getContactInfo().then(response => {
      let data = [];
      response.data.forEach(e1 => {
        data.push({
          personid: e1.personid,
          birthdate: e1.birthdate,
          email: e1.email,
          firstname: e1.firstname,
          lastname: e1.lastname,
          phone: e1.phone
        });
        console.log(data);
      });
      setEntries({ data: data });
    })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  const handleRowAdd = (newData,resolve) => {
    if(newData.firstname === null) {
      alert("First name entry is required");
    }
    Axios.post('http://localhost:8080/app/person-info/add-person-information', newData)
    .then(res => {
      console.log(newData);
      let dataToAdd = [...entries.data];
      dataToAdd.push(newData);
      setEntries(dataToAdd);
      resolve();
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      resolve();
    });
  }

  const handleRowDelete = (oldData, resolve) => {
    Axios.delete(`http://localhost:8080/app/person-info/person/${oldData.personid}`)
    .then(res => {
      console.log(oldData.personid);
      const dataDelete = [...entries.data];
      const index = oldData.tableData.personid;
      dataDelete.splice(index,1);
      setEntries([...dataDelete]);
      resolve();
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      resolve();
    });
  }

  const handleRowUpdate = (newData,oldData,resolve) => {
    Axios.put(`http://localhost:8080/app/person-info/person/${oldData.personid}`,newData)
    .then(res => {
      console.log(newData);
      const dataUpdate = [...entries.data];
      const index = oldData.tabledata.personid;
      dataUpdate[index] = newData;
      setEntries([...dataUpdate]);
      resolve();
    })
    .catch(error => {
      console.log(error);
      resolve();
      window.reload();
    });
  }

  return (
    <div>
      <Box border={3} borderRadius={16}>
        <MaterialTable
          title="Contact Information"
          columns={state.columns}
          data={entries.data}
          icons={tableIcons}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData,resolve)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData,oldData,resolve)
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData,resolve)
              }),
          }}
        />
      </Box>
    </div>
  )
}
