import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {

  const {data:products, isLoading, isError} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/allproducts`)
      return res.data
    }
  })

  if(isLoading){
    return <p>Loading. ......</p>
  }

  if(isError){
    return <p>Error..........</p>
  }
console.log(products)
  return (
    <div>
      <h1 className="text-5xl">All Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          products.map(product => (
            <div key={product._id} 
            className="border border-solid border-red-500 rounded-lg p-5 space-y-4"
            >
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p>{product.details}</p>
              <p>{product.price}</p>
              <Link to={`/singleProduct/${product._id}`}>
              <button className="bg-green-600 py-2 px-4 rounded-lg">See Details</button>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;