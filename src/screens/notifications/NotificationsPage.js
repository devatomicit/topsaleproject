import React, { useState, useEffect } from "react";
import Notice from "./Notices";
import axios from "axios";
import { toast } from 'react-toastify'
import {getnotification} from '../../services/notofication'

function NotificationsPage() {

  const [notices, setnotices] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [title, settitle] = useState("");
  const [searchTitle, setsearchTitle] = useState("");
  const [openEdit, setopenEdit] = useState(false);

  //edit

  const [editID, seteditID] = useState("");

  useEffect(() => {
    getnotification()
    .then((res) => {
      if(res.data.success){
      setnotices(res.data.data.notifications);
      setstoreData(res.data.data.notifications);
      }
    });
  }, []);



  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/notification/delete/${editID}`)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          return 0;
        }
        setnotices(notices.filter((e) => e._id !== editID));
        toast.success("Notice deleted");
      })
      .catch((err) => {
        toast.error("Failed to delete");
      });
  };



  const handleReset = (e) => {
    e.preventDefault();
    setsearchTitle("");
    setnotices(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTitle){
      
  const notice=  notices.filter(el => el.body?.ar ===searchTitle ||el.body?.en ===searchTitle )
  console.log(notices,searchTitle,notice)
  setnotices(notice)
    }
    else
    setnotices(storeData)
  };

 
  return (
    <div>
   
      <div id="notifications">
        <Notice
          openEdit={openEdit}
          handleReset={handleReset}
          setopenEdit={setopenEdit}
          handleSearch={handleSearch}
          searchTitle={searchTitle}
          setsearchTitle={setsearchTitle}
          notices={notices}
          handleDelete={handleDelete}
     
        />
      </div>
    </div>
  );
}

export default NotificationsPage;
