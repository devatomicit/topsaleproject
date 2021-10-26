import React , {useEffect,useState} from 'react'
import ReactPaginate from "react-paginate";
import { t ,getLang} from '../../utils/helper'
import Formadd from './fromadd'
import FormUpdate from './formupdate'
import {Modal} from 'react-bootstrap'
import {getadminregion,deletedminregion} from '../../services/regionsService'
import { toast } from 'react-toastify'
export default function Region() {
  const   i18n  = getLang();
  const [updatedata , setupdatedata] = useState('')
  const [show, setShow] = useState(false);
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
    getregiondata()
  }, [])
  const getregiondata = () =>{
    getadminregion()
    .then(res => {if(res.data.success){
      setrowsPerPage(res.data.data) 

    const row = res.data.data
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
    const  onPageChanged = (data) => {
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
      const detailrow = (el) => {
        setrowsuprission(el)

      }
 
      const hidedrower = () => {
        if (drowerupdate)
        setdrowerupdate(false)
        if(droweradd)
        setadddrower(false)
      }
     
      const  strOp = (str) => {
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
      
      const   recherchefilter = (val, data) => {
        const res  = data.filter(el =>  val ? (strOp(el.title.en).includes(strOp(val)) ||
        strOp(el.title.ar).includes(strOp(val)))  : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
     const deleteregion = () => {
      deletedminregion(rowsuprission._id)
      .then(res => {getregiondata()
        handleClose()
        toast.success(res.data.message)
      })
      .catch(err => {toast.error(err.response.data.message)
     })
     
       
     }
     const handleClose = () => setShow(false);
    return (
      <div className="container">
                  <h3>{t("region.titel")}</h3>
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

           <button onClick={()=>setadddrower(true)} className="addnew btn btn-primary pl"><i class="fal fa-plus pl-2 pr-2"></i>{" "} {t("Admin.btnadd")}</button>
           </div>
                <div onClick={() => hidedrower()} className={(droweradd || drowerupdate) ?"overlay is-open":"overlay"}></div>
            <div className={((droweradd &&i18n==="ar") ||(drowerupdate && i18n==="ar"))   ? "arnav-menu  active" :((droweradd &&i18n==="en") || (drowerupdate && i18n==="en" ))  ?"nav-menu  active": "nav-menu"}>
      
       {droweradd && <Formadd  hideSideBar={setadddrower} refrechdata= {getregiondata} /> }
       {drowerupdate &&  <FormUpdate  hideSideBar={setdrowerupdate} rowdata ={updatedata} refrechdata= {getregiondata}  /> }
      </div>
            <div dir="ltr" className= {!Boolean(dateshow.length) ? "d-none float-right mt-2" :"float-right mt-2"}>
             <ReactPaginate
          previousLabel={<i class="fal fa-chevron-left"></i>}
          nextLabel={<i class="fal fa-angle-right"></i>}
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
           <div className="table-responsive">
             <table className="table table-borderless mt-4">
          <thead>
            <tr className=" th-table">
              <th className="col ">{t("region.id")}</th>
              <th className="col">{t("region.namear")}</th>
              <th className="col">{t("region.namean")}</th>
              <th className="col">{t("region.action")}</th>
              
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("region.id")} className="col">{el._id.slice(el._id.length - 3,el._id.length)}</td>
                    <td label={t("region.namear")} className="col">{el?.title?.ar}</td>
                    <td label={t("region.namean")} className="col">{el?.title?.en }</td>
                    
                    
                   
                    <td
                      label={t("region.action")}
                      className="col"

      
        >
          <i className="fas fa-pen cursor-pointer" onClick={()=>Updaterow(el)}></i> <i  onClick={()=>{detailrow(el) ; setShow(true)}} className="fas fa-trash-alt tabfonticon pr-2 pl-2 cursor-pointer"
                        ></i></td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div> 


  <Modal show={show} onHide={handleClose}>
  
    <Modal.Header closeButton>
          <Modal.Title>{t("model.titel")} {" "} {rowsuprission?.title[i18n]}</Modal.Title>
        </Modal.Header>
      <div className="modal-body">
        {t("model.body")} 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> handleClose()}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>deleteregion()}>{t("modal.delete")}</button>
      </div>
 
  </Modal>

        </div>
    )
}
