import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t } from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import {addadminuser} from "../../services/userService"
import { toast } from 'react-toastify'
import {
  InputGroup,
} from 'react-bootstrap'
export default function UserFromadd({hideSideBar,refrechdata}) {
    const validationSchema = Yup.object().shape({
        namear: Yup.string().required(t("form.champsrequird")
        ),
    
        nameen: Yup.string().required(
          t("form.champsrequird")
        ),
      
      });
      const {
        register,
        handleSubmit,
        reset,
        control,
    
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: "",
      });
      const onSubmit = async (data) => {

          const userdata = {
           
            name:data.namear ,
            mobile:"+974"+data.nameen
            
          }
          //var formData = new FormData("image");
          addadminuser(userdata)
          .then(res => {toast.success(res.data.message);
            hideSideBar(false)
             refrechdata()})

      }
    return (
        <div className="containerform">
        <form onSubmit={handleSubmit(onSubmit)}>
           <h6>{t("user.form-titel")}</h6> 
           <div className="form-group">
    <label className="client-label">
    {t("user.form-name")}
    </label>

    <input
   
      name="namear"
      type="text"
      placeholder= {t("user.form-name")}
      {...register("namear")}
      className={`form-control custom-input-org ${
        errors.name ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.namear && <i class="fal fa-info-circle mr-1"></i>}
      {errors.namear?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("user.form-mobile")}
    </label>
    <InputGroup controlId="formName" style={{ direction: 'ltr' }}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">+974</InputGroup.Text>
                  </InputGroup.Prepend>
    <input
   
      name="nameen"
      type="number"
      placeholder= {t("user.form-mobile")}
      {...register("nameen")}
      className={`form-control custom-input-org ${
        errors.nameen ? "is-invalid" : ""
      }`}
    />
    </InputGroup>
    <div className="invalid-feedback">
    {errors.nameen && <i class="fal fa-info-circle mr-1"></i>}
      {errors.nameen?.message}
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
