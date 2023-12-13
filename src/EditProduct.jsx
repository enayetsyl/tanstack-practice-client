import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const {id} = useParams()
  const [updateProduct, setUpdateProduct] = useState()

  const {data:product, isLoading, isError} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/allproducts/${id}`)
      return res.data
    }
  })

  const updateData = async () => {
    try{
      const result = await axios.patch(`http://localhost:5000/api/v1/allproducts/${product._id}`,updateProduct )
      console.log(result)
      return result
    }catch (error){
      console.log(error)
      throw error
    }
  }
  

// Now useMutation is called unconditionally
const { data, isPending, mutateAsync } = useMutation({
  mutationFn: updateData,
});

if(isLoading){
  return <p>Loading........</p>
}

 

console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const price = parseInt(form.price.value);
    const productData = { title, details, price };
     setUpdateProduct(productData)
    try{
      await mutateAsync()
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" id="" placeholder="Title" className="p-2 w-full border border-solid border-red-400 my-3"
        defaultValue={product.title}
        />
        <input type="text" name="details" id="" placeholder="Details" className="p-2 w-full border border-solid border-red-400 my-3"
        defaultValue={product.details}
        />
        <input type="number" name="price" id="" placeholder="Price" className="p-2 w-full border border-solid border-red-400 my-3"
        defaultValue={product.price}
        />
        <input type="submit" value="Update" className='border border-solid border-red-400 py-2 px-4 rounded-lg bg-green-600'
        
        />
      </form>
    </div>
  );
};

export default EditProduct;