import React,{useContext,useState} from 'react'
import SortableList, { SortableItem } from "react-easy-sort";
import {arrayMoveImmutable} from "array-move";
import AuthContext from '../../contexts/AuthContext'
import {sortmaincategory} from '../../services/maincategory'
import { toast } from 'react-toastify'
export default function Sortmaincategory(props) {
    const { lang } = useContext(AuthContext)
    console.log(props)
    let sortedlist =  props.location?.state?.response? props.location?.state?.response :[]
    if(sortedlist)
    sortedlist = sortedlist.sort((a,b) => a.order - b.order)
    console.log(sortedlist)
    const [items, setItems] = useState(sortedlist);
      const onSortEnd = (oldIndex, newIndex) => {
   setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex));
      };
      const savesort = () => {
        console.log(items)
        const tabsid = items.map(el => el._id)
       const obj = {
            "mainCategories":tabsid 
      }
      sortmaincategory(obj)
      .then(res =>    toast.success(res.data.message))
      .catch(err =>toast.error(err.response.data.message))
    
}

    return (
        <div className="container mt-5">
            <button onClick={savesort} className="btn btn-primary mb-4"> save sort </button>
             <SortableList
      onSortEnd={onSortEnd}
      className="list col-md-6"
      draggedItemClassName="dragged"
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="itemsorted">{item?.title[lang]}</div>
        </SortableItem>
      ))}
    </SortableList>
        </div>
    )
}
