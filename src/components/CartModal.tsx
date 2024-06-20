import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";

const CartModal = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = () => {
    const message = generateWhatsAppMessage(cart.lineItems || []);
    const phoneNumber = "+6281410601130"; // Nomor WhatsApp tujuan
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateWhatsAppMessage = (lineItems: any[]) => {
    let message = "Halo, saya ingin memesan:\n";
    lineItems.forEach((item) => {
      message += `${item.productName?.original}\n ${item.quantity} x ${item.price?.formattedAmount}\n`;
  
      // Mengambil variant size dengan cara yang sama seperti pada elemen JSX
      const variantSize = item.descriptionLines && item.descriptionLines[0] && item.descriptionLines[0].plainText && item.descriptionLines[0].plainText.original;
      if (variantSize) {
        message += `Size: ${variantSize}`;
      }
  
      message += "\n";
    });
  
    const subtotal = cart.subtotal ? cart.subtotal.formattedAmount : "N/A";
    message += `Total: ${subtotal}\n`;
    message += "Terima kasih!";
    return message;
  };
  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
    {!cart.lineItems ? (
      <div className="">Cart is Empty</div>
    ) : (
      <>
        <h2 className="text-xl">Shopping Cart</h2>
        <div className="flex flex-col gap-8">
          {cart.lineItems.map((item) => (
            <div className="flex flex-col md:flex-row gap-4" key={item._id}>
              {item.image && (
                <Image
                  src={wixMedia.getScaledToFillImageUrl(
                    item.image,
                    72,
                    96,
                    {}
                  )}
                  alt=""
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
              )}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold pr-2">
                    {item.productName?.original}
                  </h3>
                  {item.quantity && item.quantity > 1 && (
                    <div className="text-xs text-green-500">
                      {item.quantity} x
                    </div>
                  )}
                  <div className="p-1 bg-gray-50 rounded-sm">
                    {item.price?.formattedAmount}
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span className="text-gray-500">Size. {item.descriptionLines && item.descriptionLines[0] && item.descriptionLines[0].plainText && item.descriptionLines[0].plainText.original}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className="text-blue-500"
                    style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    onClick={() => removeItem(wixClient, item._id!)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <div className="flex items-center justify-between font-semibold">
            <span className="">Subtotal</span>
            <span className="">{cart.subtotal?.formattedAmount}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="flex justify-between text-sm">
            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
              View Cart
            </button>
            <button
              className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default CartModal;
