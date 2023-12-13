import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const {id} = useParams()
  const {data:product, isLoading, isError} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/allproducts/${id}`)
      return res.data
    }
  })
if(isLoading){
  return <p>Loading........</p>
}
  console.log(product)
  return (
    <div className="flex flex-col justify-center items-center my-20 space-y-10">
    <h1 className="text-6xl">{product?.title}</h1>
    <p className="text-xl">{product?.details}</p>
    <div className="gap-8">
   <Link to={`/editProduct/${product?._id}`}>
   <button className="text-lg font-bold py-2 px-4 bg-green-600 rounded-lg">Edit</button>
   </Link>
    <button className="text-lg font-bold py-2 px-4 bg-green-600 rounded-lg ml-3">Delete</button>

    </div>
    </div>
  );
};

export default SingleProduct;