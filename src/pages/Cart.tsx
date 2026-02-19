import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "Нижний Новгород", address: "", comment: "" });

  const formatPrice = (n: number) =>
    n.toLocaleString("ru-RU") + " ₽";

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={32} className="text-honey" />
          </div>
          <h1 className="font-heading text-4xl font-light mb-4">Заказ оформлен</h1>
          <p className="text-muted-foreground font-light mb-8">
            Мы свяжемся с вами в ближайшее время для подтверждения заказа и уточнения деталей доставки.
          </p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-semibold tracking-wide text-foreground">
            Нижегородские краски
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {step === "cart" && (
          <>
            <h1 className="font-heading text-4xl md:text-5xl font-light mb-2">Корзина</h1>
            <p className="text-muted-foreground font-light mb-10">
              {items.length > 0
                ? `${items.length} ${items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}`
                : "Пока пусто"}
            </p>

            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="ShoppingBag" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-light mb-6">Добавьте что-нибудь из коллекции</p>
                <Link to="/#collections">
                  <Button variant="outline" className="px-8">Перейти к коллекции</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-10">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-5 bg-card rounded-sm p-5">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm shrink-0" />
                      ) : (
                        <div className="w-20 h-20 bg-secondary rounded-sm shrink-0 flex items-center justify-center">
                          <Icon name="Palette" size={24} className="text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-medium truncate">{item.name}</h3>
                        {item.variant && <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>}
                        {item.colors && item.colors.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {item.colors.map((c, i) => (
                              <div key={i} className="w-4 h-4 rounded-full border border-border/50" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-medium w-24 text-right shrink-0">{formatPrice(item.price * item.quantity)}</p>
                      <button onClick={() => removeItem(item.id)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Очистить корзину
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Итого</p>
                    <p className="font-heading text-3xl font-light">{formatPrice(totalPrice)}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    size="lg"
                    onClick={() => setStep("checkout")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-sm tracking-wide"
                  >
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {step === "checkout" && (
          <>
            <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <Icon name="ArrowLeft" size={16} />
              Вернуться в корзину
            </button>

            <h1 className="font-heading text-4xl md:text-5xl font-light mb-2">Оформление</h1>
            <p className="text-muted-foreground font-light mb-10">Заполните данные для доставки</p>

            <div className="grid md:grid-cols-[1fr_340px] gap-10">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Имя *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Телефон *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7"
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Город</label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Адрес доставки</label>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Комментарий</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 resize-none"
                  />
                </div>
              </div>

              <div className="bg-card rounded-sm p-6 h-fit sticky top-24">
                <h3 className="font-heading text-xl font-light mb-4">Ваш заказ</h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Итого</span>
                    <span className="font-heading text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!form.name || !form.phone}
                  onClick={() => {
                    setStep("success");
                    clearCart();
                  }}
                >
                  Подтвердить заказ
                </Button>
                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с условиями оферты
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
