import React , {useEffect,useState} from 'react'
import { t ,getLang} from '../../utils/helper'
import ReactPaginate from "react-paginate";
import Formadd from './add'
import {Modal} from 'react-bootstrap'
import Formupdate from './update'
import {gettopbanner} from '../../services/topbannerService'
export default function Topbanner() {

  const   i18n  = getLang();
  const [showcat, setShowcat] = useState(false)
  const [updatedata , setupdatedata] = useState('')
  const [drowerupdate , setdrowerupdate ] = useState(false)
  const [droweradd, setadddrower] = useState(false)
  const [dateshow, setdateshow] = useState([])
  const [rowsPerPage , setrowsPerPage] = useState([])
  const [filterval , setfilterval] = useState([])
  const [offset , setoffset] = useState(0)
  const [selected , setselected] = useState(0)
  const [pagelimit,setpagelimit] = useState(5)
  const [catrowsuprission,setcatrowsuprission] = useState("")
  useEffect(() => {
    getcatdata()
  }, [])
  const getcatdata = () =>{
    gettopbanner()
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
  
      const hidedrower = () => {
        if (drowerupdate)
        setdrowerupdate(false)
        if(droweradd)
        setadddrower(false)
      }

      const Updaterow = (el) => {
        setupdatedata(el)
        setdrowerupdate(true)
      }
      const detailrow = (el) => {
        setcatrowsuprission(el)
      }
      
      const  strOp = (str) => {
        if(str)
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
      const   recherchefilter = (val, data) => {
        const res  = data.filter(el =>  val ? (strOp(el.type).includes(strOp(val))
         ||
        (el?.title?.ar!== undefined && strOp(el?.title?.ar).includes(strOp(val)))||(
        el?.title?.en!== undefined && strOp(el?.title?.en).includes(strOp(val)))) : true)

        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
       
         const    deletecatrowsuprission = () => {
            console.log('delete')

              }

          
              const handleClosecat = () =>{
                setShowcat(false)
              }
           
    return (
      <div className="container">
                      <h3>{t("topbanner.titel")}</h3>
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
            <div>
            <button onClick={()=>setadddrower(true)} className="addnew btn btn-primary mr-2"><i className="fal fa-plus pl-2 pr-2"></i>{" "} {t("Admin.btnadd")}</button>



            </div>
          
           </div>
                <div onClick={() => hidedrower()} className={(droweradd || drowerupdate) ?"overlay is-open":"overlay"}></div>
            <div className={((droweradd &&i18n==="ar") || (drowerupdate && i18n==="ar"))    ? "arnav-menu  active" :((droweradd &&i18n==="en") || (drowerupdate && i18n==="en") )   ?"nav-menu  active": "nav-menu"}>
       
       {droweradd && <Formadd  hideSideBar={setadddrower} refrechdata= {getcatdata} /> }
       {drowerupdate &&  <Formupdate  hideSideBar={setdrowerupdate} rowdata ={updatedata} refrechdata= {getcatdata}  /> }
    
      </div> 
             <div dir="ltr" className= {!Boolean(dateshow.length) ? "d-none float-right mt-4" :"float-right mt-4"}>
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
              <th className="col ">{t("category.Id")}</th>
              <th className="col">{t("category.type")}</th>
              <th className="col">{t("category.status")}</th>
              <th className="col">{t("category.image")}</th>
              <th className="col">{t("category.action")}</th>
            </tr>
          </thead>
</table>
          {/* <tbody> */}
           
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                
  
                  <tr key={index} className="row custom-tr ">
                     <td label={t("category.Id")} className="col">{i18n ==="ar" ?el?.title?.ar : el?.title?.en}</td>
                    <td label={t("category.type")} className="col">{el.type}</td>
                    <td label={t("category.status")} className="col">{el.isEnabled? "Enabled" : "Not Enabled" }</td>
                    <td label={t("category.image")} className="col"><img src={el.photo} alt="category image" width="120px" height="80px"></img></td>
                    <td
                      label={t("category.action")}
                      className="col"

      
        >
          <i className="fas fa-pen bagroudicon text-warning" onClick={()=>Updaterow(el)}></i> <i className="fas fa-trash-alt bagroudicon text-red" onClick={()=>{detailrow(el);setShowcat(true) }}></i></td>
       
    </tr>


 
 
                   
        
                );
              })}
            {" "}
          {/* </tbody>
        </table> */}
        </div>

        

{/* modal delete cat */}
<Modal show={showcat} onHide={handleClosecat}>
<Modal.Header closeButton>
        <Modal.Title>{t("model.titel")} {" "} {i18n == "ar" ? catrowsuprission?.title?.ar : catrowsuprission?.title?.en }</Modal.Title>
      </Modal.Header>

      <div className="modal-body">
        {t("model.body")}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> handleClosecat()}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>deletecatrowsuprission()}>{t("modal.delete")}</button>
      </div>
    </Modal>
 

        </div>
    )
}
