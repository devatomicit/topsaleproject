import React , {useEffect,useState} from 'react'
import { t ,getLang} from '../../utils/helper'
import ReactPaginate from "react-paginate";
import Formadd from './formadd'
import FormUpdate from './formupdate'
import {getadminbaners,deleteadminbaners} from '../../services/bannerService'
import {Modal} from 'react-bootstrap'
import { toast } from 'react-toastify'
export default function AdminBanner() {
  const   i18n  = getLang();
  const [show, setShow] = useState(false);
  const [updatedata , setupdatedata] = useState('')
  const [drowerupdate , setdrowerupdate ] = useState(false)
  const [droweradd, setadddrower] = useState(false)
    const [dateshow, setdateshow] = useState([])
    const [rowsPerPage , setrowsPerPage] = useState([])
    const [filterval , setfilterval] = useState([])
    const [offset , setoffset] = useState(0)
    const [selected , setselected] = useState(0)
    const [pagelimit,setpagelimit] = useState(5)
    const [rowsuprission,setrowsuprission]=useState(null)
    useEffect(() => {
      getbannerdata()
    }, [])
    const getbannerdata = () =>{
      getadminbaners()
      .then(res => {if(res.data.success){
        setrowsPerPage(res.data.data.banners) 
      const row = res.data.data.banners
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
        setupdatedata(el)
        setdrowerupdate(true)
      }
 
      const hidedrower = () => {
        if (drowerupdate)
        setdrowerupdate(false)
        if(droweradd)
        setadddrower(false)
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
        const res  = data.filter(el =>  val ? (
        strOp(el.isEnabled).includes(strOp(val))) : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
         const deletebanner = () => {
          deleteadminbaners(rowsuprission._id)
          .then(res => {toast.success(res.data.message)
            getbannerdata()
            setShow(false)
          })
         }
  const handleClose = () => setShow(false);
    return (
      <div className="container">
                              <h3>{t("banner.titel")}</h3>
      <hr/>
           <div className="d-flex justify-content-between">
                    <div className="bordergray d-flex  mr-4">
            <div className="input-group-prepend">
            <span className="bagroundtransparant p-1">
               <i className="fal fa-search"></i>
               </span>
               </div>
                <input type="text" onChange={(event) =>recherchefilter(event.target.value,rowsPerPage)}    className="border-0 width" placeholder={t("Admin.btnSearch")}></input>
                </div>

           <button onClick={()=>setadddrower(true)} className="addnew btn btn-primary pl"><i className="fal fa-plus pl-2 pr-2"></i>{" "} {t("Admin.btnadd")}</button>
           </div>
                <div onClick={() => hidedrower()} className={(droweradd || drowerupdate) ?"overlay is-open":"overlay"}></div>
            <div className={((droweradd &&i18n==="ar") || (drowerupdate && i18n==="ar"))   ? "arnav-menu  active" :((droweradd &&i18n==="en") || (drowerupdate && i18n==="en"))   ?"nav-menu  active": "nav-menu"}>
       
       {droweradd && <Formadd  hideSideBar={setadddrower} refrechdata= {getbannerdata} /> }
       {drowerupdate &&  <FormUpdate  hideSideBar={setdrowerupdate} rowdata ={updatedata} refrechdata= {getbannerdata}  /> }
      </div>
             <div dir="ltr " className= {!Boolean(dateshow.length) ? "d-none float-right mt-4" :"float-right mt-4"}>
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
              <th className="col ">{t("banner.Id")}</th>
              <th className="col">{t("banner.status")}</th>
              <th className="col">{t("banner.image")}</th>
              <th className="col">{t("banner.Action")}</th>
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("banner.Id")} className="col">{el._id.slice(el._id.length - 3,el._id.length)}</td>
                    <td label={t("banner.status")} className="col">{el.isEnabled ? "enabled" : "Not enabled"}</td>   
                    <td label={t("banner.image")} className="col"><img src={el.photo} alt="image"  width="120px" height="80px"/></td>
                    <td
                      label={t("banner.Action")}
                      className="col"

      
        >
          <i className="fas fa-pen bagroudicon" onClick={()=>Updaterow(el)}></i> <i className="fas fa-trash-alt tabfonticon pr-2 pl-2 cursor-pointer bagroudicon" onClick={()=>{detailrow(el);setShow(true)}}></i></td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div>
        <Modal show={show} onHide={handleClose}>
  
  <Modal.Header closeButton>
        <Modal.Title>{t("model.titel")} {" "} {rowsuprission?._id.slice(rowsuprission?._id.length - 3,rowsuprission?._id.length)}</Modal.Title>
      </Modal.Header>
        
      <div className="modal-body">
        {t("model.body")}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> handleClose()}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>deletebanner()}>{t("modal.delete")}</button>
      </div>
      </Modal>
  

        </div>
    )
}
