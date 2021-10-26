import React , {useEffect,useState} from 'react'
import ReactPaginate from "react-paginate";
import { t ,getLang} from '../../utils/helper'
import FormUpdate from './update'
import {getmaincat} from '../../services/maincategory'
import { toast } from 'react-toastify'
import { useHistory } from "react-router";

export default function Maincat() {
  const history = useHistory();
    const   i18n  = getLang();
    const [dateshow, setdateshow] = useState([])
    const [updatedata,setupdatedata] = useState('')
    const [rowsPerPage , setrowsPerPage] = useState([])
    const [drower , setdrower ] = useState(false)
    const [pagelimit,setpagelimit] = useState(5)
    const [offset , setoffset] = useState(0)
    const [selected , setselected] = useState(0)
    const [filterval , setfilterval] = useState([])
    useEffect(() => {
        getlaincategorydata()
      }, [])
     const getlaincategorydata =() =>{
      getmaincat()
        .then(res => {

          if(res.data.success){
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
      const sortdatacategory = () => {
        history.push({
          pathname:  "/admin/sortcategory",
          state: {
            response: rowsPerPage 
          } 
       });
        
      }
    return (
        <div className="container">
               <h3>{t("maincategory.titel")}</h3>
      <hr/>
      <button className='btn btn-primary' onClick={sortdatacategory}>{t("maincategory.sortdata")} </button>
              <div onClick={() => setdrower(false)} className={drower ?"overlay is-open":"overlay"}></div>
              <div className={((drower &&i18n==="ar")  ? "arnav-menu  active" : (drower && i18n==="en" ))  ?"nav-menu  active": "nav-menu"}>
      {drower &&  <FormUpdate  hideSideBar={setdrower} rowdata ={updatedata} refrechdata= {getlaincategorydata}  /> }
     </div>
                   <div dir="ltr" className= {!Boolean(dateshow.length) ? "d-none float-right  mt-2" :"float-right  mt-2"}>
             <ReactPaginate
          previousLabel={<i class="fal fa-chevron-left"></i>}
          nextLabel={<i class="fal fa-angle-right"></i>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(rowsPerPage.length / pagelimit)}
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
              <th className="col ">{t("maincategory.id")}</th>
              <th className="col">{t("maincategory.namear")}</th>
              <th className="col">{t("maincategory.nameen")}</th>
              <th className="col">{t("maincategory.order")}</th>
              <th className="col">{t("maincategory.action")}</th>
              
            </tr>
          </thead>

          <tbody>
            {" "}
           
            {
              dateshow.map((el, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("maincategory.id")} className="col">{el._id.slice(el._id.length - 3,el._id.length)}</td>
                    <td label={t("maincategory.namear")} className="col">{el?.title?.ar}</td>
                    <td label={t("maincategory.nameen")} className="col">{el?.title?.en }</td>
                    <td label={t("maincategory.order")} className="col">{el?.order }</td>
                    
                   
                    <td
                      label={t("maincategory.action")}
                      className="col"

      
        >
          <i class="fas fa-pen cursor-pointer" onClick={()=>{setupdatedata(el);setdrower(true)}}></i> 
  </td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
        </div> 
        </div>
    )
}
