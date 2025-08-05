import { AddNewProp } from "@/features/page"

const EditNewPropertyPage = ({ params: { id } }: { params: { id: string } }) => {
    return (
      <div>
       <AddNewProp rowId={id}/>
      </div>
    )
  }
  
  export default EditNewPropertyPage