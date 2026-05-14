import { useState, useRef } from "react";

export default function App() {

  const products = [
    {
      id: 1,
      name: "TECH SPORT SET",
      price: "90.000",
      originalPrice: "120.000",
      image: "/img/1.png",
      discount: true,
      discountLabel: "DESCUENTO"
    },
    {
      id: 2,
      name: "DARK ORNAMENT TEE",
      price: "85.900",
      originalPrice: "110.000",
      image: "/img/2.png",
      discount: true,
      discountLabel: "DESCUENTO"
    },
    {
      id: 3,
      name: "BAGGY JEANS",
      price: "100.000",
      originalPrice: "150.000",
      image: "/img/3.png",
      discount: true,
      discountLabel: "DESCUENTO"
    },
    {
      id: 4,
      name: "FINE TRACK PANTS",
      price: "100.000",
      originalPrice: "120.000",
      image: "/img/4.png",
      discount: true,
      discountLabel: "DESCUENTO"
    },
    {
      id: 5,
      name: "SKELETON SWEATER",
      price: "85.000",
      originalPrice: "120.000",
      image: "/img/05-black.png",
      discount: true,
      discountLabel: "DESCUENTO",
      colors: [
        { name: "Negro", image: "/img/05-black.png" },
        { name: "Rojo ladrillo", image: "/img/05-red.png" },
        { name: "Azul claro", image: "/img/05-blue.png" },
        { name: "Vino", image: "/img/05-wine.png" }
      ]
    },
    {
      id: 6,
      name: "GRIND BEANIE",
      price: "50.000",
      originalPrice: "100.000",
      image: "/img/06.png",
      discount: true,
      discountLabel: "DESCUENTO",
      colors: [
        { name: "Negro / Blanco", image: "/img/06-black-white.png" },
        { name: "Gris / Negro", image: "/img/06-grey-black.png" },
        { name: "Rojo / Blanco", image: "/img/06-red-white.png" }
      ]
    }
  ];

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSkeletonColor, setSelectedSkeletonColor] = useState(0);
  const [selectedBeanieColor, setSelectedBeanieColor] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const cartSectionRef = useRef(null);

  const toggleCart = () => {
    setCartOpen((prev) => {
      const next = !prev;
      if (next && cartSectionRef.current) {
        setTimeout(() => {
          cartSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
      return next;
    });
  };

  const handlePayment = () => {
    if (cart.length === 0) return;
    setShowPaymentMethods(true);
  };

  const confirmPayment = () => {
    if (!selectedPaymentMethod) return;
    setPaymentSuccess(true);
    setCart([]);
    setShowPaymentMethods(false);
    setSelectedPaymentMethod(null);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  const cancelPayment = () => {
    setShowPaymentMethods(false);
    setSelectedPaymentMethod(null);
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getDiscountPercent = (originalPrice, price) => {
    if (!originalPrice || !price) return null;
    const original = Number(originalPrice.replace(/\./g, ""));
    const current = Number(price.replace(/\./g, ""));
    if (!original || current >= original) return null;
    return Math.round((1 - current / original) * 100);
  };

  const addToCart = (product, selectedColorIndex = null) => {
    const selectedColor = selectedColorIndex !== null && product.colors ? product.colors[selectedColorIndex] : null;
    const colorName = selectedColor?.name || "Original";
    const priceNumber = Number(product.price.replace(/\./g, ""));
    const key = `${product.id}-${colorName}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.key === key);
      if (existing) {
        return prevCart.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          key,
          productId: product.id,
          name: product.name,
          price: product.price,
          priceNumber,
          color: colorName,
          quantity: 1
        }
      ];
    });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom,#000,#050505,#0a0a0a)",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* NAVBAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 40px",
          borderBottom: "1px solid #111",
          background: "rgba(0,0,0,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >

        <div>

          <h1
            style={{
              color: "#ff0000",
              margin: 0,
              fontSize: "42px",
              letterSpacing: "4px",
              textShadow: "0 0 12px red, 0 0 25px red"
            }}
          >
            AFTERMIDNIGHT
          </h1>

          <p
            style={{
              color: "#888",
              marginTop: "8px",
              letterSpacing: "3px",
              fontSize: "14px"
            }}
          >
            Y2K STREETWEAR
          </p>

        </div>

        <div
          onClick={toggleCart}
          style={{
            background: cartOpen ? "rgba(255,0,0,0.18)" : "#0d0d0d",
            border: "1px solid red",
            padding: "10px 18px",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(255,0,0,0.5)",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          🛒 {cart.length}
        </div>

      </div>

      {/* HERO */}

      <div
        style={{
          textAlign: "center",
          padding: "50px 20px 30px"
        }}
      >

        <h2
          style={{
            fontSize: "70px",
            margin: 0,
            textShadow: "0 0 18px red",
            letterSpacing: "5px"
          }}
        >
          STREETWEAR
        </h2>

        <h3
          style={{
            fontSize: "28px",
            color: "red",
            marginTop: "10px",
            textShadow: "0 0 12px red"
          }}
        >
          Y2K • ARCHIVE • FUTURE
        </h3>

        <p
          style={{
            color: "#777",
            marginTop: "15px",
            fontSize: "15px",
            letterSpacing: "3px"
          }}
        >
          ROMPE LAS REGLAS
        </p>

      </div>

      {/* PRODUCTOS */}

      {!cartOpen && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(370px,1fr))",
            gap: "35px",
            padding: "30px"
          }}
        >

          {products.map((product) => {
            const selectedColorIndex = product.id === 5 ? selectedSkeletonColor : product.id === 6 ? selectedBeanieColor : null;
            const productImage = selectedColorIndex !== null && product.colors
              ? product.colors?.[selectedColorIndex]?.image || product.image
              : product.image;

            return (

            <div
              key={product.id}
              style={{
                background: "#090909",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(255,0,0,0.2)",
                boxShadow: "0 0 20px rgba(255,0,0,0.12)"
              }}
            >

              <img
                src={productImage}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.src = product.image;
                }}
                style={{
                  width: "100%",
                  display: "block"
                }}
              />

              <div
                style={{
                  padding: "24px"
                }}
              >

                <h2
                  style={{
                    fontSize: "26px",
                    marginTop: 0,
                    marginBottom: "10px"
                  }}
                >
                  {product.name}
                </h2>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                    {product.originalPrice && (
                      <span
                        style={{
                          color: "#999",
                          fontSize: "13px",
                          textDecoration: "line-through",
                          letterSpacing: "1px"
                        }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}

                    {product.discount && getDiscountPercent(product.originalPrice, product.price) !== null && (
                      <span
                        style={{
                          color: "#c300ff",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px"
                        }}
                      >
                        -{getDiscountPercent(product.originalPrice, product.price)}%
                      </span>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h3
                        style={{
                          color: "#c300ff",
                          fontSize: "28px",
                          margin: 0,
                          textShadow: "0 0 16px rgba(195, 0, 255, 0.75)",
                          letterSpacing: "1px"
                        }}
                      >
                        ${product.price}
                      </h3>

                      {product.discount && (
                        <span
                          style={{
                            color: "#c300ff",
                            background: "rgba(195, 0, 255, 0.14)",
                            border: "1px solid rgba(195, 0, 255, 0.4)",
                            borderRadius: "999px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          }}
                        >
                          {product.discountLabel || "DESCUENTO"}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    style={{
                      color: "#666",
                      fontSize: "13px"
                    }}
                  >
                    LIMITED
                  </span>

                </div>

                {product.colors && (
                  <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {product.colors.map((color, index) => (
                        <button
                          key={color.name}
                          onClick={() => {
                            if (product.id === 5) setSelectedSkeletonColor(index);
                            if (product.id === 6) setSelectedBeanieColor(index);
                          }}
                          style={{
                            border: index === selectedColorIndex ? "1px solid #c300ff" : "1px solid rgba(255,255,255,0.12)",
                            background: index === selectedColorIndex ? "rgba(195, 0, 255, 0.18)" : "rgba(255,255,255,0.04)",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: "999px",
                            cursor: "pointer",
                            fontSize: "13px"
                          }}
                        >
                          {color.name}
                        </button>
                      ))}
                    </div>
                    <span style={{ color: "#c300ff", fontSize: "13px", fontWeight: "700" }}>
                      Color seleccionado: {product.colors?.[selectedColorIndex]?.name}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => addToCart(product, selectedColorIndex)}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "16px",
                    border: "none",
                    borderRadius: "14px",
                    background: "linear-gradient(90deg,#ff0000,#990000)",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 0 18px rgba(255,0,0,0.5)"
                  }}
                >
                  AGREGAR AL CARRITO
                </button>

              </div>

            </div>

          )})}

        </div>
      )}

      {cartOpen && (
        <div
          ref={cartSectionRef}
          style={{
            padding: "30px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.85)",
            margin: "0 30px",
            borderRadius: "28px"
          }}
        >
          <h3
            style={{
              color: "#ff3b3b",
              margin: 0,
              marginBottom: "18px",
              letterSpacing: "2px"
            }}
          >
            CARRITO DE COMPRA
          </h3>

          {paymentSuccess && (
            <div
              style={{
                background: "rgba(0,255,0,0.1)",
                border: "1px solid #00ff00",
                borderRadius: "14px",
                padding: "16px",
                marginBottom: "18px",
                textAlign: "center"
              }}
            >
              <span style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
                ✅ ¡Pago exitoso! Gracias por tu compra.
              </span>
            </div>
          )}

          {showPaymentMethods ? (
            <>
              <h4 style={{ color: "#fff", marginBottom: "16px" }}>
                Selecciona método de pago
              </h4>
              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  { id: "savings", name: "Cuenta de Ahorros", icon: "🏦" },
                  { id: "nequi", name: "Nequi", icon: "📱" }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px",
                      border: selectedPaymentMethod === method.id ? "2px solid #c300ff" : "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      background: selectedPaymentMethod === method.id ? "rgba(195, 0, 255, 0.1)" : "rgba(255,255,255,0.04)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "16px"
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{method.icon}</span>
                    <span>{method.name}</span>
                  </button>
                ))}
              </div>

              {selectedPaymentMethod === "savings" && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px",
                    background: "rgba(0,255,0,0.1)",
                    border: "1px solid #00ff00",
                    borderRadius: "12px",
                    textAlign: "center"
                  }}
                >
                  <span style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
                    Número de Cuenta: 0550046200132440
                  </span>
                </div>
              )}

              {selectedPaymentMethod === "nequi" && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px",
                    background: "rgba(0,255,0,0.1)",
                    border: "1px solid #00ff00",
                    borderRadius: "12px",
                    textAlign: "center"
                  }}
                >
                  <span style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
                    Número de Nequi: 3238504796
                  </span>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                <button
                  onClick={confirmPayment}
                  disabled={!selectedPaymentMethod}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    background: !selectedPaymentMethod ? "rgba(255,0,0,0.3)" : "linear-gradient(90deg,#ff0000,#990000)",
                    color: "white",
                    cursor: !selectedPaymentMethod ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    boxShadow: !selectedPaymentMethod ? "none" : "0 0 18px rgba(255,0,0,0.5)"
                  }}
                >
                  Confirmar Pago
                </button>
                <button
                  onClick={cancelPayment}
                  style={{
                    padding: "14px 20px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  Cancelar
                </button>
              </div>

              <p style={{ color: "#bbb", fontSize: "14px", marginTop: "16px", textAlign: "center" }}>
                Después de transferir, envía el comprobante a nuestro WhatsApp 3238504796 para confirmar el pago y procesar tu pedido.
              </p>
            </>
          ) : (
            <>
              {paymentSuccess && (
                <div
                  style={{
                    background: "rgba(0,255,0,0.1)",
                    border: "1px solid #00ff00",
                    borderRadius: "14px",
                    padding: "16px",
                    marginBottom: "18px",
                    textAlign: "center"
                  }}
                >
                  <span style={{ color: "#00ff00", fontWeight: "bold", fontSize: "16px" }}>
                    ✅ ¡Pago exitoso! Gracias por tu compra.
                  </span>
                </div>
              )}

              {cart.length === 0 ? (
                <p style={{ color: "#999", margin: 0 }}>
                  Tu carrito está vacío. Agrega productos para ver el total.
                </p>
              ) : (
                <>
                  <div style={{ display: "grid", gap: "14px" }}>
                    {cart.map((item) => (
                      <div
                        key={item.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px",
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: "18px"
                        }}
                      >
                        <div>
                          <strong style={{ display: "block", color: "#fff" }}>{item.name}</strong>
                          <span style={{ color: "#bbb", fontSize: "13px" }}>
                            Color: {item.color}
                          </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ display: "block", color: "#c300ff", fontWeight: "700" }}>
                            ${formatCurrency(item.priceNumber)} x {item.quantity}
                          </span>
                          <span style={{ color: "#999", fontSize: "13px" }}>
                            ${formatCurrency(item.priceNumber * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px"
                    }}
                  >
                    <span style={{ color: "#999", fontSize: "15px" }}>
                      Total de unidades: {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                    <strong style={{ color: "#c300ff", fontSize: "20px" }}>
                      Total: ${formatCurrency(cart.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0))}
                    </strong>
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
                    <button
                      onClick={() => setCart([])}
                      style={{
                        flex: 1,
                        padding: "12px 18px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.04)",
                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      Vaciar carrito
                    </button>

                    <button
                      onClick={handlePayment}
                      style={{
                        flex: 1,
                        padding: "12px 18px",
                        border: "none",
                        borderRadius: "14px",
                        background: "linear-gradient(90deg,#ff0000,#990000)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 0 18px rgba(255,0,0,0.5)"
                      }}
                    >
                      PAGAR AHORA
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* FOOTER */}

      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#555",
          letterSpacing: "4px",
          borderTop: "1px solid #111",
          marginTop: "20px"
        }}
      >
        AFTERMIDNIGHT © 2026
      </div>

    </div>
  );
}