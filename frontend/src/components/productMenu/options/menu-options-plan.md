# Menu Options Architectuurplan

Dit plan is bedoeld om je options-UI overzichtelijk op te bouwen en later eenvoudig een complete order-payload naar de cart te sturen. Het sluit aan op je huidige flow: **MenuShell → MenuProductDetails → (later) Add to cart** en op je `configOptions.json` (sizes, iceLevels, sugarLevels, toppings, etc.).

---

## Doelarchitectuur

- **`MenuProductDetails`** is de **container**:
  - bewaart de *draft order state*
  - berekent de prijs (alleen size beïnvloedt prijs)
  - handelt “Order/Add to cart” af (validatie + payload)

- **`MenuOptionsPanel`** is de **compositie**:
  - toont de juiste option-groepen voor het geselecteerde product
  - bevat de “visibility rules” per categorie (iced-coffee / bubble-tea / iced-tea)

- **Option group components** zijn klein en herbruikbaar:
  - één generiek component voor *single-select* (pills/buttons)
  - aparte componenten voor uitzonderingen (size met priceExtra, toppings multi-select)

---

## Component structuur

### 1) Container: `MenuProductDetails`
**Verantwoordelijkheden**
- Ontvangt `product` via props (vanuit `MenuShell`).
- Houdt draft state:
  - `sizeId` (belangrijk: beïnvloedt prijs)
  - `iceId`, `sugarId`, `milkId`, `coffeeLevelId` (info)
  - `toppingIds` (info, multi-select)
  - `qty`
- Berekent:
  - `unitPrice = basePrice + size.priceExtra`
  - `total = unitPrice * qty`
- Handler:
  - `handleAddToCart()`:
    - valideert required fields (minimaal `sizeId`)
    - bouwt payload
    - stuurt payload naar cart (later: `MenuShell` state of store)

**Draft state model (conceptueel)**
- `draft = { sizeId, iceId, sugarId, milkId, coffeeLevelId, toppingIds, qty }`

---

### 2) UI-compositie: `MenuOptionsPanel`
**Verantwoordelijkheden**
- Krijgt binnen:
  - `product` (of `categoryId`)
  - `optionsConfig` (uit `configOptions.json`)
  - `draft` + setters (of `setDraft`)
- Bepaalt welke groepen zichtbaar zijn, bijvoorbeeld:
  - **Size**: altijd
  - **Ice / Sugar**: bubble-tea en iced-tea
  - **Coffee level**: iced-coffee
  - **Toppings**: alleen bubble-tea
  - **Milk**: afhankelijk van jouw productregels

**Waarom dit overzichtelijk is**
- `MenuProductDetails` blijft “schoon”: state + prijs + add-to-cart.
- Alle “welke opties toon ik wanneer” regels staan op één plek.

---

### 3) Generieke bouwsteen: `OptionPills` (single-select)
Gebruik dit voor groepen die alleen `{ id, label }` hebben:
- `iceLevels`
- `sugarLevels`
- `coffeeLevels`
- `milk` (als single select)

**Props (conceptueel)**
- `title`
- `options: {id,label}[]`
- `value`
- `onChange`
- optioneel: layout (row/grid) en styling varianten

---

### 4) Speciale groepen

#### A) `SizeSelector`
Waarom apart?
- Size toont `priceExtra`
- Size is vrijwel altijd “required”
- Beïnvloedt prijsberekening

**Props**
- `sizes: { id, label, priceExtra }[]`
- `value`
- `onChange`

> Implementatie-tip: `SizeSelector` kan intern `OptionPills` hergebruiken via `renderLabel`.

#### B) `ToppingsSelector` (multi-select)
Waarom apart?
- multi-select (meerdere tegelijk)
- later mogelijk max-aantal (bv. max 2) en/of topping-prijs

**Props**
- `toppings: { id, label }[]`
- `value: string[]`
- `onToggle(id)`

---

## Data flow (simpel en robuust)

1. `MenuProductDetails` leest `optionsConfig` (configOptions.json).
2. `MenuProductDetails` geeft aan `MenuOptionsPanel`:
   - `optionsConfig`
   - `draft` + setter(s)
3. `MenuOptionsPanel` rendert:
   - `SizeSelector`
   - meerdere `OptionPills` (ice/sugar/milk/coffee)
   - `ToppingsSelector` (bubble-tea)
4. User klikt “Order/Add to cart”:
   - `MenuProductDetails` valideert required fields
   - bouwt payload
   - stuurt payload naar cart (later: in `MenuShell` of store)

---

## Payload (conceptueel)

Bij “Add to cart” maak je één object:

- product info: `productId`, `name`, `image`, `categoryId`
- order info: `qty`
- options info: `sizeId`, `iceId`, `sugarId`, `milkId`, `coffeeLevelId`, `toppingIds`
- pricing: `unitPrice`, `total`

> Belangrijk: prijs wordt afgeleid van `basePrice + size.priceExtra` (jouw huidige rule).

---

## Werkvolgorde (aanbevolen)

1. **SizeSelector** (werkt al) + prijs update in `MenuProductDetails`
2. **IceSelector** via `OptionPills` (alleen state opslaan, geen prijs)
3. **SugarSelector** via `OptionPills`
4. **ToppingsSelector** (multi-select)
5. **MenuOptionsPanel** (visibility rules per categorie)
6. **Order/Add to cart**:
   - payload bouwen
   - cart-state toevoegen in `MenuShell` (of Zustand store)
   - `MenuRightCart` rendert items + totals

---

## Mappenstructuur voorstel

- `components/menu/options/OptionPills.tsx`
- `components/menu/options/SizeSelector.tsx`
- `components/menu/options/ToppingsSelector.tsx`
- `components/menu/options/MenuOptionsPanel.tsx`

---

## Notities

- Houd `MenuOptionsPanel` en de option components “dumb”: **geen eigen state**, alleen `value` + callbacks.
- Houd pricing in `MenuProductDetails`: **prijs is derived**, geen aparte price-state.
- Voor reset bij product switch zonder `useEffect`-warning: **remount met `key={product.id}`** op `MenuProductDetails` in `MenuShell`.
