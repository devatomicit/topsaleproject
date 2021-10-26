import React , {useEffect,useState} from 'react'
import { t ,getLang} from '../../utils/helper'
import Formadd from './fromadd'
import ReactPaginate from "react-paginate";
import {getadminuser} from '../../services/userService'
import {Modal} from 'react-bootstrap'
export default function User() {
  const   i18n  = getLang();
  const [pageloded, setpageloded] = useState(1)
  const [dateshow, setdateshow] = useState([])
  const [rowsPerPage , setrowsPerPage] = useState([])
  const [filterval , setfilterval] = useState([])
  const [offset , setoffset] = useState(0)
  const [selected , setselected] = useState(0)
  const [pagelimit,setpagelimit] = useState(20)
  const [rowsuprission,setrowsuprission]=useState(null)
  const [show, setShow] = useState(false);
  const [droweradd, setadddrower] = useState(false)
  useEffect(() => {
    getuserdata()
  }, [])

  const getuserdata = () =>{
    getadminuser(pageloded)
    .then(res => {if(res.data.success){
      setrowsPerPage(res.data.data.users) 
    const row = res.data.data.users
      const dat =  row.slice(offset, pagelimit+offset)
      if(Boolean(dat.length))
     setdateshow(dat)
     else {
       const dat =  row.slice(0, pagelimit) 
       setselected(0)
       setdateshow(dat)
     }
    }
      else 
      setdateshow([])

    }
      )
    .catch(err => console.log(err))
  }

    const   onPageChanged = (data) => {
        let selected = data.selected;
      let offset = Math.ceil(selected * pagelimit);
      if(Boolean(filterval.length))
      { const currentdata = filterval.slice(offset, offset +pagelimit)
       setoffset(offset)
       setselected(selected)
      setdateshow(currentdata)
      }
      else{
        const currentdata = rowsPerPage.slice(offset, offset +pagelimit)
        setoffset(offset)
        setselected(selected)
       setdateshow(currentdata)
       }
      }
      const Updaterow = (el) => {
        console.log(el)
      }
      const detailrow = (el) => {
        setrowsuprission(el)
      }
      const  strOp = (str) => {
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
      
      const   recherchefilter = (val, data) => {
  
        const res  = data.filter(el =>  val ? (strOp(el.name).includes(strOp(val)) ||
        strOp(el.mobile).includes(strOp(val))) : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
     
         const deleteuser = () => {
        //   deletedminregion(rowsuprission._id)
        //   .then(res => {getregiondata()
        //     handleClose()
        //     toast.success(res.data.message)
        //   })
        //   .catch(err => {toast.error(err.response.data.message)
        //  })
          console.log("deleteuser")
           
         }

        const getnextdata = () => {
          setpageloded(pageloded+1)
          getuserdata()
        }
        const getpreviusedate = () => {
          setpageloded(pageloded-1)
          getuserdata()
        }
    return (
      <div className="container ">
                       <h3>{t("user.titel")}</h3>
      <hr/>
      <button onClick={()=>setadddrower(true)} className="addnew btn btn-primary pl"><i class="fal fa-plus pl-2 pr-2"></i>{" "} {t("Admin.btnadd")}</button>
               
               <br/>  <br/>
                <div className="bordergray col-md-5  d-flex ">
 
            <div className="input-group-prepend ">
            <span className="bagroundtransparant p-1">
               <i className="fal fa-search"></i>
               </span>
               </div>
                <input type="text" onChange={(event) =>recherchefilter(event.target.value,rowsPerPage)}    className="border-0 width" placeholder={t("Admin.btnSearch")}></input>
                </div>
                <div onClick={() => setadddrower(false)} className={droweradd ?"overlay is-open":"overlay"}></div>
                <div className={(droweradd &&i18n==="ar")   ? "arnav-menu  active" :(droweradd &&i18n==="en") ?"nav-menu  active": "nav-menu"}>
      
       {droweradd && <Formadd  hideSideBar={setadddrower} refrechdata= {getuserdata} /> }

      </div>
     
      <div className="mt-2 mb-2" style={{display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"}}> 
      <button onClick={getpreviusedate} className="btn btn-primary" disabled={pageloded===1}>Previw <i class="fas fa-fast-backward"></i></button>
      <span className="pl-2 pr-2">page {" "} {pageloded} </span>
      <button onClick={getnextdata} className="btn btn-primary">Next <i class="fas fa-fast-forward"></i></button>
             </div>
             <div dir="ltr" className= {!Boolean(dateshow.length) ? "d-none float-right mt-2" :"float-right mt-2"}>
             <ReactPaginate
          previousLabel={<i className="fal fa-chevron-left"></i>}
          nextLabel={<i className="fal fa-angle-right"></i>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={filterval.length >0 ?Math.ceil(filterval.length / pagelimit) : Math.ceil(rowsPerPage.length / pagelimit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={onPageChanged}
          containerClassName={'pagination'}
          activeClassName={'active'}
          initialPage={0}
          forcePage={selected}
        /> </div>
           <div className="table-responsive mt-2">
             <table className="table table-borderless ">
          <thead>
            <tr className=" th-table">
              <th className="col ">{t("user.Nom")}</th>
              <th className="col">{t("user.phone")}</th>
              <th className="col">{t("user.profilimage")}</th>
              <th className="col">{t("user.createdate")}</th>
              <th className="col">{t("user.lastconection")}</th>
              <th className="col">{t("user.annoncenum")}</th>  
              <th className="col">{t("user.follower")}</th>
              <th className="col">{t("user.Action")}</th>
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("user.Nom")} className="col">{el.name }</td>
                    <td label={t("user.phone")} className="col">{el.mobile }</td>
                    <td label={t("user.profilimage")} className="col">{el.profilePhoto ? <img src={el.profilePhoto} alt="image user" width="80px" height="80px" className=""></img> : "-" }</td>
                    <td label={t("user.createdate")} className="col">{new Intl.DateTimeFormat("en-GB").format(new Date(el.createdAt))}</td>
                    <td label={t("user.lastconection")} className="col">{el.lastActive ? new Intl.DateTimeFormat("en-GB").format(new Date(el.lastActive)) : "-"}</td>
                    <td label={t("user.annoncenum")} className="col">{el?.stats?.adsCount}</td>
                    <td label={t("user.follower")} className="col">{el?.stats?.followersCount}</td>
                   
                    <td
                      label={t("user.Action")}
                      className="col">
          <i className="fas fa-pen cursor-pointer" onClick={()=>Updaterow(el)} data-bs-toggle="tooltip" data-bs-placement="top" title="update user"></i> <i className="fas fa-trash-alt cursor-pointer" onClick={()=>{detailrow(el) ; setShow(true)}} data-bs-toggle="tooltip" data-bs-placement="top" title="delete user"></i></td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div>
        <Modal show={show} onHide={()=>setShow(false)}>
  
    <Modal.Header closeButton>
          <Modal.Title>{t("model.titel")} {" "} {rowsuprission?.name}</Modal.Title>
        </Modal.Header>
      <div className="modal-body">
        {t("model.body")} 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> setShow(false)}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>deleteuser()}>{t("modal.delete")}</button>
      </div>
 
  </Modal>
        </div>
    )
}
