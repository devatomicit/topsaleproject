import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {getadminrepport} from '../services/repport'
import ReactPaginate from "react-paginate";
import { t ,getLang} from '../utils/helper'
export default function Adminrepport() {
  let page=1
    const [selected, setselected] = useState(false)
    const [pageloded, setpageloded] = useState(1)
    const [dateshow, setdateshow] = useState([])
    const [rowsPerPage , setrowsPerPage] = useState([])
    const [pagelimit,setpagelimit] = useState(20)
    const [filterval , setfilterval] = useState([])
    const [offset , setoffset] = useState(0)
    useEffect(() => {
        getrapportdata()
      }, []);
      const getrapportdata = () =>{
        getadminrepport(page)
        .then(res => {
           
            if(res.data.success){
          setrowsPerPage(res.data.data.reports) 
          console.log(res.data)
        const row = res.data.data.reports
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
      const  strOp = (str) => {
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
       
      const   recherchefilter = (val, data) => {
        const res  = data.filter(el =>  val ? (strOp(el.user?.mobile).includes(strOp(val)) ||
        strOp(el.text).includes(strOp(val)))  : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
         const getnextdata = () => {
          setpageloded(pageloded+1)
          page=page+1
          getrapportdata()
        }
        const getpreviusedate = () => {
          page=page-1
          setpageloded(pageloded-1)

          getrapportdata()
        }
    return (
        <div>
                         <h3>{t("repport.titel")}</h3>
      <hr/>

                 <div className="bordergray col-md-4  d-flex  mt-5">
    
            <div className="input-group-prepend ">
            <span className="bagroundtransparant p-1">
               <i className="fal fa-search"></i>
               </span>
               </div>
                <input type="text" onChange={(event) =>recherchefilter(event.target.value,rowsPerPage)}    className="border-0 width" placeholder={t("Admin.btnSearch")}></input>
                </div>
                <div className="mt-2 mb-2" style={{display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"}}> 
      <button onClick={getpreviusedate} className="btn btn-primary" disabled={pageloded===1}>Previw <i class="fas fa-fast-backward"></i></button>
      <span className="pl-2 pr-2">page {" "} {pageloded} </span>
      <button onClick={getnextdata} className="btn btn-primary" disabled={rowsPerPage.length===0}>Next <i class="fas fa-fast-forward"></i></button>
             </div>
             <div dir="ltr " className= {!Boolean(dateshow.length) ? "d-none float-right mt-2" :"float-right mt-2"}>
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
              <th className="col ">{t("rapport.id")}</th>
              <th className="col">{t("rapport.date")}</th>
              <th className="col">{t("rapport.text")}</th>
              <th className="col">{t("rapport.numuser")}</th>
              
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("rapport.id")} className="col">{el._id.slice(el._id.length - 3,el._id.length)}</td>
                    <td label={t("rapport.date")} className="col">{new Intl.DateTimeFormat("en-GB").format(new Date(el.createdAt))}</td>
                    <td label={t("rapport.text")} className="col">{el?.text }</td>
                    <td label={t("rapport.numuser")} className="col">{el?.user?.mobile }</td>
                    
                    
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div> 


 
        </div>
    )
}
