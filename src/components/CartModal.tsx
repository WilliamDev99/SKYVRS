import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formatPrice = (price: number) => {
    return `IDR ${price.toLocaleString("en-US")}`;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");
    const { success, error } = await checkout(name, email);
    setIsSubmitting(false);
    if (success) {
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClose();
        setCheckoutSuccess(false);
        setIsCheckingOut(false);
      }, 3000);
    } else {
      setErrorMsg(error || "An error occurred.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[55px] sm:left-6 sm:right-auto sm:top-[70px] md:left-10 md:top-[85px] z-[70] flex h-auto max-h-[70vh] w-[calc(100vw-24px)] sm:w-[380px] max-w-[400px] flex-col bg-[#d2d3d5] font-mono text-[#52667A] shadow-2xl rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#a9abb0] px-5 py-4">
              <h2 className="text-xl font-bold tracking-wider text-[#52667A]">
                {checkoutSuccess ? "Success" : isCheckingOut ? "Checkout" : "Cart"}
              </h2>
              <button onClick={() => {
                onClose();
                setTimeout(() => setIsCheckingOut(false), 300);
              }} className="text-2xl font-light leading-none hover:text-black">
                ×
              </button>
            </div>

            {/* Scrollable Items list */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 custom-scrollbar" data-lenis-prevent="true">
              {items.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm tracking-widest text-[#52667A]/70">
                  YOUR CART IS EMPTY
                </div>
              ) : (
                <div className="flex flex-col space-y-6">
                  {checkoutSuccess ? (
                    <div className="flex flex-col h-32 items-center justify-center text-center space-y-3">
                      <div className="text-xl tracking-widest text-[#52667A] font-bold">ORDER PLACED!</div>
                      <div className="text-xs text-[#52667A]/70">Thank you for your purchase.</div>
                    </div>
                  ) : isCheckingOut ? (
                    <form onSubmit={handleCheckout} className="flex flex-col space-y-4">
                      {errorMsg && <div className="text-red-500 text-xs font-bold">{errorMsg}</div>}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold mb-1">NAME</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="border border-[#a9abb0] bg-[#e4e5e7] p-2 text-sm outline-none focus:border-[#52667A]"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-bold mb-1">EMAIL</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="border border-[#a9abb0] bg-[#e4e5e7] p-2 text-sm outline-none focus:border-[#52667A]"
                          required
                        />
                      </div>
                    </form>
                  ) : (
                    items.map((item, idx) => (
                      <div key={item.id} className={`flex gap-4 ${idx !== items.length - 1 ? 'border-b border-[#a9abb0] pb-6' : ''}`}>
                        {/* Image */}
                        <div className="w-[100px] shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-auto object-contain drop-shadow-md" />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between text-xs tracking-widest">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold leading-tight uppercase">{item.name}</span>
                              <span className="font-bold ml-2 whitespace-nowrap">{formatPrice(item.price)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-1.5 uppercase">
                                {item.color}
                                {item.colorHex && (
                                  <span 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: item.colorHex }}
                                  />
                                )}
                              </div>
                              <span>SIZE: {item.size}</span>
                            </div>
                            <div className="text-[10px] text-[#7d8b99] mb-4">
                              Ready to Ship.
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex justify-between items-end">
                            <span className="flex items-center gap-2">
                              QTY 
                              <button onClick={() => updateQuantity(item.id, -1)} className="px-1 hover:text-black">-</button>
                              {item.qty}
                              <button onClick={() => updateQuantity(item.id, 1)} className="px-1 hover:text-black">+</button>
                            </span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="bg-[#a9abb0] text-white px-2 py-0.5 text-[10px] hover:bg-[#888b90]"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !checkoutSuccess && (
              <div className="border-t border-[#a9abb0] bg-[#c4c6c9] px-5 py-6">
                {!isCheckingOut && (
                  <>
                    <div className="flex justify-between text-sm font-bold tracking-widest mb-1">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold tracking-widest mb-6">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </>
                )}
                {isCheckingOut ? (
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={(e) => handleCheckout(e as any)}
                      disabled={isSubmitting}
                      className="w-full rounded-md bg-[#52667A] py-4 text-center font-bold tracking-[0.2em] text-white hover:bg-[#3d4d5c] shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "PROCESSING..." : `PAY ${formatPrice(cartTotal)}`}
                    </button>
                    <button 
                      onClick={() => setIsCheckingOut(false)}
                      disabled={isSubmitting}
                      className="w-full rounded-md bg-transparent py-2 text-center text-xs font-bold tracking-[0.1em] text-[#52667A] hover:underline disabled:opacity-50"
                    >
                      BACK TO CART
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full rounded-md bg-white py-4 text-center font-bold tracking-[0.2em] text-[#52667A] hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    CHECKOUT
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
