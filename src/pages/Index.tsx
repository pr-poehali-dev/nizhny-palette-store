import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";

const HERO_IMG = "https://cdn.poehali.dev/projects/6002a99d-e331-4cab-9cdb-288f5d8e52d7/files/d7fe6a4f-2539-43dc-82de-656b6b31363d.jpg";
const COLLECTION_IMG = "https://cdn.poehali.dev/projects/6002a99d-e331-4cab-9cdb-288f5d8e52d7/files/e0b299af-5800-45b9-bbcd-7494f60677d8.jpg";
const PALETTE_IMG = "https://cdn.poehali.dev/projects/6002a99d-e331-4cab-9cdb-288f5d8e52d7/files/9dbf3aad-cea6-42a0-be9d-64432c2606f2.jpg";

const NAV_LINKS = [
  { label: "Коллекции", href: "#collections" },
  { label: "Конструктор", href: "#constructor" },
  { label: "О бренде", href: "#about" },
  { label: "История", href: "#story" },
  { label: "Контакты", href: "#contacts" },
];

const COLORS = [
  { name: "Волжская глубина", hex: "#3A5A7C", desc: "Синева реки в сентябре" },
  { name: "Печёрский мёд", hex: "#C4934A", desc: "Тёплый свет монастырских стен" },
  { name: "Известняк Дятловых гор", hex: "#D8CFC0", desc: "Камень, на котором стоит город" },
  { name: "Закат на откосе", hex: "#C27856", desc: "Вечернее небо над Стрелкой" },
  { name: "Кремлёвская стена", hex: "#8B4A3A", desc: "Красный кирпич пяти веков" },
  { name: "Ярмарочный полдень", hex: "#E8C97A", desc: "Золото макарьевской торговли" },
  { name: "Волжский туман", hex: "#B8C4CC", desc: "Утренняя дымка над водой" },
  { name: "Купеческий бархат", hex: "#5B3A4A", desc: "Глубина старинных гостиных" },
];

const PRODUCTS = [
  {
    id: "set-full",
    name: "Полная коллекция «40 чувств»",
    desc: "Все 40 оттенков в подарочной коробке из крафт-картона с тиснением",
    price: 8900,
    image: COLLECTION_IMG,
    badge: "Хит",
  },
  {
    id: "set-starter",
    name: "Стартовый набор «Стрелка»",
    desc: "12 базовых оттенков — идеальное знакомство с палитрой Нижнего",
    price: 3200,
    image: PALETTE_IMG,
    badge: null,
  },
  {
    id: "set-gift",
    name: "Подарочный набор «Откос»",
    desc: "8 оттенков заката + открытка с видом на Волгу + льняной мешочек",
    price: 4500,
    image: HERO_IMG,
    badge: "Подарок",
  },
];

const FEELINGS = [
  "Нежность", "Упрямство", "Тоска", "Восторг", "Тишина", "Свобода",
  "Дерзость", "Мудрость", "Свет", "Печаль", "Радость", "Сила",
];

const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-heading text-xl font-semibold tracking-wide text-foreground">
          Нижегородские краски
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link to="/cart" className="relative">
            <Icon name="ShoppingBag" size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-honey text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Icon name="ShoppingBag" size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-honey text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)}>
            <Icon name={open ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-background border-b border-border px-6 py-4 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16">
    <div className="absolute inset-0 z-0">
      <img src={HERO_IMG} alt="Нижний Новгород" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Первый нижегородский бренд красок
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Женский город.
          <br />
          <span className="font-normal italic text-honey">40 чувств</span>
        </h1>
        <p className="text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-lg animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Каждый оттенок — частица настоящего Нижнего. Купеческого, речного, кружевного, упрямого, женского.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <a href="#collections">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-wide">
              Смотреть коллекцию
            </Button>
          </a>
          <a href="#constructor">
            <Button variant="outline" size="lg" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-6 text-sm tracking-wide">
              Собрать свой Нижний
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CollectionsSection = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast({ title: "Добавлено в корзину", description: product.name });
  };

  return (
    <section id="collections" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Коллекция</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-6 leading-tight">
            Женский город. 40 чувств
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            40 оттенков, рождённых из нижегородской земли, воды и неба. Каждый цвет — это чувство,
            привязанное к месту.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {FEELINGS.map((f) => (
            <span key={f} className="px-4 py-1.5 bg-secondary text-secondary-foreground text-xs tracking-wide rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-card rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-500">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-honey text-white text-xs tracking-wide rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="font-heading text-2xl font-light">{formatPrice(product.price)}</p>
                  <Button
                    onClick={() => handleAdd(product)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
                  >
                    <Icon name="ShoppingBag" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConstructorSection = () => {
  const [selected, setSelected] = useState<number[]>([0, 3, 4]);
  const { addItem } = useCart();
  const { toast } = useToast();

  const pricePerColor = 400;
  const totalConstructor = selected.length * pricePerColor;

  const handleAddCustom = () => {
    if (selected.length === 0) return;
    const selectedColors = selected.map((i) => COLORS[i]);
    addItem({
      id: "custom-" + selected.sort().join("-"),
      name: "Персональная палитра",
      price: totalConstructor,
      variant: `${selected.length} оттенков: ${selectedColors.map((c) => c.name).join(", ")}`,
      colors: selectedColors.map((c) => c.hex),
    });
    toast({ title: "Набор добавлен в корзину", description: `Персональная палитра — ${selected.length} оттенков` });
  };

  return (
    <section id="constructor" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Конструктор</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-6">Собери свой Нижний</h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            Выберите оттенки, которые откликаются именно вам. Соберите персональную палитру
            из цветов города и получите набор, созданный под ваше настроение.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {COLORS.map((color, i) => (
            <button
              key={color.name}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                )
              }
              className={`group text-left p-5 rounded-sm transition-all duration-300 ${
                selected.includes(i)
                  ? "bg-background shadow-lg ring-1 ring-foreground/10"
                  : "bg-transparent hover:bg-background/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full shrink-0 shadow-inner" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="text-sm font-medium mb-0.5">{color.name}</p>
                  <p className="text-xs text-muted-foreground">{color.desc}</p>
                </div>
              </div>
              {selected.includes(i) && (
                <div className="mt-3 flex justify-end">
                  <Icon name="Check" size={16} className="text-honey" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-background rounded-sm p-8 max-w-lg mx-auto text-center">
          <div className="flex justify-center gap-2 mb-4">
            {selected.map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background shadow-md" style={{ backgroundColor: COLORS[i].hex }} />
            ))}
            {selected.length === 0 && <p className="text-sm text-muted-foreground">Выберите оттенки</p>}
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {selected.length} {selected.length === 1 ? "оттенок" : selected.length < 5 ? "оттенка" : "оттенков"} × {formatPrice(pricePerColor)}
          </p>
          <p className="font-heading text-3xl font-light mb-5">{formatPrice(totalConstructor)}</p>
          <Button
            onClick={handleAddCustom}
            disabled={selected.length === 0}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
          >
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Добавить в корзину
          </Button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={PALETTE_IMG} alt="Палитра оттенков" className="w-full rounded-sm" />
        </div>
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">О бренде</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-6 leading-tight">
            Не матрёшечный,
            <br />а настоящий
          </h2>
          <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
            <p>
              «Нижегородские краски» — это первый бренд художественных красок, рождённый
              из нижегородской земли, воды и неба. Мы не копируем — мы переводим город в палитру.
            </p>
            <p>
              Русский Северный Модерн. Купеческая эстетика. Тихая роскошь. Без сусального золота
              и псевдонарода. Настоящий Нижний — купеческий, речной, фабричный, кружевной.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
            <div>
              <p className="font-heading text-3xl font-light">40</p>
              <p className="text-xs text-muted-foreground mt-1">оттенков</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-light">100%</p>
              <p className="text-xs text-muted-foreground mt-1">авторские пигменты</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-light">НН</p>
              <p className="text-xs text-muted-foreground mt-1">сделано в Нижнем</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StorySection = () => (
  <section id="story" className="py-24 md:py-32 bg-card">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">История</p>
        <h2 className="font-heading text-4xl md:text-5xl font-light mb-6">Цвет как язык города</h2>
      </div>
      <div className="space-y-12">
        {[
          { year: "Земля", title: "Дятловы горы и кремлёвский кирпич", text: "Нижний стоит на известняке и глине. Бежевый, терракотовый, охристый — это не выбор, а данность. Город буквально построен из своей палитры." },
          { year: "Вода", title: "Волга и Ока, две реки — два характера", text: "Тёмная волжская синева и светлая окская зелень. На Стрелке они встречаются, но не смешиваются — как два голоса в одной песне." },
          { year: "Небо", title: "Закаты средней полосы", text: "Нижегородское небо — это отдельная палитра. Персиковые рассветы, лиловые сумерки, медовый свет на откосе. Город, который смотрит на закат сверху вниз." },
        ].map((item, i) => (
          <div key={i} className="grid md:grid-cols-[120px_1fr] gap-6 items-start">
            <p className="font-heading text-2xl italic text-honey">{item.year}</p>
            <div>
              <h3 className="font-heading text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactsSection = () => (
  <section id="contacts" className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Контакты</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-6">Свяжитесь с нами</h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            Для оптовых заказов, коллабораций и вопросов о коллекции — пишите, будем рады.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Нижний Новгород</p>
                <p className="text-xs text-muted-foreground">ул. Большая Покровская, 24</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Mail" size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">hello@nnkraski.ru</p>
                <p className="text-xs text-muted-foreground">Ответим в течение дня</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Phone" size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">+7 (831) 123-45-67</p>
                <p className="text-xs text-muted-foreground">Пн—Пт, 10:00—19:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-sm p-8">
          <h3 className="font-heading text-2xl font-light mb-6">Оставьте заявку</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-shadow" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-shadow" />
            <textarea placeholder="Сообщение" rows={4} className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-shadow resize-none" />
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Отправить</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="font-heading text-lg font-semibold">Нижегородские краски</p>
          <p className="text-xs text-muted-foreground mt-1">Первый нижегородский бренд художественных красок</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Instagram" size={18} fallback="Camera" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="MessageCircle" size={18} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Send" size={18} />
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2025 Нижегородские краски. Все права защищены.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Политика конфиденциальности</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Договор оферты</a>
        </div>
      </div>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CollectionsSection />
      <ConstructorSection />
      <AboutSection />
      <StorySection />
      <ContactsSection />
      <Footer />
    </div>
  );
};

export default Index;
