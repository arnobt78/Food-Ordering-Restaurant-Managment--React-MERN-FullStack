import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Trash, CreditCard, AlertCircle, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  updateCartItemQuantity?: (cartItem: CartItem, newQuantity: number) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  const copyCredentials = async () => {
    const credentials = `Email: test@example.com
Card: 4242 4242 4242 4242
Expiry: 12/35
CVC: 123
Name: John Doe`;

    try {
      await navigator.clipboard.writeText(credentials);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy credentials:", err);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between items-center" key={item._id}>
            <span className="flex items-center gap-2">
              {/* Quantity Counter */}
              <div className="flex items-center px-1 py-0.5 bg-gray-50 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-lg bg-gray-100"
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateCartItemQuantity &&
                    updateCartItemQuantity(item, item.quantity - 1)
                  }
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <span className="mx-2 w-4 text-center select-none font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-lg bg-gray-100"
                  onClick={() =>
                    updateCartItemQuantity &&
                    updateCartItemQuantity(item, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
              <span className="ml-2">{item.name}</span>
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />

        {/* Test Credentials Notice */}
        {cartItems.length > 0 && (
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="font-semibold text-sm text-yellow-800">
                  🧪 For Testing Purpose - Use These Dummy Credentials:
                </p>
                <div className="relative text-xs space-y-1 bg-white/50 p-2 rounded border border-yellow-200">
                  {/* Copy Button */}
                  <button
                    onClick={copyCredentials}
                    className="absolute top-1 right-1 p-1 hover:bg-gray-100 rounded transition-colors"
                    title={isCopied ? "Copied!" : "Copy all credentials"}
                  >
                    {isCopied ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-gray-600 hover:text-gray-800" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-yellow-600" />
                    <span className="font-medium">Email:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      test@example.com
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-yellow-600" />
                    <span className="font-medium">Card:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      4242 4242 4242 4242
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-yellow-600" />
                    <span className="font-medium">Expiry:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      12/35
                    </code>
                    <span className="font-medium">CVC:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      123
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-yellow-600" />
                    <span className="font-medium">Name:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      John Doe
                    </code>
                  </div>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Complete checkout to see order status, analytics, and other
                  interactive features!
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default OrderSummary;
