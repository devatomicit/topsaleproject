import React , {useEffect} from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t } from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import {adminupdate_subCategory} from '../../services/categoriesService'
export default function Formupdate({hideSideBar,rowdata,refrechdata}) {
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
        reset,
    
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: "",
      });
      useEffect(() => {
        console.log(rowdata)
      reset({
        name:rowdata.title?.ar,
        code:rowdata.title?.en
        
      })
      }, [])
      const onSubmit = async (data) => {
        const obj = {
          "category":rowdata.category,
          "title": {
            "ar":data.name,
            "en":data.code
          }
        }
        adminupdate_subCategory(rowdata._id,obj)
        .then(res => {refrechdata()
          hideSideBar()
          toast.success(res.data.message)

        })
      }
    return (
        <div className="containerform">
             <form onSubmit={handleSubmit(onSubmit)}>
           <h6>{t("category.formupdate")}</h6> 
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
      value= {t("form.btnupdat")}
      type="submit"
      className="btn btn-primary custom-btn-save"
    />
  </div>
        </form>
        </div>
    )
}
