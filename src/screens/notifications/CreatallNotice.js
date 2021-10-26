import React,{useState , useEffect} from 'react'
import { t ,getLang} from '../../utils/helper'
import { toast } from 'react-toastify'
import {notifyalluser} from '../../services/notofication'
import {adminCategory} from '../../services/categoriesService'
import {getadminads} from '../../services/adsService'
function CreatAllNotice() {

        const [loading, setloading] = useState("");  
        const [category, setcategory] = useState([]);  
        const [listeads, setlistads] = useState([]);  
        const [filtredads, setfiltredads] = useState([]); 
    const [data, setsetdatastate] = useState({})

    const handleChange = (event) => {
     const name = event.target.name;
     const value= event.target.value;
     setsetdatastate({...data,[name]:value}) 
     if(name ==='cccategory' )
     {
       const filtredcat = listeads.filter(el =>el.category._id ===value)
       setfiltredads(filtredcat)
      }
    }
    useEffect(() => {
        adminCategory()
        .then(res=> {
            if(res.data.success)
            setcategory(res.data.data)
        })
        getadminads()
        .then(res=> {
          if(res.data.success)
          setlistads(res.data.data.ads)
      })

    }, [])
    const onSubmit = (e) => {
      e.preventDefault()
      if(data.textar && data.texten && data.cccategory && data.ads ){
        setloading(true);
        let obj =
          {
            "englishBody": data.texten ,
            "arabicBody": data.textar ,
            "category": data.cccategory,
            "ad": data.ads,
            "url": "ad"
        }
        
        notifyalluser(obj)
          .then((res) => {
            setloading(false);
            if (res.data.error) {
              toast.error(res.data.error);
              return 0;
            }
            toast.success("Notice created");
          
          })
          .catch((err) => {
            console.log(err);
            setloading(false);
            toast.error("Failed to create");
          });
      }
else {
  toast.error(t("toast.error_requidform"));
}
    }
    return (
        <div className="container mb-5">
             <h3>Create A Notice</h3>
               <form onSubmit={onSubmit}>
               <div className="row" >
                   
                    <div className="col-md-5 mb-5">
                        <label className="form-label">{t("notice.addall_form.entext")} </label>{" "} <span className="text-red">*</span>
                        <input 
                        type="text"
                        onChange={handleChange}
                        className="form-control py-4" 
                        name="texten"/>
                        
                    </div>
                    <div className="col-md-5 mb-5">
                        <label className="form-label">{t("notice.addall_form.artext")} </label>{" "} <span className="text-red">* </span>
                        <input 
                         type="text" 
                         onChange={handleChange}
                       
                         className="form-control py-4" 
                         name="textar"/>
                          {/* {errors.date && <div className="text-danger">This field is required</div>} */}
                    </div>
                    <div className="col-md-5 mb-5">
                        <label className="form-label">{t("notice.addall_form.category")}  </label> {" "} <span className="text-red"> * </span>
                        <select 
                        className={`form-control`}
                          onChange={handleChange}
                          name="cccategory"
                        >
                           <option value="">    {t("category.catlist")}</option>
                            {category.map((el,index) => {
                                return (
                                    <option value={el._id} key={index}>{getLang()==="ar" ? el?.title?.ar : el?.title?.en}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-5 mb-5">

                        <label  
                           className="form-label">
                          {t("notice.addall_form.ads")}
                        </label> {" "} <span className="text-red"> * </span>
                        <select 
                             className="form-control" 
                             name="ads"
                        onChange={handleChange}
                           
                         
                           >
                              <option value="">    {t("notice.addall_form.ads")}</option>
                              {
                                filtredads.map((el,index) => {
                                  return (
                                      <option value={el._id} key={index}>{ el?.title}</option>
                                  )
                              })
                              }

                                </select>
                    </div> 
                    </div>
                    <div className="row">
                        
                        <input
      value= {t("from.btnadd")}
      type="submit"
      disabled={loading} 
      className="btn btn-primary custom-btn-save col-md-2 ml-1 mr-1"
    />

                        
                        
                            <input 
                            disabled={loading} 
                            type='reset'
                            className="btn btn-danger col-md-2 ml-1 mr-1"
                            value="Cancel"
                            />
                       
                    </div>    
             </form>  
        </div>
    )
}

export default CreatAllNotice
