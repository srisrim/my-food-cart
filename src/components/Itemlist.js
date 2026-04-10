import { CDN_URL } from '../constants/common';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import useSnackbar from "../utils/useSnackbar";
import Snackbar from './Snackbar';

const Itemlist = ({ items }) => {
  const { snackBar, showSnackBar } = useSnackbar();

  const dispatch = useDispatch()
  
  const handleAddItem = (res) => {
    dispatch(addItem(res));
    showSnackBar(`${res.card.info.name} added to cart!`);
  };

  return (
    <div>
      {items.map((res) => (
        <div key={res?.card?.info?.id} className="flex justify-between items-start gap-4 p-4 mb-4 shadow-lg rounded-xl bg-white border border-gray-100">
            
            {/* Left — item details, takes 3 parts */}
            <div className="flex flex-col gap-2 flex-[3]">
                <p className="font-medium text-base">{res?.card?.info?.name}</p>
                <p className="font-medium text-sm">₹ {res?.card?.info?.defaultPrice / 100 ||
                res?.card?.info?.price / 100}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{res?.card?.info?.description}</p>
            </div>

            {/* Right — image + add button, takes 1 part */}
            <div className="flex flex-col items-center gap-2 flex-[1] min-w-[120px]">
                <img
                    src={CDN_URL + res?.card?.info?.imageId}
                    className="w-full rounded-lg object-cover aspect-square"
                />
                <button className="w-full py-1.5 text-sm font-medium border border-gray-300 rounded-lg text-green-600 bg-white"
                        onClick={() => handleAddItem(res)}>
                    ADD +
                </button>
            </div>
        </div>
      ))}

      <Snackbar isVisible={snackBar.isVisible} message={snackBar.message} />
    </div>
  );
}

export default Itemlist;