import { CartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
type HandleQuantityChange<CartIdType, ActionType> = (
  cart_id: CartIdType,
  action: ActionType,
) => Promise<void>; // ✅ return type void
type handleDeleteItem<Id> = (id: Id) => void; // ✅ return type void

const CartItemCard = ({
  item,
  handleQuantityChange,
  handleDeleteItem,
}: {
  item: CartItem;
  handleQuantityChange: HandleQuantityChange<string, string>;
  handleDeleteItem: handleDeleteItem<string>;
}) => {
  return (
    <div className="space-y-4">
      <article
        key={item.cart_id}
        className="group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300 flex items-center gap-6"
      >
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
          <img
            src={item.medi_img}
            alt={item.medicine_name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex-1">
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
            {item.category_name}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mt-1 capitalize">
            {item.medicine_name}
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            {item.generic_name}
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 capitalize">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>{" "}
            {item.manufacturer}
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
            <button
              onClick={() => handleQuantityChange(item.cart_id, "decrement")}
              className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-400 hover:text-red-500"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 font-bold text-gray-700">
              {" "}
              {item.quantity}{" "}
            </span>
            <button
              onClick={() => handleQuantityChange(item.cart_id, "increment")}
              className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-400 hover:text-green-500"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right min-w-[80px]">
            <p className="text-2xl font-black text-gray-900 leading-none">
              ${parseFloat(item.price).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => handleDeleteItem(item.cart_id)}
            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </article>
    </div>
  );
};

export default CartItemCard;
