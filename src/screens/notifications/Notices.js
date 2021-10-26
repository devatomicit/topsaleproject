import React from "react";
import moment from "moment";
import { t ,getLang} from '../../utils/helper'
import { NavLink, useHistory } from "react-router-dom";
function Notices({
  openEdit,
  setopenEdit,
  notices,
  handleSearch,
  handleReset,
  searchTitle,
  setsearchTitle,
  handleDelete,
}) {
  return (
    <div className="container">
      <h3>{t("notification.titel")}</h3>
      <hr/>

      <form action="" className="row">
        <div className="col-sm-4 mb-3">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setsearchTitle(e.target.value)}
            placeholder={t("notification.bynotification")}
            className="form-control"
          />
        </div>
        <div className="col-sm-3 d-flex justify-content-between">
          <div>
            <button onClick={handleSearch} className="btn blue__btn">
               {t('notice.search')}
            </button>
          </div>
          <div>
            <button onClick={handleReset} className="btn orange__btn">
               {t('notice.reset')}
            </button>
          </div>
        </div>
      </form>
  <div className="float-right">

     <NavLink to="/admin/createusernotice"> <button className="mr-2 ml-2 btn btn-primary">{t('notice.btnaddone')}</button></NavLink>
     <NavLink to="/admin/allnotice">   <button className="mr-2 ml-2 btn btn-primary">{t('notice.btnall')}</button></NavLink>
    </div>
      
      <div className="table-responsive">
             <table className="table table-borderless mt-4">
          <thead>
            <tr className=" th-table">
              <th className="col ">{t("notice.id")}</th>
              <th className="col">{t("notice.body")}</th>
              <th className="col">{t("notice.date")}</th>
              
              <th className="col">{t("notice.user")}</th>
              
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
                 notices?.length > 0 ? (
                  
                  notices?.map((el,index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("notice.id")} className="col">{el._id.slice(el._id.length - 3,el._id.length)}</td>
                    <td label={t("notice.body")} className="col">{getLang() === "ar" ? el?.body?.ar : el?.body?.en }</td>
                    <td label={t("notice.date")} className="col">{moment(el.createdAt).locale("fr").fromNow()}</td>
                  
                    <td label={t("notice.user")} className="col">{el?.objectAd?.title }</td>
                    
                    
                  </tr>
                );
              }))
              : (
                <h4>No Notice yet</h4>
              )}{" "}
          </tbody>
        </table>
        </div> 
     

  
          
    
        
      </div>

  );
}

export default Notices;
  //     className="chip__date mb-2"
          
      //   >
      //     {moment(e.date).format(" Do MMMM, YYYY")}
      //     </p>
      //   <p>
      //     <strong> {e.description} </strong>
      //   </p>
      //   <div>
      //     <h6>
      //       {e.createdBy} /{" "}
      //       <span className="text-muted"> {moment(e.createdAt).fromNow()}</span>
      //     <i onClick={handleDelete}></i>
      //     </h6>
      //   </div>
      // </div>
             
            //   <hr />
            // </div>
            // </div>