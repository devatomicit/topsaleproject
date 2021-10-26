import React,{useState} from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t } from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import {admin_add_new_category} from '../../services/categoriesService'
 const Fromadd = ({hideSideBar,refrechdata}) => {
  const [file, setfile] = useState("") 
  const [filetosend, setfiletosend] = useState("")
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("form.champsrequird")
        ),
    
        code: Yup.string().required(
          t("form.champsrequird")
        ),
      
      });
      const {
        register,
        handleSubmit,
    
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: "",
      });
      const handleFileChange = ({target: {files}}) =>  {
        setfiletosend(files)
        setfile(URL.createObjectURL(files[0]))
      }
      const onSubmit = async (data) => {

          let formData = new FormData();
          formData.append('image', filetosend[0]);
          formData.append('title[ar]', data.name);
          formData.append('title[en]', data.code);
          formData.append('mainCategoryId', '6158385e7767ed14dc8c4fba');


          admin_add_new_category(formData)
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

    return (
        <div className="containerform">
             <form onSubmit={handleSubmit(onSubmit)}>
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
    {t("category.namear")}
    </label>

    <input
   
      name="name"
      type="text"
      placeholder= {t("category.namear")}
      {...register("name")}
      className={`form-control custom-input-org ${
        errors.name ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.name && <i className="fal fa-info-circle mr-1"></i>}
      {errors.name?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("category.nameen")}
    </label>

    <input
   
      name="code"
      type="text"
      placeholder= {t("category.nameen")}
      {...register("code")}
      className={`form-control custom-input-org ${
        errors.name ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.name && <i className="fal fa-info-circle mr-1"></i>}
      {errors.name?.message}
    </div>
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