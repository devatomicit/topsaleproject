import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t ,getLang} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import {adminadd_subCategory} from '../../services/categoriesService'
export default function Fromadd({hideSideBar , refrechdata ,catdata}) {

    const validationSchema = Yup.object().shape({
      category :  Yup.string().required(t("form.champsrequird")),
      titlear: Yup.string().required(t("form.champsrequird")
        ),
    
        titlefr: Yup.string().required(
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
  

      const onSubmit = async (data) => {

          const obj = {
            id:data.category,
            "category":data.category,
            "title": {
              "ar":data.titlear,
              "en":data.titlefr
            }
          }
          adminadd_subCategory(obj)
          .then(res => {
            refrechdata()
            hideSideBar()
            toast.success(res.data.message)
          })
      }
   

    return (
        <div className="containerform">
             <form onSubmit={handleSubmit(onSubmit)}>
           <h6>{t("category.formsubcate_add")}</h6> 

           <div className="form-group">
           <label className="client-label">
    {t("category.catlist")}
    </label>
    
    <select {...register("category")}  className={`form-control custom-input-org ${
        errors.category ? "is-invalid" : ""
      }`}>
    <option value="">    {t("category.catlist")}</option>
    {catdata.map(el => {
      return(
      <option value={el._id}>{getLang() ==="ar" ? el.title?.ar :el.title?.en }</option>)
    })
     
  }
       
      </select>
      <div className="invalid-feedback">
    {errors.category && <i class="fal fa-info-circle mr-1"></i>}
      {errors.category?.message}
    </div>
    <label className="client-label">
    {t("category.namear")}
    </label>

    <input
   
      name="titlear"
      type="text"
      placeholder= {t("category.namear")}
      {...register("titlear")}
      className={`form-control custom-input-org ${
        errors.titlear ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.titlear && <i class="fal fa-info-circle mr-1"></i>}
      {errors.titlear?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("category.nameen")}
    </label>

    <input
   
      name="titlefr"
      type="text"
      placeholder= {t("category.nameen")}
      {...register("titlefr")}
      className={`form-control custom-input-org ${
        errors.titlefr ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.titlefr && <i class="fal fa-info-circle mr-1"></i>}
      {errors.titlefr?.message}
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
