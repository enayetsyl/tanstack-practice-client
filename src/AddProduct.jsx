import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState(null)
  console.log(product)
  
  const addData = async () => {
    try{
      const result = await axios.post(`http://localhost:5000/api/v1/addproduct`, product)
      console.log(result)
      return result
    }catch (error){
      console.log(error)
      throw error
    }
  }
  const {data, isError, isPending, mutateAsync} = useMutation({
    mutationFn: addData,
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const price = parseInt(form.price.value);
    const productData = { title, details, price };
     setProduct(productData)
    try{
      await mutateAsync()
    }catch(error){
      console.log(error)
    }
  }

  console.log('mutation log', data, isError, isPending)

  if(isPending){
    return <p>Loading.......</p>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" id="" placeholder="Title" className="p-2 w-full border border-solid border-red-400 my-3"/>
        <input type="text" name="details" id="" placeholder="Details" className="p-2 w-full border border-solid border-red-400 my-3"/>
        <input type="number" name="price" id="" placeholder="Price" className="p-2 w-full border border-solid border-red-400 my-3"/>
        <input type="submit" value="Submit" className="border border-solid border-red-400 py-2 px-4 rounded-lg bg-orange-400" />
      </form>
      {
        data.data._id ? <p className="text-green-700">Product added successfully in database</p> : 
        <p className="text-red-600">Error in data entry</p>
      }

      {
        isError && <p className="text-red-600">Error in product entry</p>
      }
    </div>
  );
};

export default AddProduct;