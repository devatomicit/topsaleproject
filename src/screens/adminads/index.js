import React,{useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import { t ,getLang} from '../../utils/helper'
import {Modal} from 'react-bootstrap'
import {getadminads,fixads,getumprovedads,adsaproved,rejectedads,adsdelete} from '../../services/adsService'
import { toast } from 'react-toastify'
let page=1
export default function Adminads() {
 
  const [pageloded, setpageloded] = useState(1)
const   i18n  = getLang();
const [toggle, setToggle] = useState(false);
  const [updatedata , setupdatedata] = useState('')
  const [showrejection, setShowreject] = useState(false);
  const [aproved,setShowaproved] = useState(false)
  const [show, setShow] = useState(false);
  const [drowerupdate , setdrowerupdate ] = useState(false)
  const [droweradd, setadddrower] = useState(false)
  const [dateshow, setdateshow] = useState([])
  const [rowsPerPage , setrowsPerPage] = useState([])
  const [filterval , setfilterval] = useState([])
  const [offset , setoffset] = useState(0)
  const [selected , setselected] = useState(0)
  const [pagelimit,setpagelimit] = useState(20)
  const [rowsuprission,setrowsuprission]=useState(null)
  const [rejectads,setrejectads] = useState({
    "reason_ar": "",
    "reason_en": "",
  })
  useEffect(() => {
    getregiondata()
  }, [])
  const getregiondata = () =>{
   
    getadminads(page)
    .then(res => {
        if(res.data.success){

      setrowsPerPage(res.data.data.ads) 

    const row = res.data.data.ads
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
      // const Updaterow = (el) => {
   
      //   setupdatedata(el)
      //   setdrowerupdate(true)
      // }
      const detailrow = (el) => {
        setrowsuprission(el)

      }
 
      // const hidedrower = () => {
      //   if (drowerupdate)
      //   setdrowerupdate(false)
      //   if(droweradd)
      //   setadddrower(false)
      // }
     
      const  strOp = (str) => {
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
      
      const   recherchefilter = (val, data) => {
        const res  = data.filter(el =>  val ? (strOp(el.title).includes(strOp(val)) ||
        strOp(el.status).includes(strOp(val)) ||
        strOp(el.user?.name ).includes(strOp(val)) ||
         strOp(el?.user?.mobile).includes(strOp(val)) )  : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
     const deleteads = () => {
        adsdelete(rowsuprission._id)
      .then(res => {getregiondata()
        handleClose()
        toast.success(res.data.message)
      })
      .catch(err => {toast.error(err.response.data.message)
     })
    }
     const sendrejectads= () => {
         const obj = {
             id:rowsuprission._id,
             "reason_ar": rejectads.reason_ar,
             "reason_en": rejectads.reason_en,
         }

         
        rejectedads(obj)
      .then(res => {getregiondata()
        setShowreject(false)
        toast.success(res.data.message)
      })
      .catch(err => {toast.error(err.response.data.message)
     })
     }
     const handleClose = () => setShow(false);
     const sendaprovedads = () => {
      adsaproved(rowsuprission?._id)
      .then(res => {getregiondata()
        setShowreject(false)
        toast.success(res.data.message)
      })
      .catch(err => {toast.error(err.response.data.message)
     })
     }
     const getnextdata = () => {
    
      setpageloded(pageloded+1)
      page=page+1
      getregiondata()
    }
    const getpreviusedate = () => {
      page=page-1
      setpageloded(pageloded-1)
      getregiondata()
    }


    const triggerToggle = () => {
        setToggle( !toggle )
        if(!toggle){
        getumprovedads()
        .then(res => {
          if(res.data.success){
  
        setrowsPerPage(res.data.data.ads) 
  
      const row = res.data.data.ads
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
  
      })
    }
    else {
      getregiondata()
    }
  }
    return (
      <div className="container">
                  <h3>{t("listads.titel")}</h3>
      <hr/>
          <div className="d-flex justify-content-between">
            <div>
              <span className='pl-2 pr-2'>{toggle?   t("listads.unapovedads"): t("listads.apovedads") }</span>
          <label class="switch" onChange={triggerToggle}>
  <input type="checkbox" checked={toggle?true : false} />
  <span class="slider round"></span>
</label>
</div>
                    <div className="bordergray d-flex  mr-4">
            <div className="input-group-prepend">
            <span className="bagroundtransparant p-1">
               <i className="fal fa-search"></i>
               </span>
               </div>
                <input type="text" onChange={(event) =>recherchefilter(event.target.value,rowsPerPage)}    className="border-0 width" placeholder={t("Admin.btnSearch")}></input>
                </div>

   
           </div>
           <div className="mt-2 mb-2" style={{display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"}}> 
      <button onClick={getpreviusedate} className="btn btn-primary" disabled={pageloded===1}>Previw <i class="fas fa-fast-backward"></i></button>
      <span className="pl-2 pr-2">page {" "} {pageloded} </span>
      <button onClick={getnextdata} className="btn btn-primary" disabled={rowsPerPage.length===0}>Next <i class="fas fa-fast-forward"></i></button>
             </div>
                {/* <div onClick={() => hidedrower()} className={(droweradd || drowerupdate) ?"overlay is-open":"overlay"}></div> */}
  
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
           <div className="table-responsive">
             <table className="table table-borderless mt-4">
          <thead>
            <tr className=" th-table">
              <th className="col ">{t("listads.tab_titel")}</th>
              <th className="col">{t("listads.tab_user")}</th>
              <th className="col">{t("listads.tab_active")}</th>
              <th className="col">{t("listads.tab_aproved")}</th>
              <th className="col">{t("listads.tab_action")}</th>
              
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("listads.tab_titel")} className="col">{el.title}</td>
                    <td label={t("listads.tab_user")} className="col">{el?.user?.name +'('+el?.user?.mobile+')'}</td>
                    <td label={t("listads.tab_active")} className="col">{el?.status}</td>
                    <td label={t("listads.tab_aproved")} className="col">{el?.isApproved?"Approved" : "Not Aproved"}</td>
                    
                    
                   
                    <td
                      label={t("listads.tab_action")}
                      className="col"

      
        >
          {/* <i className="fas fa-pen cursor-pointer" onClick={()=>Updaterow(el)} data-title="hovering message" data-bs-toggle="tooltip" data-bs-placement="top" title="update ads"></i> */}
           <i  onClick={()=>{detailrow(el) ; setShow(true)}} className="fas fa-trash-alt tabfonticon pr-2 pl-2 cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="deleted ads"></i>
           <i className="fal fa-vote-nay cursor-pointer pr-2 pl-2 " data-bs-toggle="tooltip" data-bs-placement="top" title="rejected  ads"  onClick={()=>{detailrow(el) ;setShowreject(true)}}></i>
           <i className="fas fa-check cursor-pointer pr-2 pl-2 " data-bs-toggle="tooltip" data-bs-placement="top" title="aproved ads"  onClick={()=>{detailrow(el) ;setShowaproved(true)}}></i>
           </td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div> 


  <Modal show={show} onHide={handleClose}>
  
    <Modal.Header closeButton>
          <Modal.Title>{t("model.titel")} {" "} {rowsuprission?.title}</Modal.Title>
        </Modal.Header>
      <div className="modal-body">
        {t("model.body")} 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> handleClose()}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>deleteads()}>{t("modal.delete")}</button>
      </div>
 
  </Modal>

  <Modal show={showrejection} onHide={()=> setShowreject(false)}>
  
    <Modal.Header closeButton>
          <Modal.Title>{t("modal.reject")} {" "} {rowsuprission?.title}</Modal.Title>
        </Modal.Header>
      <div className="modal-body">
        <label>  {t("listads.modal_raison.ar")} </label>
        <input type="text" name='reason_ar' onChange={(event)=>setrejectads({...rejectads,['reason_ar']:event.target.value})}></input>
       <br/>
        <label> {t("listads.modal_raison.en")} </label>
        <input type="text" name="reason_en" onChange={(event)=>setrejectads({...rejectads,['reason_en']:event.target.value})}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary p-2" onClick={()=> setShowreject(false)}>{t("modal.cancel")}</button>
        <button type="button" className="btn btn-primary p-2" onClick={() =>sendrejectads()}>{t("modal.reject")}</button>
      </div>
 
  </Modal>
  <Modal show={aproved} onHide={()=> setShowaproved(false)}>
  
  <Modal.Header closeButton>
        <Modal.Title>{t("modal.aproved")} {" "} {rowsuprission?.title}</Modal.Title>
      </Modal.Header>
    <div className="modal-body">
      {t("model.body-aprove")} 
     
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary p-2" onClick={()=> setShowreject(false)}>{t("modal.cancel")}</button>
      <button type="button" className="btn btn-primary p-2" onClick={() =>sendaprovedads()}>{t("modal.aproved")}</button>
    </div>

</Modal>
        </div>
    )
      
}
