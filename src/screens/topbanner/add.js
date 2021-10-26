import React,{useState,useEffect} from 'react'
import { t ,getLang} from '../../utils/helper'
import { toast } from 'react-toastify'
import {posttopbanner} from '../../services/topbannerService'
import {adminCategory} from '../../services/categoriesService'
 const Fromadd = ({hideSideBar,refrechdata}) => {
  const [file, setfile] = useState("") 
  const [filetosend, setfiletosend] = useState("")
  const [category, setcategory] = useState([])
  const [types, settypes] = useState([])
  const [data, setdata] = useState(null) 

   
      const handleFileChange = ({target: {files}}) =>  {
        setfiletosend(files)
        setfile(URL.createObjectURL(files[0]))
      }
      useEffect(() => {
        adminCategory()
        .then(res => setcategory(res.data.data))
      }, [])
      const onSubmit = async (event) => {
        event.preventDefault()
         
          let formData = new FormData();
          formData.append('image', filetosend[0]);
          formData.append('ad', data.note);
          formData.append('note', data.note);
          formData.append('type', data.types);
          formData.append('title[ar]', data.titelar);
          formData.append('title[en]', data.titelen);
          formData.append('category', data.category);


          posttopbanner(formData)
          .then(res => {
            refrechdata()
            hideSideBar()
            toast.success(res.data.message)
          })

      }
      const deletefile = () => {
        setfile('') ;
        setfiletosend('')
      }
     const handelchange = (event) => {
 const name= event.target.name;
 const value= event.target.value;
 setdata({...data,[name]:value})
 
     }
    return (
        <div className="containerform">
             <form onSubmit={onSubmit}>
           <h6>{t("category.formadd")}</h6> 
           {file.length > 0 ?
          <div  style={{margin: "10px 140px"}}>
            
              <img
                alt="Preview"
               src={file}
               width="132px"
               height="132px"
              
               className=" rounded-circle"
                
              />
            <i className="far fa-minus-hexagon" style={{color:'red',cursor:'pointer'}} onClick={deletefile} />
          </div>:

                    <label className="labelfile myLabel" for="namefile"><i className="fas fa-plus"></i>
                    <input name="namefile" id="namefile"  type="file" hidden onChange={handleFileChange} />
                   </label>
                     }
                       <div className="form-group">
    <label className="client-label">
    {t("topbanner.form_titelar")}
    </label>

    <input
   
      name="titelar"
      type="text"
      placeholder= {t("topbanner.form_titelar")}
      onChange={handelchange}
      className={`form-control 
      }`}
    />
  
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("topbanner.form_titelan")}
    </label>

    <input
   
      name="titelen"
      type="text"
      placeholder= {t("topbanner.form_titelan")}
      onChange={handelchange}
      className={`form-control 
      }`}
    />
  
  </div>
           <div className="form-group">
    <label className="client-label">
    {t("topbanner.form_category")}
    </label>

    <select
   
      name="category"
      onChange={handelchange}
      className={`form-control
      }`}
    >
     {
      types.map((el,index) =>{
        return(
<option key={index} value={el._id}>{getLang() ==="ar" ? el.title.ar : el.title.an}</option>
        )
      }
      )
    }
    
      
   </select>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("topbanner.form_type")}
    </label>

    <select
   
      name="types"
      onChange={handelchange}
      className={`form-control
      }`}
    >
          <option value="category">category</option>
<option  value="url">url</option> 

      
   </select>
  </div>

  <div className="form-group">
    <label className="client-label">
    {t("topbanner.form_note")}
    </label>

    <input
   
      name="note"
      type="text"
      placeholder= {t("topbanner.form_note")}
      onChange={handelchange}
      className={`form-control 
      }`}
    />
 
  </div>
  <div className="group-button d-flex justify-content-around">
    <button
      type="reset"
      className="btn btn-light custom-btn-cancel"
      onClick={() => hideSideBar(false)}
    > {t("form.btncancel")}
     
    </button>
    <input
      value= {t("from.btnadd")}
      type="submit"
      className="btn btn-primary custom-btn-save"
    />
  </div>
        </form>
        </div>
    )
}
export default Fromadd