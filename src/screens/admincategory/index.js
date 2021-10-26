import React , {useEffect,useState} from 'react'
import { t ,getLang} from '../../utils/helper'
import ReactPaginate from "react-paginate";
import Formadd from './fromadd'
import {Accordion,Card,Button,Modal} from 'react-bootstrap'
import FormUpdate from './formupdate'
import Formsubcategory from './formsubcategory'
import Formupdatesubcategory from './formupdatesubcat'
import {adminCategory,admin_delete_Category,admindelete_subCategory} from '../../services/categoriesService'
import { toast } from 'react-toastify'
export default function Category() {

  const   i18n  = getLang();
  const [showcat, setShowcat] = useState(false);
  const [addsubdrower, setaddsubdrower] = useState(false);
  const [showsubcat, setShowsubcat] = useState(false);
  const   [Showupdatesubcat,setShowupdatesubcat]=useState(false);
  const [updatedata , setupdatedata] = useState('')
  const [updatesubrow,setupdatesubrow] = useState('')
  const [drowerupdate , setdrowerupdate ] = useState(false)
  const [droweradd, setadddrower] = useState(false)
  const [dateshow, setdateshow] = useState([])
  const [rowsPerPage , setrowsPerPage] = useState([])
  const [filterval , setfilterval] = useState([])
  const [offset , setoffset] = useState(0)
  const [selected , setselected] = useState(0)
  const [pagelimit,setpagelimit] = useState(5)
  const [rowsuprission,setrowsuprission]=useState(null)
  const [catrowsuprission,setcatrowsuprission] = useState("")
  useEffect(() => {
    getcatdata()
  }, [])
  const getcatdata = () =>{
    adminCategory()
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
        if(addsubdrower)
        setaddsubdrower(false)
        if(Showupdatesubcat)
        setShowupdatesubcat(false)
      }

      const Updaterow = (el) => {
        setupdatedata(el)
        setdrowerupdate(true)
      }
      const detailrow = (el) => {
        setcatrowsuprission(el)
      }
      
      const  strOp = (str) => {
        return str
          .toString()
          .replace(/\s/g, '')
          .toLowerCase();
      }
      const   recherchefilter = (val, data) => {
        const res  = data.filter(el =>  val ? (strOp(el.type).includes(strOp(val)) ||
        el?.title?.ar !== undefined && strOp(el?.title?.ar).includes(strOp(val)) ||
        el?.title?.en !== undefined &&  strOp(el?.title?.en).includes(strOp(val))) : true)
        const dat =  res.slice(0, pagelimit) 
        setselected(0)
        setdateshow(dat) 
        setfilterval(res)
         }
         const  deletesubategory = () => {

          admindelete_subCategory(rowsuprission._id)
          .then(res => {getcatdata()
            handleClosesubcat()
            toast.success(res.data.message)})
           .catch(err => {toast.error(err.response.data.message)})
         }
         const    deletecatrowsuprission = () => {
 
          admin_delete_Category(catrowsuprission._id)
             .then(res => {getcatdata()
              handleClosecat()
              toast.success(res.data.message)})
             .catch(err => {toast.error(err.response.data.message)})


              }

              const handleClosesubcat = () =>{
                setShowsubcat(false)
              }
              const handleClosecat = () =>{
                setShowcat(false)
              }
              const updatesubrows = (el) =>{
                setupdatesubrow(el)
                setShowupdatesubcat(true)
              }
    return (
      <div className="container">
                      <h3>{t("category.titel")}</h3>
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
            <button onClick={()=>setadddrower(true)} className="addnew btn btn-primary mr-2 ml-2"><i class="fal fa-plus pl-2 pr-2"></i>{" "} {t("Admin.btnadd")}</button>

            <button onClick={()=>setaddsubdrower(true)} className="addnew btn btn-primary ml-2 mr-2"><i class="fal fa-plus pl-2 pr-2"></i>{" "} {t("category.addsubcategory")}</button>

            </div>
          
           </div>
                <div onClick={() => hidedrower()} className={(droweradd || drowerupdate || addsubdrower||Showupdatesubcat ) ?"overlay is-open":"overlay"}></div>
            <div className={((droweradd &&i18n==="ar") || (drowerupdate && i18n==="ar") || (addsubdrower && i18n==="ar" ) ||(Showupdatesubcat && i18n==="ar"))    ? "arnav-menu  active" :((droweradd &&i18n==="en") || (drowerupdate && i18n==="en") || (addsubdrower && i18n==="en" ) || (Showupdatesubcat && i18n=="en"))   ?"nav-menu  active": "nav-menu"}>
       
       {droweradd && <Formadd  hideSideBar={setadddrower} refrechdata= {getcatdata} /> }
       {drowerupdate &&  <FormUpdate  hideSideBar={setdrowerupdate} rowdata ={updatedata} refrechdata= {getcatdata}  /> }
       {addsubdrower &&  <Formsubcategory  hideSideBar={setaddsubdrower}  refrechdata= {getcatdata} catdata={rowsPerPage} /> }
       {Showupdatesubcat  && <Formupdatesubcategory  hideSideBar={setaddsubdrower}  refrechdata= {getcatdata} rowdata={updatesubrow} />}
      </div> 
             <div dir="ltr" className= {!Boolean(dateshow.length) ? "d-none float-right mt-4 " :"float-right mt-4 "}>
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
              <th className="col">{t("category.subcategory")}</th>
              <th className="col">{t("category.createdate")}</th>
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
                  <Accordion defaultActiveKey="0" key={index}>
                  <Card>
                    <Accordion.Toggle
                      className="text-left"
                      as={Button}
                      variant="link"
                      eventKey={el._id}
                      style={{
                      
                        color: "black",
                      }}
                      sortType="asc"
                    
                    >
  
                  <div key={index} className="row custom-tr ">
                     <p label={t("category.Id")} className="col">{i18n ==="ar" ?el?.title?.ar : el?.title?.en}</p>
                    <p label={t("category.type")} className="col">{el.type}</p>
                    <p label={t("category.status")} className="col">{el.isEnabled? "Enabled" : "Not Enabled" }</p>
                    <p label={t("category.subcategory")} className="col">{el.subcategories.length  }</p>
                    <p label={t("category.createdate")} className="col">{el.types.length }</p>
                    <p label={t("category.image")} className="col"><img src={el.image} alt="category image" width="120px" height="80px"></img></p>
                   
                    <p
                      label={t("category.action")}
                      className="col"

      
        >
          <i className="fas fa-pen bagroudicon text-warning" onClick={()=>Updaterow(el)}></i> <i className="fas fa-trash-alt bagroudicon text-red" onClick={()=>{detailrow(el);setShowcat(true) }}></i></p>
       
    </div>
    </Accordion.Toggle>

 
 <Accordion.Collapse eventKey={el._id}>
                  <table className="table table-borderless ">
                  <tbody>
                  <tr className="customsoutab">
                 
                 <td className="col-8" >{t("subcategory.titel")}</td>
                 <td className="col-4">{t("subcategory.isenabel")}</td>
              
               </tr>
                        {
                         el?.subcategories.map((el, index) => {
                          return (
                            <tr
                              key={index}
                           
                               
                             
                            >
                              <td
                                className="text-left"
                                style={{ paddingLeft: " 40px" }}
                                className="col-8"
                              >
                                  <i className="fas fa-pen bagroudicon text-warning" onClick={()=>updatesubrows(el)}></i> <i className="fal fa-window-close text-red cursseur" onClick={() => {setrowsuprission(el);setShowsubcat(true)}}></i>{" "}
                                {i18n ==="ar" ? el?.title.ar : el?.title?.en}
                              </td>

                              <td  className="col-4">
                                <span>{el?.isEnabled ? "Enabled" :"Not Enabled "}</span>
                              </td>
                            </tr>
                          );
                        })
                         

                      }
                        </tbody> 
                        </table>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
                );
              })}
            {" "}
          {/* </tbody>
        </table> */}
        </div>

        
            {/* model delete subcat */}
            <Modal show={showsubcat} onHide={handleClosesubcat}>

  <Modal.Header closeButton>
        <Modal.Title>{t("model.titel")} {" "} {i18n == "ar" ? rowsuprission?.title?.ar :rowsuprission?.title?.en }</Modal.Title>
      </Modal.Header>
    
      <div class="modal-body">
        {t("model.body")}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary p-2" onClick={()=> handleClosesubcat()}>{t("modal.cancel")}</button>
        <button type="button" class="btn btn-primary p-2" onClick={() =>deletesubategory()}>{t("modal.delete")}</button>
      </div>
    </Modal>

{/* modal delete cat */}
<Modal show={showcat} onHide={handleClosecat}>
<Modal.Header closeButton>
        <Modal.Title>{t("model.titel")} {" "} {i18n == "ar" ? catrowsuprission?.title?.ar : catrowsuprission?.title?.en }</Modal.Title>
      </Modal.Header>

      <div class="modal-body">
        {t("model.body")}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary p-2" onClick={()=> handleClosecat()}>{t("modal.cancel")}</button>
        <button type="button" class="btn btn-primary p-2" onClick={() =>deletecatrowsuprission()}>{t("modal.delete")}</button>
      </div>
    </Modal>
 

        </div>
    )
}
